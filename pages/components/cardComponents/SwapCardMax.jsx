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
      let userbal
      let poolbal
      console.log(maxAmount);
      console.log(balance);
      switch(fromTo.from.name) {
        case 'ISC':
          userbal = balance[0].solana;
          poolbal = balance[3].solana;
          userbal >= poolbal
          ? setMaxAmount((amounts) => ({...amounts, 'ISC':poolbal}))
          : setMaxAmount((amounts) => ({...amounts, 'ISC':userbal}));
        case 'Oil':
          userbal = balance[1].solana;
          poolbal = balance[2].solana;
          userbal >= poolbal
          ? setMaxAmount((amounts) => ({...amounts, 'Oil':poolbal}))
          : setMaxAmount((amounts) => ({...amounts, 'Oil':userbal}));
        case 'eIsc':
          userbal = balance[0].ethereum;
          poolbal = balance[3].ethereum;
          userbal >= poolbal
          ? setMaxAmount((amounts) => ({...amounts, 'eIsc':poolbal}))
          : setMaxAmount((amounts) => ({...amounts, 'eIsx':userbal}));
        case 'xOil':
          userbal = balance[1].ethereum;
          poolbal = balance[2].ethereum;
          userbal >= poolbal
          ? setMaxAmount((amounts) => ({...amounts, 'xOil':poolbal}))
          : setMaxAmount((amounts) => ({...amounts, 'xOil':userbal}));
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


// switch(fromTo.from.name) {
//   case 'ISC':
//     return
//   case 'Oil':
//     return
//   case 'eIsc':
//     return
//   case 'xOil':
//     return
//   }


      
      /* Swapping from SOLANA ISC */
      // if(fromTo.from.name === 'ISC') {
      //   const userbal = balance[0].solana;
      //   const poolbal = balance[3].solana;
      //   userbal > poolbal
      //   ? setMaxAmount((amounts) => ({...amounts, 'eISC':userbal}))
      //   : setMaxAmount((amounts) => ({...amounts, 'eISC':poolbal}));
      // } 
      // /* SWAPPING FROM XOIL TO ISC ON ETHEREUM */
      // else if (fromTo.from.name === 'xOil') {
      //   const userbal = balance[1].ethereum;
      //   const poolbal = balance[3].ethereum;
      //   userbal > poolbal
      //   ? setMaxAmount((amounts) => ({...amounts, 'eISC':userbal}))
      //   : setMaxAmount((amounts) => ({...amounts, 'eISC':poolbal}));
      // }
      // /* SWAPPING ISC TO xOIL ON ETHEREUM */
      // else if (currencies.from === 'eISC') {
      //   const userbal = balance[0].ethereum;
      //   const poolbal = balance[3].ethereum;
      //   userbal > poolbal
      //   ? setMaxAmount((amounts) => ({...amounts, 'eISC':userbal}))
      //   : setMaxAmount((amounts) => ({...amounts, 'eISC':poolbal}));
      // }
      // /* SWAPPING OIL TO ISC ON SOLANA */
      // else if (currencies.from === 'Oil') {
      //   const userbal = balance[2].solana;
      //   const poolbal = balance[3].solana;
      //   userbal > poolbal
      //   ? setMaxAmount((amounts) => ({...amounts, 'eISC':userbal}))
      //   : setMaxAmount((amounts) => ({...amounts, 'eISC':poolbal}));
      // } 
      // else {
      //   //console.log('unsupported currency');
      // }