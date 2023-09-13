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
import { ApplicationContext } from '../../../contexts/applicationContext';
import { Connection } from '@solana/web3.js';
import updateBalance from '../../../app/apps/updateBalance';
import { sign } from '@certusone/wormhole-sdk';
const buttonPrompts = config.buttonPrompts;


const ActionButton = () => {
  const { step, currStep } = useContext(StepContext);
  const { amount } = useContext(AmountContext)
  const { balance } = useContext(BalanceContext)
  const { direction } = useContext(DirectionContext)
  const {application} = useContext(ApplicationContext)

  const { connected } = useWallet()
  const { active, library: provider} = useWeb3React()
  const solConnection = new Connection("http://localhost:8899", "processed")
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

  const handleSwapSol = async () => {
    const options = {
      commitment: 'processed'
    };
    let tx;
    if (direction === 'solToEth'){
      tx = await application.solana_swap.swap_isc_to_oil(amount);
    } else {
      tx = await application.solana_swap.swap_oil_to_isc(amount);
    }
    let txid;
    try {
      txid = await solSigner.sendTransaction(tx, solConnection, options);
    }
    catch (e) {
      console.log(e);
    }
    console.log(txid);
    await application.updateBalance()
  }

  const handleBridgeSolToEth = async () => {
    const options = {
      commitment: 'finalized'
    };
    const tx = await application.wormhole.send_from_solana(amount)
    setChecksPassed(false)
    let txid;
      try {
        setPrompt("Sending ISC to Wormhole...")
        txid = await solSigner.sendTransaction(tx, solConnection, options)
      }
      catch (e) {
        console.log(e);
      }
    await solConnection.confirmTransaction(txid)
    // Set bridge state
    let VAA;
      try {
        setPrompt("Fetching VAA...")
        VAA = await application.wormhole.get_vaa_bytes_solana(txid);
      }
      catch (e) {
        console.log(e);
      }
    console.log(VAA);
    // Set bridge state
    const signer = provider.getSigner()
    let txid2;
      try {
        setPrompt("Requesting ISC from Wormhole...")
        txid2 = await application.wormhole.complete_transfer_on_eth(VAA, signer)
      }
      catch(e) {
        console.log(e);
      }
    console.log(txid2);
    setPrompt("Bridging Complete!")
    // Set bridge state
  }

  const handleBridgeEthToSol = async () => { /* Tested and ready to roll */
    const options = {
      commitment: 'finalized'
    };
    let txid;
    try {
      setChecksPassed(false)
      setPrompt("Sending ISC to Wormhole...")
      txid = await application.wormhole.send_from_ethereum(amount)
      console.log(txid);
    }
    catch (e) {
      console.log(e);
    }
    let VAA;
    try {
      setPrompt("Fetching VAA...")
      VAA = await application.wormhole.get_vaa_bytes_ethereum(txid)
      console.log(VAA);
    }
    catch (e) {
      console.log(e);
    }
    let txid2;
    try {
      setPrompt("Requesting ISC from Wormhole...")
      txid2 = await  application.wormhole.complete_transfer_on_solana(VAA.vaaBytes)
      console.log(txid2);
      setPrompt("Bridging Complete")
    }
    catch(e) {
      console.log(e);
    }
    setChecksPassed(true)
  }

  const handleSwapEth = async () => {
    let tx
    try {
      if (direction === 'solToEth'){
        tx = await application.ethereum_swap.swap_oil_to_isc(amount);
      }
      else {
        tx = await application.ethereum_swap.swap_isc_to_oil(amount);
      }
    }
    catch (e) {
      console.log(e);
    }
    console.log(tx);
  }


  const clickHandler = () => {
    if (direction === 'solToEth'){
      switch (step) {
        case 1:
          console.log('Handling Swap 1');
          handleSwapSol();
          return; 
        case 2: 
          console.log('Handling Bridge');
          handleBridgeSolToEth();
          return;
        case 3: 
          console.log('Handling Swap 2');
          handleSwapEth();
      }
    }
    else {
      switch (step) {
        case 1:
          console.log('Handling Swap 1');
          handleSwapEth();
          return; 
        case 2: 
          console.log('Handling Bridge');
          handleBridgeEthToSol();
          return;
        case 3: 
          console.log('Handling Swap 2');
          handleSwapSol();
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