import { useWallet } from '@solana/wallet-adapter-react';
import styles from '../../../../../styles/mystyle.module.css'
import config from '../config/BodyConfig'
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
const buttonPrompts = config.buttonPrompts;


const ActionButton = () => {
  const solSigner = useWallet()
  const ethSigner = useWeb3React();

  return (  
   <button type='button' className={styles.ActionButton}>
    <p>{buttonPrompts.swap}</p>
   </button>
  )
}

export default ActionButton