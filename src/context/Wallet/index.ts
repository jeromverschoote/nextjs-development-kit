import { createContext } from 'react';

import { WalletContext } from 'hooks/useWallet';

export default createContext<WalletContext>({
  wallet: null,
  set: () => null,
  clear: () => null,
});
