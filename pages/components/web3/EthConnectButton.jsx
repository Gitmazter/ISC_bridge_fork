import { createContext, useContext } from 'react';
import styles from '../../../styles/mystyle.module.css'

export const ethereumContext = createContext([])

export default function EthModalButton () {
  async function handleConnect () {
    if (typeof window !== 'undefined') {
      console.log('You are on the browser');
    
      // ✅ Can use window here
      const ethereum = window.ethereum
      const accounts = await ethereum.request({ method: 'eth_requestAccounts', params: [] })
    
      console.log(accounts);
    } else {
      console.log('You are on the server');
      // ⛔️ Don't use window here
    }
    
  }

  return (
    <div>
      <button onClick={handleConnect} className={styles.MetaMaskButton}> MetaMask</button>
    </div>
  )
}