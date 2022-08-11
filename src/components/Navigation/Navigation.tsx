import Image from 'next/image';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { useMetaMask } from 'hooks/useMetaMask';
import { useVenlyWallet } from 'hooks/useVenlyWallet';
import { useWalletConnect } from 'hooks/useWalletConnect';

import Context from 'context';

import Button from 'components/Button';
import Modal from 'components/Modal';

import { styles } from '.';

const Navigation: FC = () => {
  const { t } = useTranslation();

  const context = useContext(Context.Wallet);
  const notifications = useContext(Context.Notifications);

  const options = {
    context,
    notifications,
    chain: {
      id: 80001,
      name: 'Polygon Mumbai',
    },
  };

  const MetaMask = useMetaMask(options);
  const WalletConnect = useWalletConnect(options);
  const VenlyWallet = useVenlyWallet(options);

  const isConnecting =
    MetaMask.isConnecting ||
    WalletConnect.isConnecting ||
    VenlyWallet.isConnecting;
  const isConnected = context?.wallet?.address !== undefined;

  return (
    <header className={styles.container}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className={styles.span}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={100} height={24} />
        </span>
      </a>

      {isConnected ? (
        <Button.Secondary onClick={context.clear}>
          {context.wallet?.address}
        </Button.Secondary>
      ) : (
        <Modal
          trigger={<Button.Primary>{t('label.toConnect')}</Button.Primary>}
        >
          <button
            onClick={MetaMask.connect}
            className={styles.button}
            disabled={isConnecting}
          >
            MetaMask
          </button>
          <button
            onClick={WalletConnect.connect}
            className={styles.button}
            disabled={isConnecting}
          >
            WalletConnect
          </button>
          <button
            onClick={VenlyWallet.connect}
            className={styles.button}
            disabled={isConnecting}
          >
            Venly Wallet
          </button>
        </Modal>
      )}
    </header>
  );
};

export default Navigation;
