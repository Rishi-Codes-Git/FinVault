import React, { useEffect, useState } from 'react';
import api from '../api/api';
import CardStat from '../components/ui/CardStat';
import { formatCurrency } from '../utils/format';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [account, setAccount] = useState(null);
  const [tx, setTx] = useState([]);

  useEffect(() => {
    api.get('/account').then(res => setAccount(res.data)).catch(()=>setAccount(null));
    api.get('/transactions').then(res => setTx(res.data)).catch(()=>setTx([]));
  }, []);

  const timeline = React.useMemo(() => {
    if (!tx || tx.length === 0) return [];

    const sorted = [...tx].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

    const points = [];
    let running = 0;
    sorted.forEach((t, i) => {
      const amt = Number(t.amount) || 0;
      if (t.txType === 'DEPOSIT' || t.txType === 'TRANSFER_IN') {
        running += amt;
      } else if (t.txType === 'WITHDRAW' || t.txType === 'TRANSFER_OUT') {
        running -= amt;
      } else {
        running += amt;
      }
      points.push({
        name: `T${i + 1}`,
        balance: Number(running.toFixed(2))
      });
    });

    return points;
  }, [tx]);

  const chartData = timeline.length > 0 ? timeline : (account ? [{ name: 'Now', balance: Number(account.balance || 0) }] : []);

  return (
    <div className="mt-4">

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <CardStat title="Balance" value={account?.balance ?? 0} sub="Current Balance" icon="bi-wallet2" formatType="currency" />
        </div>

        <div className="col-md-4">
          <CardStat title="Account Number" value={account?.accountNumber ?? '—'} sub="Primary Account" icon="bi-hash" formatType="raw" />
        </div>

        <div className="col-md-4">
          <CardStat title="Transactions" value={tx.length} sub="Total Records" icon="bi-receipt" formatType="number" />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-7">
          <div className="glass p-4 h-100">
            <h5 className="mb-3 text-white">Transactional Activity</h5>

            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <XAxis dataKey="name" stroke="#9fb5c8" />
                  <YAxis stroke="#9fb5c8" />
                  <Tooltip
                    contentStyle={{ background: '#0b2b45', border: '1px solid rgba(255,255,255,0.06)' }}
                    labelStyle={{ color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="balance" stroke="#00ffc3" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="glass p-4 h-100">
            <h5 className="mb-3 text-white">Recent Transactions</h5>

            <div className="list-group" style={{ maxHeight: 300, overflowY: 'auto' }}>
              {tx.length === 0 && (
                <div className="text-white-50 p-3">No transactions yet</div>
              )}

              {tx.slice(0, 10).map(t => {
                const isCredit = t.txType === 'DEPOSIT' || t.txType === 'TRANSFER_IN';
                const amountClass = isCredit ? 'text-success' : 'text-danger';
                const sign = isCredit ? '+' : '-';
                return (
                  <div key={t.id} className="list-group-item bg-transparent text-white border-bottom d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-bold text-white">{t.txType}</div>
                      <div className="small text-white-50">{t.note || '—'}</div>
                    </div>
                    <div className={`fw-bold ${amountClass}`}>{sign}{formatCurrency(t.amount)}</div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
