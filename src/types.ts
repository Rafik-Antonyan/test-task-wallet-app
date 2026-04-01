export type TransactionIconKey =
  | 'apple'
  | 'basket'
  | 'car'
  | 'ikea'
  | 'netflix'
  | 'sun'
  | 'target';

export type TransactionType = 'Payment' | 'Credit';
export type TransactionStatus = 'Approved' | 'Pending';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  name: string;
  description: string;
  merchant: string;
  location: string;
  date: string;
  status: TransactionStatus;
  cardName: string;
  cardLast4: string;
  authorizedUser?: string;
  iconKey: TransactionIconKey;
}

export interface WalletData {
  creditLimit: number;
  noPaymentDueMessage: string;
  transactions: Transaction[];
}
