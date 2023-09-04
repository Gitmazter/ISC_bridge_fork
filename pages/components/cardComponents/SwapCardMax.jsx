import { useEffect, useState } from 'react';
import styles from '../../../styles/mystyle.module.css'
import useAmount from '../hooks/useAmount';
import useBalance from '../hooks/useBalance';

export const SwapCardMax = ({max, fromTo, currencies}) => {
  const { maxAmount, setMaxAmount } = max;
  const { balance } = useBalance()
  const { saveAmount } = useAmount()
  //console.log(fromTo);
  /* set amount to max value possible*/
  const setAmountToMax = () => {
    //console.log("setting amount to max");
    document.getElementById('swapInput').value = maxAmount[`${fromTo.from.name}`]
    saveAmount(maxAmount[`${fromTo.from.name}`])
  }

  /* define max amount depending on pool/wallet balances when balances are updated */
  useEffect(() => {
    //console.log(balance);
    //console.log(currencies);
    if(balance[0]) {
      if(currencies.from === 'ISC') {
        let tempAmount = maxAmount
        //console.log('swapping from ISC')
        const userbal = balance[1].ethereum
        const poolbal = balance[3].solana
        if (userbal >= poolbal) {
          tempAmount.ISC = userbal;
          setMaxAmount(tempAmount)
        }
        else {
          tempAmount.ISC = poolbal;
          setMaxAmount(tempAmount)
        }
        //console.log(userbal, poolbal);
      } 
      else if (currencies.from === 'xOil') {
        const userbal = balance[1].ethereum
        let tempAmount = maxAmount
        tempAmount.xOil = userbal;
        setMaxAmount(tempAmount)
      }
      else if (currencies.from === 'ethISC') {

      }
      else if (currencies.from === 'Oil') {

      } 
      else {
        console.log('unsupported currency');
      }
    }
  },[balance])

  useEffect(()=>{},[maxAmount])
  return (
    <p className={styles.SwapMax}>
      <button type='button' onClick={setAmountToMax}>Max</button>  
      {maxAmount[`${fromTo.from.name}`]} ISC</p>
  )
}