import { ethers } from 'ethers';
import { useState } from 'react';

import { TransactionType, WalletContext, WalletType } from 'hooks/useWallet';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useMetaMask = (walletContext: WalletContext) => {
  const [client] = useState<null>(null);

  const handleDisconnectClient = () => {
    console.log('Connect closed.');
  };

  const handleConnectClient = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();

    const chainId = await signer.getChainId();
    const address = await signer.getAddress();

    const handleSendTransaction = async (tx: TransactionType) => {
      let result;

      try {
        await signer.sendTransaction({
          from: tx.from,
          to: tx.to,
          data: tx.data,
          gasPrice: tx.gasPrice,
          gasLimit: tx.gasLimit,
          value: tx.value,
          nonce: tx.nonce,
        });
      } catch (err) {
        console.log(err);
        result = err;
      }

      return result;
    };

    const wallet: WalletType = {
      client: {
        id: '',
        description: 'MetaMask Desktop Extension',
        icons: [],
        name: 'MetaMask',
        url: 'https://metamask.io/',
        ssl: false,
      },
      chain: {
        id: chainId,
      },
      address,

      sendTransaction: handleSendTransaction,
      signTransaction: handleSendTransaction,

      disconnect: handleDisconnectClient,
    };

    walletContext.set(wallet);
  };

  return {
    client,
    connect: handleConnectClient,
    disconnect: handleDisconnectClient,
  };
};
