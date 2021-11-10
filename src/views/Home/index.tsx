import type { NextPage } from 'next';

import { useTranslation } from 'react-i18next';

import Head from 'next/head';
import Image from 'next/image';

const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>{t('view.home.meta.title')}</title>
        <meta name="description" content={t('view.home.meta.content')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          {t('view.home.title.content')}
          <a className="text-blue-600" href="https://nextjs.org">
            {t('view.home.title.span')}
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          {t('view.home.subtitle.content')}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            {t('view.home.subtitle.span')}
          </code>
        </p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a
            href="https://nextjs.org/docs"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h2>{t('view.home.card.documentation.title')} &rarr;</h2>
            <p>{t('view.home.card.documentation.description')}</p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h2>{t('view.home.card.learn.title')} &rarr;</h2>
            <p>{t('view.home.card.learn.description')}</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h2>{t('view.home.card.examples.title')} &rarr;</h2>
            <p>{t('view.home.card.examples.description')}</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h2>{t('view.home.card.deploy.title')} &rarr;</h2>
            <p>{t('view.home.card.deploy.description')}</p>
          </a>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('component.footer.content')}
          <span className="h-4 ml-2">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
