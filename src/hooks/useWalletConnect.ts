import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { useState } from 'react';

import { TransactionType, WalletContext } from 'hooks/useWallet';

export const useWalletConnect = (walletContext: WalletContext) => {
  const [provider, setProvider] = useState<WalletConnect | null>(null);

  const handleSendTransaction = async (
    provider: WalletConnect,
    tx: TransactionType,
  ) => {
    let result;

    try {
      await provider?.sendTransaction(tx);
    } catch (err) {
      result = err;
    }

    return result;
  };

  const handleSignTransaction = async (
    provider: WalletConnect,
    tx: TransactionType,
  ) => {
    let result;

    try {
      await provider?.signTransaction(tx);
    } catch (err) {
      result = err;
    }

    return result;
  };

  const handleDisconnectProvider = () => {
    if (!provider) {
      return;
    }

    provider.killSession();
    setProvider(null);
  };

  provider?.on('connect', (error, payload) => {
    if (error) {
      throw error;
    }

    const wallet = {
      chain: {
        id: payload.params[0]?.chainId,
      },
      address: payload.params[0]?.accounts?.[0],
      client: {
        id: payload.params[0]?.peerId,
        ...provider?.peerMeta,
      },
      sendTransaction: (tx: TransactionType) =>
        handleSendTransaction(provider, tx),
      signTransaction: (tx: TransactionType) =>
        handleSignTransaction(provider, tx),
      disconnect: handleDisconnectProvider,
    };

    walletContext.set(wallet);
  });

  provider?.on('session_update', (error, payload) => {
    if (error) {
      throw error;
    }

    const wallet = {
      chain: {
        id: payload.params[0]?.chainId,
      },
      address: payload.params[0]?.accounts?.[0],
      client: {
        id: payload.params[0]?.peerId,
        ...provider?.peerMeta,
      },
      sendTransaction: (tx: TransactionType) =>
        handleSendTransaction(provider, tx),
      signTransaction: (tx: TransactionType) =>
        handleSignTransaction(provider, tx),
      disconnect: handleDisconnectProvider,
    };

    walletContext.set(wallet);
  });

  provider?.on('disconnect', (error) => {
    if (error) {
      throw error;
    }
  });

  const handleConnectProvider = () => {
    if (provider) {
      if (!provider.connected) {
        provider.createSession();
      } else {
        const wallet = {
          chain: {
            id: provider?.chainId,
          },
          address: provider?.accounts?.[0],
          client: {
            id: provider?.clientId,
            ...provider?.clientMeta,
          },
          sendTransaction: (tx: TransactionType) =>
            handleSendTransaction(provider, tx),
          signTransaction: (tx: TransactionType) =>
            handleSignTransaction(provider, tx),
          disconnect: handleDisconnectProvider,
        };

        walletContext.set(wallet);
      }
    } else {
      const newProvider = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org',
        qrcodeModal: QRCodeModal,
      });

      setProvider(newProvider);

      if (!newProvider.connected) {
        newProvider.createSession();
      } else {
        const wallet = {
          chain: {
            id: newProvider?.chainId,
          },
          address: newProvider?.accounts?.[0],
          client: {
            id: newProvider?.clientId,
            ...newProvider?.clientMeta,
          },
          sendTransaction: (tx: TransactionType) =>
            handleSendTransaction(newProvider, tx),
          signTransaction: (tx: TransactionType) =>
            handleSignTransaction(newProvider, tx),
          disconnect: handleDisconnectProvider,
        };

        walletContext.set(wallet);
      }
    }
  };

  return {
    provider,
    connect: handleConnectProvider,
    disconnect: handleDisconnectProvider,
  };
};
