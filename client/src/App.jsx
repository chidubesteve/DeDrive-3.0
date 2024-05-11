import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {abi, contractAddresses } from "./constants";

// internal imports
import styles from "./globals.css";
import { NavBar } from "./components/ComponentIndex";
import { Footer } from "./components/ComponentIndex";
import { HeroSection } from "./components/ComponentIndex";
import { Alert } from "./components/ComponentIndex";

const App = () => {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loadingConnectWallet, setLoadingConnectWallet] = useState(false);

  const connectWallet = async () => {
    let provider = new ethers.BrowserProvider(window.ethereum); //use new ethers.providers.Web3Provider(window.ethereum) for v5 of ethers;
    const chainIdBigInt = (await provider.getNetwork()).chainId;
    const chainId = Number(chainIdBigInt);
    console.log(chainId)
    if (provider) {
      try {
        setLoadingConnectWallet(true);
        localStorage.setItem("isWalletConnected", true);
        await provider.send("eth_requestAccounts", []); // to open metamask
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
        setAccount(address);

        // to create instance of contract you need => its. ABI, address. and signer/provider object "0x5FbDB2315678afecb367f032d93F642f64180aa3"
        const contractAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;
        console.log(contractAddress)
        const contract = new ethers.Contract(
          contractAddress,
          abi,
          signer
        );
        setContract(contract);
        setProvider(provider);

        // Listen for account changes
        window.ethereum.on("accountsChanged", async (accounts) => {
          if (accounts.length === 0) {
            // No accounts are connected
            localStorage.removeItem("isWalletConnected");
            setAccount("");
            setContract(null);
            setProvider(null);
          } else {
            // At least one account is connected
            localStorage.setItem("isWalletConnected", true);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
          }
        });
      } catch (error) {
        console.error("Error fetching blockchain data:", error);
        setAlert(
          <Alert
            message={"Error fetching blockchain data. Please try again later."}
            type={"error"}
          />
        );
      } finally {
        setLoadingConnectWallet(false);
      }
    } else {
      setAlert(
        <Alert
          message={
            "Metamask is not installed; Using read-only defaults or install metamask"
          }
          type={"info"}
        />
      );
      provider = ethers.getDefaultProvider();
    }
  };
  const isUnlocked = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    let unlocked;
    try {
      const accounts = await provider.listAccounts();
      unlocked = accounts.length > 0
      console.log(accounts);
    } catch (e) {
      unlocked = false;
    }
    return unlocked;
  }
  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      const isWalletConnected = localStorage.getItem("isWalletConnected");
      if (isWalletConnected === "true" && (await isUnlocked())) {
        console.log(await window.ethereum._metamask.isUnlocked());
        await connectWallet();
      } else {
        console.log("wallet is not accessible");
      }
    };
    connectWalletOnPageLoad();
  }, []);
  
  window.ethereum.on("chainChanged", () => {
    window.location.reload();
  });

  return (
    <>
      {alert}

      <NavBar
        account={account}
        connectWallet={connectWallet}
        loadingConnectWallet={loadingConnectWallet}
        contract={contract}
      />
      <HeroSection account={account} contract={contract} />
      <Footer />
    </>
  );
};

export default App;
