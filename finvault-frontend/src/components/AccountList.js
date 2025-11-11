import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AccountList({ refreshKey }) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    api.get('/accounts')
      .then(res => setAccounts(res.data))
      .catch(err => console.error("Error loading accounts", err));
  }, [refreshKey]);

  return (
    <div className="card p-3 mt-3">
      <h5>Account List</h5>
      <table className="table table-bordered table-hover mt-2">
        <thead>
          <tr>
            <th>ID</th>
            <th>Holder Name</th>
            <th>Account No</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(acc => (
            <tr key={acc.id}>
              <td>{acc.id}</td>
              <td>{acc.holderName}</td>
              <td>{acc.accountNumber}</td>
              <td>₹{acc.balance.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
