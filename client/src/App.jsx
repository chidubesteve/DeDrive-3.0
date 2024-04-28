import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";

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
    let provider;
    if (window.ethereum) {
      try {
        setLoadingConnectWallet(true);
        localStorage.setItem("isWalletConnected", true);
        provider = new ethers.BrowserProvider(window.ethereum); //use new ethers.providers.Web3Provider(window.ethereum) for v5 of ethers
        await provider.send("eth_requestAccounts", []); // to open metamask
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
        setAccount(address);

        // to create instance of contract you need => its. ABI, address. and signer/provider object
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(
          contractAddress,
          Upload.abi,
          signer
        );
        setContract(contract);
        setProvider(signer);

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

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      const isWalletConnected = localStorage.getItem("isWalletConnected");
      if (isWalletConnected === "true") {
        await connectWallet();
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
      />
      <HeroSection account={account} contract={contract} />
      <Footer />
    </>
  );
};

export default App;
