import { useEffect, useState } from 'react'
import styles from '../../../styles/mystyle.module.css'
import getIscUsdPrice from '../services/getIscPrice'
import useAmount from '../hooks/useAmount'

export const CardSwapUi = ({maxAmount, fromTo}) => {
  const [iscPrice, setIscPrice] = useState(0.00)
  const {amount, saveAmount} = useAmount()

  useEffect(() => {
    const getPrice = async() => {
      const price = await getIscUsdPrice()
      setIscPrice(price)
    }
    getPrice()
  },[])

  useEffect(() => {}, [iscPrice])
  const updateAmount = async (e) => {
    console.log(maxAmount);
    let inputAmount = e.target.value
    if (NaN) {
      //console.log("not a number");
    }
    if (inputAmount > maxAmount[fromTo.from.name]) {
      document.getElementById('swapInput').value = maxAmount[fromTo.from.name]
      inputAmount = maxAmount[fromTo.from.name];
    }
    saveAmount(inputAmount)
  }
  
  return (
    <>
      {/* Swap Input */}
      <div className={styles.CardSwapUi}>
        <div className={styles.inputField}>
          <div className={styles.flex}>
            <div className={styles.tokenCard}>
              {fromTo.from.icon}
              <p>{fromTo.from.name}</p>         
            </div>
            <div className={styles.flex_col}>
              <input id='swapInput' inputMode='decimal' placeholder={amount} autoComplete='off' onChange={updateAmount} className={styles.swap_input}/> 
              <p className={styles.text_end}>${((amount * iscPrice)).toLocaleString('fullwide', {useGrouping : false})}</p>
            </div>          
          </div> 
        </div>
        <hr className={styles.card_line}></hr>
        {/* Post Swap Output */}
        <div className={styles.inputField} id={styles.outputField}>
          <div className={styles.flex}>
            <div className={styles.tokenCard}>  
              {fromTo.to.icon} 
              <p>{fromTo.to.name}</p>         
            </div>
            <div className={styles.flex_col}>
              <input  id='swapInput' inputMode='decimal' placeholder={amount} value={amount} autoComplete='off' className={styles.swap_input}/> 
              <p className={styles.text_end}>${ ((amount * iscPrice)).toLocaleString('fullwide', {useGrouping : false}) }</p>
            </div>          
          </div> 
        </div>
      </div>
    </>
  )
}