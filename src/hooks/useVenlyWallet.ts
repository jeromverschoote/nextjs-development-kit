import { Venly } from '@venly/web3-provider';
import { Bytes, ethers } from 'ethers';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NotificationContextType } from 'context/Notifications';

import { ProviderRpcErrorType } from 'types/ProviderRpcErrorType';

import {
  ChainType,
  TransactionType,
  WalletContext,
  WalletType,
} from 'hooks/useWallet';

//docs.venly.io/widget/widget-advanced/object-type-reference/wip-signerresult#parameters

enum SecretType {
  AETERNITY = 'AETERNITY',
  AVAC = 'AVAC',
  BITCOIN = 'BITCOIN',
  BSC = 'BSC',
  ETHEREUM = 'ETHEREUM',
  GOCHAIN = 'GOCHAIN',
  HEDERA = 'HEDERA',
  LITECOIN = 'LITECOIN',
  MATIC = 'MATIC',
  NEO = 'NEO',
  TRON = 'TRON',
  VECHAIN = 'VECHAIN',
}

const VenlyProviderErrorEnum: { [key: string]: string } = {
  SUCCESS: 'provider.success.general',
  ABORTED: 'provider.error.userRejectedRequest',
  FAILED: 'provider.error.internalError',
};

interface Options {
  context: WalletContext;
  notifications: NotificationContextType;
  chain: ChainType;
}

export const useVenlyWallet = (options: Options) => {
  const { t } = useTranslation();

  const [client, setClient] = useState<null>(null);

  const [isConnecting, setIsConnecting] = useState(false);

  const handleDisconnectClient = () => {
    setClient(null);

    options.notifications.create({
      id: 'venly-disconnect-success',
      title: 'Successfully disconnected wallet.',
      type: 'success',
    });
  };

  const handleConnectClient = async () => {
    setIsConnecting(true);

    let client: any;

    try {
      client = await Venly.createProviderEngine({
        clientId: 'Arketype',
        skipAuthentication: false,
        environment: 'staging',
        secretType: SecretType.MATIC,
      });

      setClient(client);
    } catch (err) {
      setIsConnecting(false);
      options.notifications.create({
        id: 'venly-connect-error',
        title: 'Failed connecting wallet.',
        description: t('provider.error.userRejectedRequest'),
        type: 'error',
      });
    }

    if (!client) {
      return;
    }

    const provider = new ethers.providers.Web3Provider(client);

    await provider.send('eth_requestAccounts', []);

    const signer = provider.getSigner();

    const chainId = await signer.getChainId();
    const address = await signer.getAddress();

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
          id: 'venly-send-error',
          title: 'Failed sending transaction!',
          description: t(VenlyProviderErrorEnum[err.status.toString()]),
          type: 'error',
        });
      }
    };

    const handleSignMessage = async (message: Bytes | string) => {
      try {
        await signer.signMessage(message);
      } catch (err: ProviderRpcErrorType | any) {
        options.notifications.create({
          id: 'venly-sign-error',
          title: 'Failed signing message!',
          description: t(VenlyProviderErrorEnum[err.status.toString()]),
          type: 'error',
        });
      }
    };

    const wallet: WalletType = {
      client: {
        id: '',
        description: 'Venly',
        icons: [],
        name: 'Venly',
        url: 'https://venly.io/',
        ssl: false,
      },
      chain: {
        id: chainId,
      },
      address,

      sendTransaction: handleSendTransaction,
      signMessage: handleSignMessage,

      disconnect: handleDisconnectClient,
    };

    options.context?.set(wallet);

    setIsConnecting(false);

    options.notifications.create({
      id: 'venly-connect-success',
      title: 'Successfully connected wallet.',
      type: 'success',
    });
  };

  return {
    client,
    connect: handleConnectClient,
    disconnect: handleDisconnectClient,
    isConnecting,
  };
};
