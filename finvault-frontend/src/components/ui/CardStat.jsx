import React from 'react';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../utils/format';

export default function CardStat({ title, value, sub, icon, formatType = 'auto' }) {
  const renderValue = () => {
    if (formatType === 'raw') return value ?? '—';
    if (formatType === 'number') return value ?? '0';
    if (formatType === 'currency') return formatCurrency(value);
    if (typeof value === 'number') return formatCurrency(value);
    if (typeof value === 'string' && /^\d+$/.test(value) && value.length > 8) return value;
    return value ?? '—';
  };

  return (
    <div className="card glass p-3 h-100">
      <div className="d-flex align-items-center">
        <div className="me-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: 56,
              height: 56,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.03)'
            }}
          >
            {icon ? <i className={`bi ${icon} fs-4 text-white`} /> : <i className="bi bi-piggy-bank fs-4 text-white" />}
          </div>
        </div>

        <div className="flex-grow-1">
          <div className="small text-white-50" style={{opacity: 0.9}}>{title}</div>
          <div className="h5 mb-0 text-white" style={{fontSize: '1.25rem', marginTop: '6px'}}>{renderValue()}</div>
          {sub && <div className="small text-white-50 mt-1" style={{opacity: 0.85}}>{sub}</div>}
        </div>
      </div>
    </div>
  );
}

CardStat.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sub: PropTypes.string,
  icon: PropTypes.string,
  formatType: PropTypes.oneOf(['auto', 'currency', 'number', 'raw'])
};
