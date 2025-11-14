import React, { useEffect, useState } from 'react';
import api from '../api/api';
import TransactionRow from '../components/ui/TransactionRow';


export default function Transactions(){
const [tx, setTx] = useState([]);


useEffect(()=>{
api.get('/transactions').then(res=>setTx(res.data));
},[]);


return (
<div className="glass p-4">
<h3>Transaction History</h3>
<table className="table table-dark table-striped mt-3">
<thead>
<tr>
<th>Type</th>
<th>Amount</th>
<th>Counterparty</th>
<th>Date</th>
<th>Note</th>
</tr>
</thead>
<tbody>
{tx.map(row => <TransactionRow key={row.id} row={row} />)}
</tbody>
</table>
</div>
);
}