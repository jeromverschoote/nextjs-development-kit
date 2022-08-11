import Client from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NotificationContextType } from 'context/Notifications';

import { ChainType, TransactionType, WalletContext } from 'hooks/useWallet';

interface Options {
  context: WalletContext;
  notifications: NotificationContextType;
  chain: ChainType;
}

export const useWalletConnect = (options: Options) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [isConnecting, setIsConnecting] = useState(false);

  const [client, setClient] = useState<Client | null>(null);

  const handleSendTransaction = async (client: Client, tx: TransactionType) => {
    try {
      await client?.sendTransaction(tx);
    } catch (err) {
      options.notifications.create({
        id: 'wallet-connect-send-error',
        title: 'Failed sending transaction!',
        description: t('provider.error.general'),
        type: 'error',
      });
    }
  };

  // const convertUtf8ToHex = (value: string) => {
  //   let hex = '';
  //   for (var i = 0; i < value.length; i++) {
  //     hex += '' + value.charCodeAt(i).toString(16);
  //   }
  //   console.log(hex);
  //   return hex;
  // };

  const handleSignMessage = async (client: Client, message: string) => {
    // @TODO: Hex message?
    const msgParams = [message, client?.accounts?.[0]];

    try {
      await client?.signPersonalMessage(msgParams);
    } catch (err) {
      options.notifications.create({
        id: 'wallet-connect-sign-error',
        title: 'Failed signing message!',
        description: t('provider.error.general'),
        type: 'error',
      });
    }
  };

  const handleDisconnectProvider = () => {
    options.notifications.create({
      id: 'wallet-connect-disconnect-success',
      title: 'Successfully disconnected wallet.',
      type: 'success',
    });

    if (client) {
      client.killSession();
    }

    setClient(null);
  };

  const handleConnectClient = () => {
    setIsConnecting(true);

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
          signMessage: (message: string) => handleSignMessage(client, message),
          disconnect: handleDisconnectProvider,
        };

        options.context.set(wallet);
      }
    } else {
      const client = new Client({
        bridge: 'https://bridge.walletconnect.org',
        qrcodeModal: QRCodeModal,
      });

      setClient(client);

      if (client?.chainId !== options.chain.id) {
        setIsConnecting(false);
        return options.notifications.create({
          id: 'wallet-connect-connect-success',
          title: 'Failed connecting wallet.',
          description: t('provider.error.chainDisconnected'),
          type: 'error',
        });
      }

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
          signMessage: (message: string) => handleSignMessage(client, message),
          disconnect: handleDisconnectProvider,
        };

        options.context.set(wallet);
      }
    }

    setIsConnecting(false);

    options.notifications.create({
      id: 'wallet-connect-connect-success',
      title: 'Successfully connected wallet.',
      type: 'success',
    });
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
      signMessage: (message: string) => handleSignMessage(client, message),
      disconnect: handleDisconnectProvider,
    };

    options.context.set(wallet);
  });

  client?.on('session_update', (error, payload) => {
    if (error) {
      throw error;
    }

    const hasChangedNetwork =
      payload.params[0]?.chainId !== options.context.wallet?.chain.id;

    if (hasChangedNetwork) {
      options.notifications.create({
        id: 'wallet-connect-change-info',
        title: 'Change in network detected.',
        description: 'Refreshing page...',
        type: 'info',
      });
      router.reload();
    }
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
    isConnecting,
  };
};
