import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Upload from './artifacts/contracts/Upload.sol/Upload.json';

// internal imports
import styles from "./globals.css";
import { NavBar } from "./components/ComponentIndex";
import { Footer } from "./components/ComponentIndex";
import { HeroSection } from "./components/ComponentIndex";

const App = () => {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const fetchBlockchainData = async () => {
      let provider;
      try {
        provider = new ethers.BrowserProvider(window.ethereum); //use new ethers.providers.Web3Provider(window.ethereum) for v5 of ethers
        await provider.send('eth_requestAccounts', []); // to open metamask
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        console.log(address);
        setAccount(address);

        // to create instance of contract you need => its. ABI, address. and signer/provider object
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
        console.log(contract);
        setContract(contract);
        setProvider(signer);
      } catch (error) {
        console.error("Error fetching blockchain data:", error);
        alert("Error fetching blockchain data. Please check console for details.");
      }
    };

    if (window.ethereum) {
      fetchBlockchainData();
    } else {
      alert("Metamask is not installed; Using read-only defaults or install metamask");
      provider = ethers.getDefaultProvider()
    }
  }, []);

  return (
    <>
      <NavBar />
      <HeroSection account={account} contract={contract} />
      <Footer />
    </>
  );
};

export default App;
