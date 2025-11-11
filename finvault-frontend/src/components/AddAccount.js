import React, { useState } from 'react';
import api from '../services/api';

export default function AddAccount({ onAccountCreated }) {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert("Enter account holder name");

    try {
      await api.post('/accounts', {
        holderName: name,
        balance: Number(balance)
      });
      setName('');
      setBalance('');
      onAccountCreated(); // refresh account list
    } catch (error) {
      console.error(error);
      alert("Error creating account");
    }
  };

  return (
    <div className="card p-3 mt-3">
      <h5>Create New Account</h5>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Holder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Initial Balance"
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <button className="btn btn-success">Create</button>
      </form>
    </div>
  );
}
