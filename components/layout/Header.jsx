import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import styles from '../../styles/mystyle.module.css'
import EthModalButton from '../../components/v2Components/app/web3/EthConnectButton';
export default function Header () {
  return (
    <header className={styles.header}>
      <div className={styles.headerInfo}> 
        <img src='./ISC-logo.svg' height={50} className={styles.logo}></img>
        <h1>ISC BRIDGE</h1>
      </div>
      <div className={styles.walletContainer}>
        <WalletMultiButton />
        <EthModalButton />
      </div>
    </header>
  )
}