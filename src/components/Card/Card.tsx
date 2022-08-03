import { FC } from 'react';

import { styles } from '.';

interface Props {
  title: string;
  description: string;
  url: string;
}

const Card: FC<Props> = (props) => {
  const { title, description, url } = props;

  return (
    <a href={url} className={styles.container}>
      <h2>{title} &rarr;</h2>
      <p>{description}</p>
    </a>
  );
};

export default Card;
