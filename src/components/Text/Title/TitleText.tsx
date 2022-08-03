import { ReactNode, FC } from 'react';

import { styles } from '.';

interface Props {
  children: string | ReactNode | ReactNode[];
}

const Title: FC<Props> = (props) => {
  const { children } = props;
  return <h1 className={styles.container}>{children}</h1>;
};

export default Title;
