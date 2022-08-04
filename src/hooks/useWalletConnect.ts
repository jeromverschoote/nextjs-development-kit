import Client from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { useState } from 'react';

import { TransactionType, WalletContext } from 'hooks/useWallet';

export const useWalletConnect = (walletContext: WalletContext) => {
  const [client, setClient] = useState<Client | null>(null);

  const handleSendTransaction = async (client: Client, tx: TransactionType) => {
    let result;

    try {
      await client?.sendTransaction(tx);
    } catch (err) {
      result = err;
    }

    return result;
  };

  const handleSignTransaction = async (client: Client, tx: TransactionType) => {
    let result;

    try {
      await client?.signTransaction(tx);
    } catch (err) {
      result = err;
    }

    return result;
  };

  const handleDisconnectProvider = () => {
    if (!client) {
      return;
    }

    client.killSession();
    setClient(null);
  };

  const handleConnectClient = () => {
    if (client) {
      if (!client.connected) {
        client.createSession();
      } else {
        const wallet = {
          chain: {
            id: client?.chainId,
          },
          address: client?.accounts?.[0],
          client: {
            id: client?.clientId,
            ...client?.clientMeta,
          },
          sendTransaction: (tx: TransactionType) =>
            handleSendTransaction(client, tx),
          signTransaction: (tx: TransactionType) =>
            handleSignTransaction(client, tx),
          disconnect: handleDisconnectProvider,
        };

        walletContext.set(wallet);
      }
    } else {
      const client = new Client({
        bridge: 'https://bridge.walletconnect.org',
        qrcodeModal: QRCodeModal,
      });

      setClient(client);

      if (!client.connected) {
        client.createSession();
      } else {
        const wallet = {
          chain: {
            id: client?.chainId,
          },
          address: client?.accounts?.[0],
          client: {
            id: client?.clientId,
            ...client?.clientMeta,
          },
          sendTransaction: (tx: TransactionType) =>
            handleSendTransaction(client, tx),
          signTransaction: (tx: TransactionType) =>
            handleSignTransaction(client, tx),
          disconnect: handleDisconnectProvider,
        };

        walletContext.set(wallet);
      }
    }
  };

  client?.on('connect', (error, payload) => {
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
        ...client?.peerMeta,
      },
      sendTransaction: (tx: TransactionType) =>
        handleSendTransaction(client, tx),
      signTransaction: (tx: TransactionType) =>
        handleSignTransaction(client, tx),
      disconnect: handleDisconnectProvider,
    };

    walletContext.set(wallet);
  });

  client?.on('session_update', (error, payload) => {
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
        ...client?.peerMeta,
      },
      sendTransaction: (tx: TransactionType) =>
        handleSendTransaction(client, tx),
      signTransaction: (tx: TransactionType) =>
        handleSignTransaction(client, tx),
      disconnect: handleDisconnectProvider,
    };

    walletContext.set(wallet);
  });

  client?.on('disconnect', (error) => {
    if (error) {
      throw error;
    }
  });

  return {
    client,
    connect: handleConnectClient,
    disconnect: handleDisconnectProvider,
  };
};
