import { Venly } from '@venly/web3-provider';
import { ethers } from 'ethers';
import { useState } from 'react';

import { TransactionType, WalletContext, WalletType } from 'hooks/useWallet';

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

export const useVenlyWallet = (walletContext: WalletContext) => {
  const [client] = useState<null>(null);

  const handleDisconnectClient = () => {};

  const handleConnectClient = async () => {
    const client: any = await Venly.createProviderEngine({
      clientId: 'Arketype',
      skipAuthentication: false,
      environment: 'staging',
      secretType: SecretType.MATIC,
    });

    const provider = new ethers.providers.Web3Provider(client);

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
        // console.log(err);
        result = err;
      }

      return result;
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
