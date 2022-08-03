import { createContext } from 'react';

import { WalletType } from 'hooks/useWallet';

interface Props {
  me: WalletType | null;
  connect: (wallet: WalletType) => void;
  disconnect: () => void;
}

export default createContext<Props>({
  me: {
    address: '',
  },
  connect: () => {},
  disconnect: () => {},
});
