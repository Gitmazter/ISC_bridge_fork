import { useEffect } from 'react'
import styles from '../../../styles/mystyle.module.css'
import useAmount from '../hooks/useAmount'
import useBalance from '../hooks/useBalance'



export const CardSendUi = () => {

  const { amount, saveAmount } = useAmount()
  const { balance } = useBalance()

  const updateAmount = (e) => {
    saveAmount(e.target.value);
  }

  useEffect(() => {
    console.log(amount);
  }, [amount])

  return (
    <div className={styles.inputField}>
      <div className={styles.step2balance}>
      
      </div>
      <input className={styles.swap_input} onChange={updateAmount}></input>
    </div>
  )
}