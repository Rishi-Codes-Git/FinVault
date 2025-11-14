import React, { useState } from 'react';
import api from '../api/api';


export default function Transfer(){
const [toAcc, setToAcc] = useState('');
const [amount, setAmount] = useState('');
const [note, setNote] = useState('');
const [msg, setMsg] = useState('');
const [err, setErr] = useState('');


const submit = async (e) => {
e.preventDefault();
setMsg(''); setErr('');
try {
await api.post('/account/transfer', { toAccountNumber: toAcc, amount, note });
setMsg('Transfer successful');
setToAcc(''); setAmount(''); setNote('');
} catch (error) {
setErr(error.response?.data?.error || 'Error');
}
};


return (
<div className="glass p-4 col-md-6 mx-auto">
<h3>Transfer Money</h3>
{msg && <div className="alert alert-success">{msg}</div>}
{err && <div className="alert alert-danger">{err}</div>}
<form onSubmit={submit}>
<div className="mb-3"><label className="form-label">To Account</label><input className="form-control" value={toAcc} onChange={(e)=>setToAcc(e.target.value)} /></div>
<div className="mb-3"><label className="form-label">Amount</label><input className="form-control" value={amount} onChange={(e)=>setAmount(e.target.value)} /></div>
<div className="mb-3"><label className="form-label">Note</label><input className="form-control" value={note} onChange={(e)=>setNote(e.target.value)} /></div>
<button className="btn btn-primary w-100">Send</button>
</form>
</div>
);
}