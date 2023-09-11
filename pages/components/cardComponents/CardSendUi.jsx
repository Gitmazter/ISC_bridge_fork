import { useEffect, useState } from 'react'
import styles from '../../../styles/mystyle.module.css'
import useAmount from '../hooks/useAmount'
import useBalance from '../hooks/useBalance'
import useMaxAmounts from '../hooks/useMaxAmounts'
import useBrideDirection from '../hooks/useBrideDirection'



export const CardSendUi = ({fromTo}) => {
  const { direction } = useBrideDirection()
  const {maxAmounts} = useMaxAmounts()
  const { amount, saveAmount } = useAmount()
  const { balance } = useBalance()
  const [token, setToken] = useState(undefined)

  const updateAmount = (e) => {
    saveAmount(e.target.value);
  }

  useEffect(() => {
    console.log(amount);
  }, [amount])

  useEffect(() => {
    if (direction === 'sol_to_eth') {
      setToken('Oil')
    }
    else {
      setToken('xOil')
    }
  }, [direction])

  return (
    fromTo !== null ?
    <div className={styles.inputField}>
      <div className={styles.tokenCard}>  
        {fromTo.to.icon} 
        <p>{fromTo.to.name}</p>         
      </div>
      <input id='swapInput' className={styles.swap_input} onChange={updateAmount} placeholder={amount}></input>
    </div>
    : <></>
  )
}