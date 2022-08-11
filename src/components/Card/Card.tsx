import { FC } from 'react';

import { styles } from '.';

interface Props {
  title: string;
  description: string;
  url?: string;
  onClick?: () => void;
}

const Card: FC<Props> = (props) => {
  const { title, description, url, onClick } = props;

  return (
    <a href={url} className={styles.container} onClick={onClick}>
      <h2>{title} &rarr;</h2>
      <p>{description}</p>
    </a>
  );
};

export default Card;
