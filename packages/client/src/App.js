import { ApolloProvider } from "@apollo/client";
import React, { useEffect, useState } from "react";
import client from "./apolloClient";
import TokenBalance from "./components/TokenBalance";
import TransferForm from "./components/TransferForm";
import TransferHistory from "./components/TransferHistory";

const CONTRACT_ADDRESS = "xxxxx"; // YOUR CONTRACT_ADDRESS

function App() {
  const [account, setAccount] = useState("");

  // MetaMaskのアカウントを取得
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.error("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected: ", accounts[0]);
      setAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>MyToken Dashboard</h1>
        <TokenBalance contractAddress={CONTRACT_ADDRESS} />
        <TransferForm contractAddress={CONTRACT_ADDRESS} />
        <TransferHistory recipient={account} />
      </div>
    </ApolloProvider>
  );
}

export default App;
