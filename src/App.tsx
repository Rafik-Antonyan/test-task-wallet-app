import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useWalletData } from './hooks/useWalletData';
import { TransactionDetail } from './screens/TransactionDetail';
import { TransactionsList } from './screens/TransactionsList';

export default function App() {
  const { data, isLoading, error } = useWalletData();

  if (isLoading) {
    return (
      <div className="app-shell">
        <div className="phone-frame status-screen">
          <FontAwesomeIcon className="status-icon" icon={faWallet} />
          <p className="status-title">Loading wallet</p>
          <p className="status-copy">Pulling your latest transactions from the local JSON file.</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="app-shell">
        <div className="phone-frame status-screen">
          <FontAwesomeIcon className="status-icon" icon={faWallet} />
          <p className="status-title">Unable to load wallet</p>
          <p className="status-copy">{error ?? 'Wallet data is unavailable.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <Routes>
          <Route path="/" element={<TransactionsList walletData={data} />} />
          <Route path="/transaction/:transactionId" element={<TransactionDetail walletData={data} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}
