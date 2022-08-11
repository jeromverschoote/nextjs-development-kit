import { Bytes } from 'ethers';
import { useState } from 'react';

export type ClientType = {
  id: string;
  description?: string;
  icons?: string[];
  name?: string;
  url?: string;
  ssl?: boolean;
};

export type ChainType = {
  id: string | number;
  name?: string;
};

export type TransactionType = {
  from: string;
  type?: string;
  to?: string;
  value?: number | string;
  gas?: number | string;
  gasLimit?: number | string;
  gasPrice?: number | string;
  nonce?: number | string;
  data?: string;
};

export type WalletType = {
  client: ClientType;
  chain: ChainType;

  address: string;
  balance?: number | string;
  feeData?: any;
  gasPrice?: number | string;
  transactionCount?: number;

  sendTransaction: (tx: TransactionType) => Promise<any>;
  signMessage: (
    message: (any | Bytes | string) | (any | Bytes | string)[],
  ) => Promise<any>;

  disconnect: () => void;
};

export interface WalletContext {
  wallet: WalletType | null;
  set: (wallet: WalletType) => void;
  clear: () => void;
}

export const useWallet = (): WalletContext => {
  const [wallet, setWallet] = useState<WalletType | null>(null);

  const handleSetWallet = (wallet: WalletType) => {
    setWallet(wallet);
  };

  const handleClearWallet = () => {
    wallet?.disconnect();
    setWallet(null);
  };

  return {
    wallet,
    set: handleSetWallet,
    clear: handleClearWallet,
  };
};
