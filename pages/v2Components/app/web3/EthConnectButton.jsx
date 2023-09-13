import styles from '../../../../styles/mystyle.module.css'
import { useWeb3React } from '@web3-react/core';
import {InjectedConnector} from '@web3-react/injected-connector'
const injected = new InjectedConnector()

export default function EthModalButton () {
  const { activate, active, account, deactivate } = useWeb3React();

  const connect = async() => {
    try {
      await activate(injected)
    }
    catch(e){
      console.log(e);
    }
  }

  const disconnect = async() => {
    if (active) {
      try {
        deactivate()
      }
      catch(e) {
        console.log(e);
      }
    }
  }

  return (
    active 
    ? 
    <button className={styles.MetaMaskButton} onClick={disconnect} type='button'><img src='MetaMask_Fox.svg'/>Disconnect {account.substring(0,4)}..{account.substring(38)}</button>
    :
    <button className={styles.MetaMaskButton} onClick={connect} type='button'><img src='MetaMask_Fox.svg'/>Connect</button>
  )
}