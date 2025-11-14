import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';


export default function Register(){
const [form, setForm] = useState({ username:'', email:'', password:'' });
const [err, setErr] = useState('');
const navigate = useNavigate();


const submit = async (e) => {
e.preventDefault();
try {
await api.post('/auth/register', form);
navigate('/login');
} catch (error) {
setErr(error.response?.data?.error || 'Registration failed');
}
};


return (
<div className="d-flex justify-content-center align-items-center" style={{minHeight:'70vh'}}>
<div className="col-md-5 glass p-4">
<h3 className="mb-3">Create your account</h3>
{err && <div className="alert alert-danger">{err}</div>}
<form onSubmit={submit}>
<div className="mb-3"><label className="form-label">Username</label><input className="form-control" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} /></div>
<div className="mb-3"><label className="form-label">Email</label><input type="email" className="form-control" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /></div>
<div className="mb-3"><label className="form-label">Password</label><input type="password" className="form-control" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} /></div>
<button className="btn btn-primary w-100">Register</button>
</form>
</div>
</div>
);
}