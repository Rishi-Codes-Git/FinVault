import React, { useState } from 'react';
import api from '../services/api';

export default function TransferForm({ onTransfer }) {
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromId || !toId || !amount) return alert("All fields required");

    try {
      await api.post('/accounts/transfer', {
        fromId: Number(fromId),
        toId: Number(toId),
        amount: Number(amount)
      });
      setFromId('');
      setToId('');
      setAmount('');
      onTransfer(); // refresh account list
      alert("Transfer successful!");
    } catch (error) {
      console.error(error);
      alert("Transfer failed! Check account IDs and balance.");
    }
  };

  return (
    <div className="card p-3 mt-3">
      <h5>Transfer Funds</h5>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="From Account ID"
          value={fromId}
          onChange={(e) => setFromId(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="To Account ID"
          value={toId}
          onChange={(e) => setToId(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="btn btn-primary">Transfer</button>
      </form>
    </div>
  );
}
