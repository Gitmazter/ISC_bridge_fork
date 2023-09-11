import { useEffect, useState } from 'react';
import styles from '../../../styles/mystyle.module.css'
import useAmount from '../hooks/useAmount';
import useMaxAmounts from '../hooks/useMaxAmounts';



export const SwapCardMax = ({ fromTo }) => {
  const { maxAmounts } = useMaxAmounts()
  const { saveAmount } = useAmount()

  /* set amount to max value possible*/
  const setAmountTo = (val) => {
    if (document.getElementById('swapInput') !== null) {
      document.getElementById('swapInput').value = maxAmounts[`${fromTo.from.name}`] * val;
      saveAmount(maxAmounts[`${fromTo.from.name}`]);
    }
  };

  useEffect(()=>{console.log(maxAmounts);},[maxAmounts])
  return (
    fromTo !== null ?
    <div className={styles.SwapMax}>
      <button type='button' onClick={() => setAmountTo(0.25)}>25%</button> 
      <button type='button' onClick={() => setAmountTo(0.5)}>Half</button> 
      <button type='button' onClick={() => setAmountTo(1)}>Max</button> 
      <img src='./wallet.svg' height={15} className={styles.maxWalletIcon}/> 
      {maxAmounts[`${fromTo.from.name}`]} {fromTo.from.name}
    </div>
    : <></>
  )
}