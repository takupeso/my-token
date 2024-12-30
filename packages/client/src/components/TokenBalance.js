import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import MyTokenABI from "../abis/MyToken.json"; // ABIファイル

const TokenBalance = ({ contractAddress }) => {
  const [balance, setBalance] = useState(0);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      if (!window.ethereum) return alert("MetaMaskがインストールされていません");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();
      setAccount(userAddress);

      const contract = new ethers.Contract(contractAddress, MyTokenABI, signer);
      const balance = await contract.balanceOf(userAddress);
      setBalance(ethers.utils.formatUnits(balance, 18));
    };

    fetchBalance();
  }, [contractAddress]);

  return (
    <div>
      <h2>トークン残高</h2>
      <p>アカウント: {account}</p>
      <p>残高: {balance} MTK</p>
    </div>
  );
};

export default TokenBalance;
