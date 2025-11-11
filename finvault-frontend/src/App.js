import React, { useState } from 'react';
import AddAccount from './components/AddAccount';
import AccountList from './components/AccountList';
import TransferForm from './components/TransferForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey(oldKey => oldKey + 1);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🏦 FinVault Banking System</h2>

      <AddAccount onAccountCreated={refresh} />
      <TransferForm onTransfer={refresh} />
      <AccountList refreshKey={refreshKey} />

      <footer className="text-center text-muted mt-4">
        <hr />
        <small>FinVault © 2025 | Developed by Rishi</small>
      </footer>
    </div>
  );
}

export default App;
