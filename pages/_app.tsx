import 'tailwindcss/tailwind.css';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from 'translations/en-US/index.json';

import { useWallet } from 'hooks/useWallet';

import Context from 'context';

import type { AppProps } from 'next/app';

i18n.use(initReactI18next).init({
  resources: {
    ['en-US']: {
      translation: enUS,
    },
  },
  lng: 'en-US',
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const wallet = useWallet();

  return (
    <Context.Wallet.Provider value={wallet}>
      <Component {...pageProps} />;
    </Context.Wallet.Provider>
  );
};

export default MyApp;
