import React from 'react';
import { formatCurrency, formatDate } from '../../utils/format';
import PropTypes from 'prop-types';

export default function TransactionRow({ row }) {
  const isCredit = row.txType === 'DEPOSIT' || row.txType === 'TRANSFER_IN';
  const colorClass = isCredit ? 'text-success' : 'text-danger';
  const symbol = isCredit ? '+' : '-';

  return (
    <tr>
      <td>
        <span className="badge bg-secondary">{row.txType}</span>
      </td>
      <td className={colorClass}>
        {symbol} {formatCurrency(row.amount)}
      </td>
      <td>{row.counterpartyAccountNumber || '—'}</td>
      <td>{formatDate(row.createdAt)}</td>
      <td>{row.note || '—'}</td>
    </tr>
  );
}

TransactionRow.propTypes = {
  row: PropTypes.shape({
    txType: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    counterpartyAccountNumber: PropTypes.string,
    createdAt: PropTypes.string,
    note: PropTypes.string
  }).isRequired
};
