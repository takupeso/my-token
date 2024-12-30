import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "xxxx", // thegraphのサブグラフのエンドポイント
  cache: new InMemoryCache(),
});

export default client;
