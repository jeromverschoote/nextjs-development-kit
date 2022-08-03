import { ReactNode, FC } from 'react';

import { styles } from '.';

interface Props {
  children: string | ReactNode;
  onClick: () => void;
}

const PrimaryButton: FC<Props> = (props) => {
  const { children = 'Label', onClick } = props;
  return (
    <button className={styles.container} onClick={onClick}>
      {children}
    </button>
  );
};

export default PrimaryButton;
