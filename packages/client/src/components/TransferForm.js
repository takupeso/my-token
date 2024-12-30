import { ethers } from "ethers";
import React, { useState } from "react";
import MyTokenABI from "../abis/MyToken.json";

const TransferForm = ({ contractAddress }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    if (!window.ethereum) return alert("MetaMaskがインストールされていません");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, MyTokenABI, signer);

    try {
      const tx = await contract.transfer(recipient, ethers.utils.parseUnits(amount, 18));
      await tx.wait();
      alert("送金が成功しました");
    } catch (error) {
      console.error(error);
      alert("送金に失敗しました");
    }
  };

  return (
    <div>
      <h2>トークン送金</h2>
      <input
        type="text"
        placeholder="受取人アドレス"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="送金額"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>送金</button>
    </div>
  );
};

export default TransferForm;
