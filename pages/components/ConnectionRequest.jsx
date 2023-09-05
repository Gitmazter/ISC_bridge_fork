import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import styles from '../../styles/mystyle.module.css'
import EthModalButton from './web3/EthConnectButton'
export const ConnectionRequest = () => {
  return <div className={styles.requestConn}>
    <div className={styles.innerRequestConn}>
      <p>Alo, Plz Connect Like and Scrubscribe</p>
      <WalletMultiButton/>
      <EthModalButton/>
    </div>
  </div>
}