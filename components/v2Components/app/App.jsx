import { useContext, useEffect, useState } from 'react'
import styles from '../../../styles/mystyle.module.css'
import Card from '../Card'
import myWalletApplication from '../../../v2walletScripts/my-wallet-application.mjs';
import { useWeb3React } from '@web3-react/core';
import { useWallet } from '@solana/wallet-adapter-react';
import BalanceContext from '../contexts/balanceContext';
import ApplicationContext from '../contexts/applicationContext';
import updateMaxAmounts from './utils/updateMaxAmounts';
import MaxAmountContext from '../contexts/maxAmountContext';
import DirectionContext from '../contexts/directionContext';
import { TxSuccessPopup } from '../popups/TxSuccess';
import { TxFailedPopup } from '../popups/TxFail';
import { BridgeSelector } from '../bridgeSelector/BridgeSelector';
import TransactionContext from '../contexts/TransactionContext';
import { BridgeWarning } from '../popups/BridgeWarning';

const BridgeApp = () => {
  const { application, saveApplication } = useContext(ApplicationContext)
  const {direction, saveDirection} = useContext(DirectionContext)
  const { balance, saveBalance } = useContext(BalanceContext)
  const {saveMaxAmounts} = useContext(MaxAmountContext)
  const [ currStep, setCurrStep ] = useState(1);
  const ethSigner = useWeb3React()
  const {active, library: provider} = useWeb3React()
  const solSigner = useWallet()
  const {connected} = useWallet()
  const [ popupHtml, setPopupHtml ] = useState([])

  const steps = [1, 2, 3];

  const [ transactionList, setTransactions ] = useState([])
  const saveTransactions = (val) => {
    console.log('new tx');
    setTransactions(val);
  };


  useEffect(() => {
    if (active || connected) {
      console.log(active);
      console.log(connected);
      console.log('updating signers');
      console.log(provider);
      let signer = false
      try {
        signer = provider.getSigner(ethSigner.account)
      }
      catch (e) {

      }
      saveApplication(new myWalletApplication(signer, solSigner))
    }
  }, [active, connected])

  useEffect(()=>{
    const wait = async () => {
      const balances = await application.updateBalance(saveBalance)
      // saveBalance(balances)
    }
    if (application != undefined) {
      wait()
    }
  },[application])
  
  useEffect(() => {
      console.log(balance);
      if (balance != undefined) {
        console.log("updating");
        const maxAmounts = updateMaxAmounts(balance, direction)
        saveMaxAmounts(maxAmounts)
      }
  }, [balance, direction])

  useEffect(() => { 
    console.log(transactionList);

    const updatePopupHtml = () => {
      console.log("new tx 2");
      let tempHtml = popupHtml
      console.log(transactionList); 
      transactionList.map((tx) => {  
        if(tx.shown !== true) {
          const now = Date.now()
          const timeDiff = now - tx.time;
          console.log(timeDiff);
          if (timeDiff < 10000) {
            tx.status === true
            ?
              tempHtml.push(<TxSuccessPopup txid={tx.txid} key={tx.txid} counter={timeDiff}/>)
            :
              tempHtml.push(<TxFailedPopup txid={tx.txid} key={tx.txid} counter={timeDiff}/>)
          } 
        }
      })  
      setPopupHtml(tempHtml)
    } 
    updatePopupHtml();
  }, [transactionList])


  useEffect(() => {
    // console.log(transactionList);
  },[popupHtml])

  const html = steps.map(( step ) => {  return <Card step={step} currStep={currStep} setCurrStep={setCurrStep} key={step}/>  });
  useEffect(() => {setCurrStep(1)},[direction])

  return (  
    <TransactionContext.Provider value={{transactionList, saveTransactions}}>
      <BridgeSelector/>
      <div className={styles.txPopupWrapper} id='popupWrapper'>
        {popupHtml}
      </div>
      <BridgeWarning/>
      <div className={styles.v2App}>
        {html}
      </div>
    </TransactionContext.Provider>
  )
}

export default BridgeApp
