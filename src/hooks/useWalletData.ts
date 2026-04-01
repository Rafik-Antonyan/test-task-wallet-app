import { useEffect, useState } from 'react';
import type { WalletData } from '../types';
import { loadWalletData } from '../utils/wallet';

type WalletState = {
  data: WalletData | null;
  isLoading: boolean;
  error: string | null;
};

export function useWalletData(): WalletState {
  const [data, setData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const response = await fetch('/data/wallet.json');

        if (!response.ok) {
          throw new Error(`Failed to load wallet data (${response.status}).`);
        }

        const rawData = (await response.json()) as WalletData;

        if (isMounted) {
          setData(loadWalletData(rawData));
        }
      } catch (loadError) {
        if (isMounted) {
          setError(loadError instanceof Error ? loadError.message : 'Unknown error.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
