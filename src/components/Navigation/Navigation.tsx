import Image from 'next/image';
import { FC, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Context from 'context';

import Button from 'components/Button';
import Modal from 'components/Modal';

import { styles } from '.';

const Navigation: FC = () => {
  const { t } = useTranslation();

  const { me, connect, disconnect } = useContext(Context.Wallet);

  const isConnected = me !== null;

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
        <Button.Secondary onClick={() => disconnect()}>
          {me?.address}
        </Button.Secondary>
      ) : (
        <Modal
          trigger={<Button.Primary>{t('label.toConnect')}</Button.Primary>}
          onConfirm={() => connect({ address: '0x0' })}
        >
          Content
        </Modal>
      )}
    </header>
  );
};

export default Navigation;
