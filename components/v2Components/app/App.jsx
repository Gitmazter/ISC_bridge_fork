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
import { sign } from '@certusone/wormhole-sdk';
import SolIcon from '../cardComponents/icons/SolIcon';
import EthIcon from '../cardComponents/icons/EthIcon';
import { TxSuccessPopup } from '../popups/TxSuccess';
import { TxFailedPopup } from '../popups/TxFail';
import { BridgeSelector } from '../bridgeSelector/BridgeSelector';

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

  const steps = [1, 2, 3];

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


  const html = steps.map(( step ) => {  return <Card step={step} currStep={currStep} setCurrStep={setCurrStep} key={step}/>  });
  useEffect(() => {setCurrStep(1)},[direction])
  return ( 
    <>
    
      {/* Bridge Selector */}
      <BridgeSelector/>
      {/* Popups */}
      <TxSuccessPopup/>
      <TxFailedPopup/>
      {/* <BridgeWarning/> */}

      <div className={styles.v2App}>
        {html}
      </div>
    </>
  )
}

export default BridgeApp

{/* End Temporary Buttons */}
      {/* Temporary Buttons */}
{/*         <button onClick={() => {currStep - 1 > 0 ? setCurrStep(currStep-1) : console.log()}}>Step Up</button>
        <button onClick={() => {currStep + 1 < 4 ? setCurrStep(currStep+1) : console.log()}}>Step Down</button> */}
        {/* <div className={styles.dirBtns}>
          <button type='button' className={direction == 'solToEth' ? styles.dirBtnActive : styles.dirBtn} onClick={() => {saveDirection('solToEth')}}>
            <SolIcon type={'swap'}/><p>Solana To </p><EthIcon type={'swap'}/><p>Ethereum</p>
          </button>
          <button type='button' className={direction == 'solToEth' ? styles.dirBtn : styles.dirBtnActive} onClick={() => {saveDirection('ethToSol')}}>
            <EthIcon type={'swap'}/><p>Ethereum To </p><SolIcon type={'swap'}/><p>Solana</p>
          </button>
        </div> */}