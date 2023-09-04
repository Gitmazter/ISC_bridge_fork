import { SolanaContextProvider } from '../components/hooks/SolContextProvider';

import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import styles from '../../styles/mystyle.module.css'
import EthModalButton from '../components/web3/EthConnectButton';
import { CheckConnectionButton } from '../components/web3/ethUtils/CheckConnectionBtn';
import { CheckSolConnection } from '../components/web3/ethUtils/CheckSolConnection';
export default function Header () {
  return (
    <header className={styles.header}>
      <p>ISC Bridge Header</p>
      <WalletMultiButton />
      <EthModalButton />
      <CheckConnectionButton/>
      <CheckSolConnection/>
    </header>
  )
}