import { Fragment, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import Context from 'context';

import Card from 'components/Card';
import Layout from 'components/Layout';
import Text from 'components/Text';

import styles from './styles';

import type { NextPage } from 'next';

const HomeView: NextPage = () => {
  const { t } = useTranslation();

  const { wallet } = useContext(Context.Wallet);

  return (
    <Layout>
      <div className={styles.container}>
        <Text.Title>
          {t('view.home.title.content')}
          <a className="text-blue-600" href="https://nextjs.org">
            {t('view.home.title.span')}
          </a>
        </Text.Title>

        <Text.Paragraph>
          {t('view.home.subtitle.content')}
          <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
            {t('view.home.subtitle.span')}
          </code>
        </Text.Paragraph>

        <div className={styles.list}>
          {wallet?.address ? (
            <Fragment>
              <Card
                title={t('view.home.card.sign.title')}
                description={t('view.home.card.sign.description')}
                onClick={() => wallet?.signMessage('Hello Blockchain')}
              />
              <Card
                title={t('view.home.card.send.title')}
                description={t('view.home.card.send.description')}
                onClick={() =>
                  wallet?.sendTransaction({
                    from: wallet?.address,
                    to: '0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359',
                    data: '0x',
                    gasPrice: '0x02540be400',
                    gas: '0x9c40',
                    value: '0x00',
                    nonce: '0x0114',
                  })
                }
              />
            </Fragment>
          ) : (
            <Fragment>
              <Card
                title={t('view.home.card.documentation.title')}
                description={t('view.home.card.documentation.description')}
                url="https://nextjs.org/docs"
              />
              <Card
                title={t('view.home.card.learn.title')}
                description={t('view.home.card.learn.description')}
                url="https://nextjs.org/learn"
              />
              <Card
                title={t('view.home.card.examples.title')}
                description={t('view.home.card.examples.description')}
                url="https://github.com/vercel/next.js/tree/master/examples"
              />
              <Card
                title={t('view.home.card.deploy.title')}
                description={t('view.home.card.deploy.description')}
                url="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              />
            </Fragment>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomeView;
