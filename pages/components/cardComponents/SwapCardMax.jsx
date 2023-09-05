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
  const setAmountToHalf = () => {
    //console.log("setting amount to max");
    document.getElementById('swapInput').value = maxAmount[`${fromTo.from.name}`]/2
    saveAmount(maxAmount[`${fromTo.from.name}`]/2)
  }
  const setAmountTo25 = () => {
    //console.log("setting amount to max");
    document.getElementById('swapInput').value = maxAmount[`${fromTo.from.name}`]/4
    saveAmount(maxAmount[`${fromTo.from.name}`]/4)
  }

  /* define max amount depending on pool/wallet balances when balances are updated */
  useEffect(() => {
    if(balance[0]) {
      /* Swapping from SOLANA ISC */
      if(fromTo.from.name === 'ISC') {
        //let tempAmount = maxAmount
        const userbal = balance[1].ethereum
        const poolbal = balance[3].solana
        if (userbal >= poolbal) {
          //tempAmount.ISC = userbal;
          //setMaxAmount(tempAmount)
          setMaxAmount((amounts) => ({...amounts, 'ISC':userbal}))
        }
        else {
          setMaxAmount((amounts) => ({...amounts, 'ISC':poolbal}))
          //setMaxAmount(tempAmount)
        }
      } 
      /* SWAPPING FROM XOIL TO ISC ON ETHEREUM */
      else if (fromTo.from.name === 'xOil') {
        const userbal = balance[1].ethereum
        // let tempAmount = maxAmount
        // tempAmount.xOil = userbal;
        setMaxAmount((amounts) => ({...amounts, 'xOil':userbal}))
      }
      /* SWAPPING ISC FROM ETHEREUM */
      else if (currencies.from === 'ethISC') {

      }
      /* SWAPPING OIL TO ISC ON SOLANA */
      else if (currencies.from === 'Oil') {

      } 
      else {
        //console.log('unsupported currency');
      }
    }
  }, [balance])

  useEffect(()=>{},[maxAmount])
  return (
    <p className={styles.SwapMax}>
      <button type='button' onClick={setAmountTo25}>25%</button> 
      <button type='button' onClick={setAmountToHalf}>Half</button> 
      <button type='button' onClick={setAmountToMax}>Max</button> 
      <img src='./wallet.svg' height={15} className={styles.maxWalletIcon}/> 
      {maxAmount[`${fromTo.from.name}`]} {fromTo.from.name}
    </p>
  )
}