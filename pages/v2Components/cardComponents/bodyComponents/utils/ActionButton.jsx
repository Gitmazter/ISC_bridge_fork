import { useWallet } from '@solana/wallet-adapter-react';
import styles from '../../../../../styles/mystyle.module.css'
import config from '../config/BodyConfig'
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useContext, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { StepContext } from '../../../contexts/stepContext';
import { AmountContext } from '../../../contexts/amountContext';
import { BalanceContext } from '../../../contexts/balanceContext';
import { DirectionContext } from '../../../contexts/directionContext';
import BodyConfig from '../config/BodyConfig';
import Loading from '../../../../components/Loading';
const buttonPrompts = config.buttonPrompts;


const ActionButton = () => {
  const { step, currStep } = useContext(StepContext);
  const { amount } = useContext(AmountContext)
  const { balance } = useContext(BalanceContext)
  const { direction } = useContext(DirectionContext)

  const { connected } = useWallet()
  const { active } = useWeb3React()
  const solSigner = useWallet();
  const ethSigner = useWeb3React();
  const [prompt, setPrompt] = useState(buttonPrompts.swap);
  const [ checksPassed, setChecksPassed ] = useState(false)

  function amountCheck ()  {
    if (balance !== undefined) {
      console.log(step);
      let tocheck;
      switch (step) {
        case 1:
          tocheck = balance[0].solana
        case 2:
          tocheck = balance[1].solana
        case 3:
          tocheck = balance[1].ethereum
      }
      console.log(tocheck);
      console.log(amount);
      if (amount > 0) { 
        if (amount < tocheck) {
          return true
        } else {setPrompt(buttonPrompts.tooMuch)}
      } else {setPrompt(buttonPrompts.noAmount)}
    }
    return false
  }


  useEffect(() => {
    if (direction === 'solToEth'){
      switch (step) {
        case 1:
          if (connected) {
            if (balance !== undefined && amount > 0) { 
              if (amount <= balance[0].solana) {
                setPrompt(buttonPrompts.swap + ` ${amount} ISC`)
                setChecksPassed(true)
              } else {setPrompt(buttonPrompts.tooMuch);  setChecksPassed(false)}
            } else {setPrompt(buttonPrompts.noAmount);  setChecksPassed(false)}
          } else {setPrompt(buttonPrompts.sol);  setChecksPassed(false)}
          return;

        case 2:
          if (connected) {
            if (active) {
              if (balance !== undefined && amount > 0) { 
                if (amount <= balance[1].solana) {
                  setPrompt(buttonPrompts.bridge + ` ${amount} ISC`)
                  setChecksPassed(true)
                } else {setPrompt(buttonPrompts.tooMuch);  setChecksPassed(false)}
              } else {setPrompt(buttonPrompts.noAmount);  setChecksPassed(false)}
            } else {setPrompt(buttonPrompts.eth);  setChecksPassed(false)}
          } else {setPrompt(buttonPrompts.sol);  setChecksPassed(false)}
          return;

        case 3:
          if (active) {
            if (balance !== undefined && amount > 0) { 
              if (amount <= balance[1].ethereum) {
                setPrompt(buttonPrompts.swap + ` ${amount} ISC`)
                setChecksPassed(true)
              } else {setPrompt(buttonPrompts.tooMuch);  setChecksPassed(false)}
            } else {setPrompt(buttonPrompts.noAmount);  setChecksPassed(false)}
          } else {setPrompt(buttonPrompts.eth);  setChecksPassed(false)}
          return;
      }
    }
  }, [amount, balance, step, currStep, active, connected])

  const clickHandler = () => {
    if (direction === 'solToEth'){
      switch (step) {
        case 1:
          console.log('Handling Swap 1');
          return; 
        case 2: 
          console.log('Handling Bridge');
          return;
        case 3: 
          console.log('Handling Swap 2');
      }
    }
  }

  return (  
   checksPassed == true ?
   <button type='button' onClick={clickHandler} className={styles.ActionButton}>
    <p>{prompt}</p>
   </button>
   :
   <button type='button' className={styles.ActionButtonInactive}>
    <p>{prompt}</p>
   </button>
  )
}

export default ActionButton