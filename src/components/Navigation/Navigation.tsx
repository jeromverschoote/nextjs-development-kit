import Image from 'next/image';
import { FC } from 'react';

import { styles } from '.';

const Navigation: FC = () => {
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
    </header>
  );
};

export default Navigation;
