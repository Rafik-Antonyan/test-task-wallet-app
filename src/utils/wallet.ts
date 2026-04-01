import type { Transaction, WalletData } from '../types';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

function makeSeed(value: string): number {
  return value.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

export function createCardBalance(limit: number, transactions: Transaction[]): number {
  const seed = transactions.reduce((sum, transaction) => sum + makeSeed(transaction.id), 0);
  const ratio = 0.38 + ((seed % 41) / 100);
  return Number((limit * ratio).toFixed(2));
}

function getSeasonStart(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth();

  if (month >= 2 && month <= 4) {
    return new Date(year, 2, 1);
  }

  if (month >= 5 && month <= 7) {
    return new Date(year, 5, 1);
  }

  if (month >= 8 && month <= 10) {
    return new Date(year, 8, 1);
  }

  return month === 11 ? new Date(year, 11, 1) : new Date(year - 1, 11, 1);
}

export function calculateDailyPoints(date: Date): number {
  const seasonStart = getSeasonStart(date);
  const dayNumber = Math.floor((date.getTime() - seasonStart.getTime()) / DAY_IN_MS) + 1;

  if (dayNumber <= 1) {
    return 2;
  }

  if (dayNumber === 2) {
    return 3;
  }

  let twoDaysAgo = 2;
  let previousDay = 3;

  for (let day = 3; day <= dayNumber; day += 1) {
    const current = Math.round(twoDaysAgo + previousDay * 0.6);
    twoDaysAgo = previousDay;
    previousDay = current;
  }

  return previousDay;
}

export function formatPoints(points: number): string {
  if (points < 1000) {
    return `${points}`;
  }

  return `${Math.round(points / 1000)}K`;
}

export function loadWalletData(rawData: WalletData): WalletData {
  return {
    ...rawData,
    transactions: [...rawData.transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    ),
  };
}

export function formatTransactionAmount(transaction: Transaction): string {
  const sign = transaction.type === 'Payment' ? '+' : '$';
  const value = transaction.amount.toFixed(2);

  return transaction.type === 'Payment' ? `${sign}$${value}` : `${sign}${value}`;
}

export function formatTransactionDate(dateString: string, today = new Date()): string {
  const date = new Date(dateString);
  const diff = Math.floor((today.getTime() - date.getTime()) / DAY_IN_MS);

  if (diff <= 0) {
    return 'Today';
  }

  if (diff === 1) {
    return 'Yesterday';
  }

  if (diff < 7) {
    return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
  }).format(date);
}

export function getStatementMonthLabel(today = new Date()): string {
  const statementDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(statementDate);
}

export function formatDetailDate(dateString: string): { date: string; time: string } {
  const date = new Date(dateString);

  return {
    date: new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
    }).format(date),
    time: new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    }).format(date),
  };
}
