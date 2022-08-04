import Image from 'next/image';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { useMetaMask } from 'hooks/useMetaMask';
import { useWalletConnect } from 'hooks/useWalletConnect';

import Context from 'context';

import Button from 'components/Button';
import Modal from 'components/Modal';

import { styles } from '.';

const Navigation: FC = () => {
  const { t } = useTranslation();

  const context = useContext(Context.Wallet);

  const MetaMask = useMetaMask(context);
  const WalletConnect = useWalletConnect(context);

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
          <button onClick={MetaMask.connect} className={styles.button}>
            MetaMask
          </button>
          <button onClick={WalletConnect.connect} className={styles.button}>
            WalletConnect
          </button>
        </Modal>
      )}
    </header>
  );
};

export default Navigation;
