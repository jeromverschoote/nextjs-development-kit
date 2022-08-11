import { Bytes, ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NotificationContextType } from 'context/Notifications';

import { ProviderRpcErrorEnum } from 'enums/ProviderRpcErrorEnum';

import { ProviderRpcErrorType } from 'types/ProviderRpcErrorType';

import {
  ChainType,
  TransactionType,
  WalletContext,
  WalletType,
} from 'hooks/useWallet';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface Options {
  context: WalletContext;
  notifications: NotificationContextType;
  chain: ChainType;
}

export const useMetaMask = (options: Options) => {
  const { reload } = useRouter();
  const { t } = useTranslation();

  const [provider, setProvider] = useState<any | null>(null);

  const [isConnecting, setIsConnecting] = useState(false);

  const handleDisconnectClient = async () => {
    options.notifications.create({
      id: 'meta-mask-disconnect-success',
      title: 'Successfully disconnected wallet.',
      type: 'success',
    });
  };

  const handleConnectClient = async () => {
    setIsConnecting(true);

    const provider = new ethers.providers.Web3Provider(window?.ethereum);

    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();

    const address = await signer.getAddress();
    const balance = Number(
      await ethers.utils.formatEther(await signer.getBalance()),
    );
    const chainId = await signer.getChainId();

    if (chainId !== options.chain.id) {
      setIsConnecting(false);
      return options.notifications.create({
        id: 'meta-mask-connect-error',
        title: 'Failed connecting wallet.',
        description: t('provider.error.chainDisconnected'),
        type: 'error',
      });
    }

    const feeData = await signer.getFeeData();
    const gasPrice = Number(
      await ethers.utils.formatEther(await signer.getGasPrice()),
    );
    const transactionCount = await signer.getTransactionCount();

    const handleSendTransaction = async (tx: TransactionType) => {
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
      } catch (err: ProviderRpcErrorType | any) {
        options.notifications.create({
          id: 'meta-mask-send-error',
          title: 'Failed sending transaction!',
          description: t(ProviderRpcErrorEnum[err.code.toString()]),
          type: 'error',
        });
      }
    };

    const handleSignMessage = async (message: Bytes | string) => {
      try {
        await signer.signMessage(message);
      } catch (err: ProviderRpcErrorType | any) {
        options.notifications.create({
          id: 'meta-mask-sign-error',
          title: 'Failed signing message!',
          description: t(ProviderRpcErrorEnum[err.code.toString()]),
          type: 'error',
        });
      }
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
      balance,
      feeData,
      gasPrice,
      transactionCount,

      sendTransaction: handleSendTransaction,
      signMessage: handleSignMessage,

      disconnect: handleDisconnectClient,
    };

    setProvider(provider);
    options.context.set(wallet);

    setIsConnecting(false);

    options.notifications.create({
      id: 'meta-mask-connect-success',
      title: 'Successfully connected wallet.',
      type: 'success',
    });
  };

  useEffect(() => {
    window.ethereum.on('chainChanged', () => {
      options.notifications.create({
        id: 'meta-mask-change-info',
        title: 'Change in network detected.',
        description: 'Refreshing page...',
        type: 'info',
      });
      reload();
    });
  }, [options.notifications, reload]);

  return {
    client: provider,
    connect: handleConnectClient,
    disconnect: handleDisconnectClient,
    isConnecting,
  };
};
