import React, { useState } from "react";
import { ethers } from "ethers";

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  // Function to connect MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const signer = await provider.getSigner();
        setWalletAddress(await signer.getAddress());
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to continue.");
    }
  };

  return (
    <div className="text-center p-4">
      {walletAddress ? (
        <p className="text-green-500">Connected: {walletAddress}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
