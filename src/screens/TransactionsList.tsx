import { useNavigate } from 'react-router-dom';
import { SummaryCard } from '../components/SummaryCard';
import { TransactionRow } from '../components/TransactionRow';
import type { WalletData } from '../types';
import {
  calculateDailyPoints,
  createCardBalance,
  formatPoints,
  getStatementMonthLabel,
} from '../utils/wallet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type TransactionsListProps = {
  walletData: WalletData;
};

export function TransactionsList({ walletData }: TransactionsListProps) {
  const navigate = useNavigate();
  const cardBalance = createCardBalance(walletData.creditLimit, walletData.transactions);
  const availableAmount = walletData.creditLimit - cardBalance;
  const dailyPoints = calculateDailyPoints(new Date());
  const statementMonth = getStatementMonthLabel();

  return (
    <main className="screen screen-list">
      <section className="cards-grid">
        <SummaryCard title="Card Balance">
          <p className="balance-amount">${cardBalance.toFixed(2)}</p>
          <p className="supporting-copy">${availableAmount.toFixed(2)} Available</p>
        </SummaryCard>

        <SummaryCard title="No Payment Due" className="payment-due-card">
          <div className="payment-due-content">
            <div>
              <p className="supporting-copy">You've paid your {statementMonth} balance.</p>
            </div>
            <span className="payment-check">
              <FontAwesomeIcon icon={faCheck}/>
            </span>
          </div>
        </SummaryCard>

        <SummaryCard title="Daily Points" className='summary-daily'>
          <p className="points-value">{formatPoints(dailyPoints)}</p>
        </SummaryCard>
      </section>

      <section className="transactions-section">
        <h1 className="section-title">Latest Transactions</h1>
        <div className="transactions-list">
          {walletData.transactions.slice(0, 10).map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onSelect={(id) => navigate(`/transaction/${id}`)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
