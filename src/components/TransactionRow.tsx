import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { TransactionIcon } from "./TransactionIcon";
import type { Transaction } from "../types";
import {
  formatTransactionAmount,
  formatTransactionDate,
} from "../utils/wallet";

type TransactionRowProps = {
  transaction: Transaction;
  onSelect: (id: string) => void;
};

export function TransactionRow({ transaction, onSelect }: TransactionRowProps) {
  const dateLabel = formatTransactionDate(transaction.date);

  return (
    <button
      type="button"
      className="transaction-row"
      onClick={() => onSelect(transaction.id)}
    >
      <TransactionIcon iconKey={transaction.iconKey} />
      <span className="transaction-main">
        <span className="transaction-topline">
          <span className="transaction-name">{transaction.name}</span>
          <div className="transactions-amount-container">
            <span
              className={`transaction-amount ${
                transaction.type === "Payment" ? "is-positive" : ""
              }`}
            >
              {formatTransactionAmount(transaction)}
            </span>
            <FontAwesomeIcon
              className="transaction-chevron"
              icon={faAngleRight}
            />
          </div>
        </span>
        <span className="transaction-description">
          {transaction.status === "Pending" ? "Pending - " : ""}
          {transaction.description}
        </span>
        <span className="transaction-meta">
          {transaction.authorizedUser ? `${transaction.authorizedUser} - ` : ""}
          {dateLabel}
        </span>
      </span>
    </button>
  );
}
