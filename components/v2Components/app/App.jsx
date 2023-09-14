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
      console.log('updating ETHsigners');
      console.log(provider);
      if (active) {
        saveApplication(new myWalletApplication(provider.getSigner(ethSigner.account), solSigner))
      }
      else {
        saveApplication(new myWalletApplication(ethSigner, solSigner))
      }
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

  // Connection Check
  // Connectivity check (in order of need as in Figma)
  // const app = AppSelector()
  
  // TODO    ::: 
  // Click Handlers 
  // Balance Context
  // Bridge Scripts (Rewrite old app to class with exported fns?)

  // Max amount Context 
  // FOR EACH
      // ->> Greatest value of, wallet balance for source token || target token pool balance

  // SOL TO ETH
  // To use step 1: Connect to Solana, input amount ,Have ISC = ACTIVE If active -> Allow click handler
      // ->> Swap Selected Amount With Sol B ISC pool Token if amount is less than maxAmount
  // To use step 2: Connect to Ethereum & Solana, input amount ,have Sol B ISC = ACTIVE If active -> Allow click handler
      // ->> Bridge Selected Amount of Sol B ISC if amount is less than maxAmount
  // To use step 3: Connect to Ethereum, input amount, have Eth B ISC = ACTIVE If active -> Allow click handler
      // ->> Swap Selected Amount of Eth B ISC with Eth Native ISC if amount is less than max amount

  // ETH TO SOL 
  // To use step 1: Connect to Ethereum, input amount ,Have Eth ISC = ACTIVE If active -> Allow click handler
      // ->> Swap Selected Amount With ETH B ISC pool Token if amount is less than maxAmount
  // To use step 2: Connect to Ethereum & Solana, input amount ,have Eth B ISC = ACTIVE If active -> Allow click handler
      // ->> Bridge Selected Amount of ETH B ISC if amount is less than maxAmount
  // To use step 3: Connect to Solana, input amount, have Sol B ISC = ACTIVE If active -> Allow click handler
      // ->> Swap Selected Amount of Sol B ISC with Sol Native ISC if amount is less than max amount

  const html = steps.map(( step ) => {  return <Card step={step} currStep={currStep}/>  });
  useEffect(() => {console.log(direction);},[direction])
  return ( 
    <>
    
      {/* Temporary Buttons */}
        <button onClick={() => {currStep - 1 > 0 ? setCurrStep(currStep-1) : console.log()}}>Step Up</button>
        <button onClick={() => {currStep + 1 < 4 ? setCurrStep(currStep+1) : console.log()}}>Step Down</button>
        <button type='button' onClick={() => {saveDirection('solToEth')}}>Sol To Eth</button>
        <button type='button' onClick={() => {saveDirection('ethToSol')}}>Eth To Sol</button>
      {/* End Temporary Buttons */}

      <div className={styles.v2App}>
        {html}
      </div>
    </>
  )
}

export default BridgeApp