import { useState } from 'react';

export type WalletType = {
  address: string;
};

export const useWallet = (): {
  me: WalletType | null;
  connect: (wallet: WalletType) => void;
  disconnect: () => void;
} => {
  const [wallet, setWallet] = useState<WalletType | null>(null);

  const handleConnectWallet = (wallet: WalletType) => {
    setWallet(wallet);
  };

  const handleDisconnectWallet = () => {
    setWallet(null);
  };

  return {
    me: wallet,
    connect: handleConnectWallet,
    disconnect: handleDisconnectWallet,
  };
};
