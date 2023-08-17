import { createContext, useContext, useEffect, useState } from 'react';
import styles from '../../../styles/mystyle.module.css'
import useConnectionInfo from '../hooks/useConnectionInfo';


export default function EthModalButton () {
  const { Accounts, saveAccounts } = useConnectionInfo()
  const [ connected, setConnected ] = useState(false)
  async function handleConnect () {
    if (typeof window !== 'undefined') {
      console.log('You are on the browser');

      // ✅ Can use window here
      const ethereum = window.ethereum;
      const accounts = await ethereum.request({ method: 'eth_requestAccounts', params: [] });
      saveAccounts(accounts);
      setConnected(true)
    } else {

      console.log('You are on the server');
      // ⛔️ Don't use window here
    }
  }

  useEffect(() => {

  },[Accounts])

  function openModal () {
    console.log("opening modal");
  }

  return (
    connected
    ?
    <div>
      <button className={styles.MetaMaskButton} onClick={openModal}><img src='MetaMask_Fox.svg'/>{Accounts[0].slice(0,5)}..{Accounts[0].slice(-4)}</button>
    </div>
    :
    <div>
      <button onClick={handleConnect} className={styles.MetaMaskButton}><img src='metamask-horizontal.svg'/></button>
    </div>
  )
}