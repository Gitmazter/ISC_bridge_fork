import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import styles from '../../styles/mystyle.module.css'
export default function Form({event_handler, setDirection, enabled}) {
  function inputHandler(event) {
      if (event.target.id == 'amount') {
          event_handler(event.target.value)
      } else {
          console.log(event.target.id)
          setDirection(event.target.id)
      }
  }

  return (
      <div className={inter.className}>
        <div className={styles.table_container}>
            <div className={styles.inner}>
                <form className = {styles.form}> 
                    <input type="radio" id="sol_to_eth" name="swap_direction" value="Swap from Solana to Ethereum" onChange={inputHandler} disabled={!enabled}/>
                    <label><strong>Swap from Solana to Ethereum</strong></label><br/>
                    <input type="radio" id="eth_to_sol" name="swap_direction" value="Swap from Ethereum to Solana" onChange={inputHandler} disabled={!enabled}/>
                    <label><strong>Swap from Ethereum to Solana</strong></label><br/>
                    <label><strong>Swap Amount </strong></label>
                    <input type="text" id="amount" name="Swap Amount" disabled={!enabled} onChange={inputHandler}/><br/>
                </form>
            </div>
        </div>
      </div>
  )
}