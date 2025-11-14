import React, { useState, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Login(){
const [form, setForm] = useState({ usernameOrEmail:'', password:'' });
const [err, setErr] = useState('');
const { setUser } = useContext(AuthContext);
const navigate = useNavigate();


const submit = async (e) => {
e.preventDefault();
try {
const res = await api.post('/auth/login', form);
localStorage.setItem('accessToken', res.data.accessToken);
const acc = await api.get('/account');
setUser(acc.data);
navigate('/dashboard');
} catch (error) {
setErr(error.response?.data?.error || 'Login failed');
}
};


return (
<div className="d-flex justify-content-center align-items-center" style={{minHeight: '70vh'}}>
<div className="col-md-5 glass p-4">
<h3 className="mb-3">Login</h3>
{err && <div className="alert alert-danger">{err}</div>}
<form onSubmit={submit}>
<div className="mb-3">
<label className="form-label">Username or Email</label>
<input className="form-control" value={form.usernameOrEmail} onChange={e=>setForm({...form, usernameOrEmail: e.target.value})} />
</div>
<div className="mb-3">
<label className="form-label">Password</label>
<input type="password" className="form-control" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
</div>
<button className="btn btn-primary w-100">Login</button>
</form>
</div>
</div>
);
}