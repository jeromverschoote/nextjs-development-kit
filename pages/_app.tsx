import 'tailwindcss/tailwind.css';


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enUS from 'translations/en-US/index.json';

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

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
