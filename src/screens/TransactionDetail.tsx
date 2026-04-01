import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate, useParams } from 'react-router-dom';
import type { WalletData } from '../types';
import { formatDetailDate, formatTransactionAmount } from '../utils/wallet';

type TransactionDetailProps = {
  walletData: WalletData;
};

export function TransactionDetail({ walletData }: TransactionDetailProps) {
  const { transactionId } = useParams();
  const transaction = walletData.transactions.find((item) => item.id === transactionId);

  if (!transaction) {
    return <Navigate to="/" replace />;
  }

  const detailDate = formatDetailDate(transaction.date);

  return (
    <main className="screen screen-detail">
      <header className="detail-header">
        <Link className="back-button" to="/">
          <FontAwesomeIcon icon={faAngleLeft} />
        </Link>
      </header>

      <section className="detail-hero">
        <p className="detail-amount">${transaction.amount.toFixed(2)}</p>
        <p className="detail-merchant">{transaction.location}</p>
        <p className="detail-datetime">
          {detailDate.date}, {detailDate.time}
        </p>
      </section>

      <section className="detail-card">
        <div className="detail-row detail-row-stack">
          <span className="detail-label">Status: {transaction.status}</span>
          <span className="detail-subtitle">{transaction.cardName}</span>
        </div>
        <div className="detail-divider" />
        <div className="detail-row">
          <span className="detail-label">Transaction Type</span>
          <span className="detail-value">{transaction.type}</span>
        </div>
        <div className="detail-divider" />
        <div className="detail-row">
          <span className="detail-label">Merchant</span>
          <span className="detail-value">{transaction.name}</span>
        </div>
        <div className="detail-divider" />
        <div className="detail-row">
          <span className="detail-label">Description</span>
          <span className="detail-value detail-value-multiline">{transaction.description}</span>
        </div>
        <div className="detail-divider" />
        <div className="detail-row">
          <span className="detail-label">Card</span>
          <span className="detail-value">•••• {transaction.cardLast4}</span>
        </div>
        {transaction.authorizedUser ? (
          <>
            <div className="detail-divider" />
            <div className="detail-row">
              <span className="detail-label">Authorized User</span>
              <span className="detail-value">{transaction.authorizedUser}</span>
            </div>
          </>
        ) : null}
        <div className="detail-divider" />
        <div className="detail-row">
          <span className="detail-label">Date</span>
          <span className="detail-value">{detailDate.date}</span>
        </div>
        <div className="detail-divider" />
        <div className="detail-row">
          <span className="detail-label">Total</span>
          <span className="detail-total">{formatTransactionAmount(transaction)}</span>
        </div>
      </section>
    </main>
  );
}
