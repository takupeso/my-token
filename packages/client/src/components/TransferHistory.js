import { gql, useQuery } from "@apollo/client";
import React from "react";

const TRANSFER_HISTORY_QUERY = gql`
  query GetTransferHistory($recipient: Bytes!) {
    transfers(where: { to: $recipient }) {
      id
      from
      to
      value
    }
  }
`;

const TransferHistory = ({ recipient }) => {
  const { loading, error, data } = useQuery(TRANSFER_HISTORY_QUERY, {
    variables: { recipient },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>トランスファー履歴</h2>
      <ul>
        {data.transfers.map((transfer) => (
          <li key={transfer.id}>
            From: {transfer.from} | To: {transfer.to} | Value:{" "}
            {parseFloat(transfer.value) / Math.pow(10, 18)} MTK
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransferHistory;
