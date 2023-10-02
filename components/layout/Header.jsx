import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import styles from '../../styles/mystyle.module.css'
import EthModalButton from '../v2Components/app/web3/EthConnectButton';
import { useEffect, useState } from 'react';
import { Nav } from './headerComponents/nav';
export default function Header () {
  const [clientRendered, setClientRendered] = useState()

  // useEffect(() => {
  //   setClientRendered(
  //     <>
  //       <WalletMultiButton/>
  //       <EthModalButton />
  //     </>
  //   )
  // }, [])


  return (
    <header className={styles.header}>
      <div className={styles.headerInfo}> 
        <img src='./ISC-logo.svg' height={50} className={styles.logo}></img>
        <div className={styles.brandText}>
          <h1>ISC</h1>
          <p>International Stable Currency</p>
        </div>
      </div>
      <Nav/>
      {/* <div className={styles.walletContainer}> */}
        {/* {clientRendered} */}
      {/* </div> */}
    </header>
  )
}