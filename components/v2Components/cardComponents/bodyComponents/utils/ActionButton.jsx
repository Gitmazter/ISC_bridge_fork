import { useWallet } from '@solana/wallet-adapter-react';
import styles from '../../../../../styles/mystyle.module.css'
import bodyConfig from '../../../../../config/BodyConfig'
import { useContext, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import StepContext from '../../../contexts/stepContext';
import BalanceContext from '../../../contexts/balanceContext';
import DirectionContext from '../../../contexts/directionContext';
import ApplicationContext from '../../../contexts/applicationContext';
import { Connection } from '@solana/web3.js';
import AmountContext from '../../../contexts/amountContext';
import config from '../../../../../config/config.json'
const buttonPrompts = bodyConfig.buttonPrompts;

config
const ActionButton = () => {
  const { step, currStep, setCurrStep } = useContext(StepContext);
  const { amount } = useContext(AmountContext)
  const { balance } = useContext(BalanceContext)
  const { direction } = useContext(DirectionContext)
  const { application } = useContext(ApplicationContext)
  const { saveBalance } = useContext(BalanceContext)

  const { connected } = useWallet()
  const { active, library: provider} = useWeb3React()
  const solConnection = new Connection(config.solana.rpc, "confirmed")
  const solSigner = useWallet();
  const [ prompt, setPrompt ] = useState(buttonPrompts.swap);
  const [ checksPassed, setChecksPassed ] = useState(false)

  function amountCheck ()  {
    if (balance !== undefined) {
      console.log(step);
      let tocheck;
      switch (step) {
        case 1:
          tocheck = balance[0][`${direction == 'solToEth' ? 'solana' : 'ethereum'}`]
        case 2:
          tocheck = balance[1][`${direction == 'solToEth' ? 'solana' : 'ethereum'}`]
        case 3:
          tocheck = balance[1][`${direction == 'solToEth' ? 'ethereum' : 'solana'}`]
      }
      console.log(tocheck);
      console.log(amount);
      if (amount > 0) { 
        if (amount < tocheck) {
          return true
        } else {setPrompt(buttonPrompts.tooMuch)}
      } else {setPrompt(buttonPrompts.swap)}
    }
    return false
  }

  useEffect(() => {
      switch (step) {
        case 1:
          if (direction == 'solToEth' ? connected : active) {
            if (balance !== undefined && amount > 0) { 
              if (amount <= balance[0].solana) {
                setPrompt(buttonPrompts.swap + ` ${amount} ISC`)
                setChecksPassed(true)
              } else {setPrompt(buttonPrompts.tooMuch);  setChecksPassed(false)}
            } else {setPrompt(buttonPrompts.swap);  setChecksPassed(false)}
          } else {setPrompt(direction == 'solToEth' ? buttonPrompts.sol : buttonPrompts.eth);  setChecksPassed(false)}
          return;

        case 2:
          if (connected) {
            if (active) {
              if (balance !== undefined && amount > 0) { 
                if (amount <= balance[1].solana) {
                  setPrompt(buttonPrompts.bridge + ` ${amount} ISC`)
                  setChecksPassed(true)
                } else {setPrompt(buttonPrompts.tooMuch);  setChecksPassed(false)}
              } else {setPrompt(buttonPrompts.bridge);  setChecksPassed(false)}
            } else {setPrompt(buttonPrompts.eth);  setChecksPassed(false)}
          } else {setPrompt(buttonPrompts.sol);  setChecksPassed(false)}
          return;

        case 3:
          if (direction == 'solToEth' ? active : connected) {
            if (balance !== undefined && amount > 0) { 
              if (amount <= balance[1].ethereum) {
                setPrompt(buttonPrompts.swap + ` ${amount} ISC`)
                setChecksPassed(true)
              } else {setPrompt(buttonPrompts.tooMuch);  setChecksPassed(false)}
            } else {setPrompt(buttonPrompts.swap);  setChecksPassed(false)}
          } else {setPrompt(direction == 'solToEth' ? buttonPrompts.eth : buttonPrompts.sol);  setChecksPassed(false)}
          return;
      }
  }, [amount, balance, step, currStep, active, connected, direction])

  const handleSwapSol = async () => {
    const options = {
      commitment: 'processed'
    };
    setChecksPassed(false)
    setPrompt('Swapping ISC...')
    let tx;
    if (direction === 'solToEth'){
      tx = await application.solana_swap.swap_isc_to_oil(amount);
    } else {
      tx = await application.solana_swap.swap_oil_to_isc(amount);
    }
    let txid;
    try {
      txid = await solSigner.sendTransaction(tx, solConnection, options);
      console.log(txid);
      
    }
    catch (e) {
      console.log(e);
    }
    // try {
    //   const latestBlockHash = await solConnection.getLatestBlockhash();
    //   await solConnection.confirmTransaction({
    //     blockhash: latestBlockHash.blockhash,
    //     lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    //     signature: txid,
    //   }, 'confirmed');
    // }
    // catch (e) {
    //   console.log(e);
    // }
    await application.updateBalance(saveBalance)
    // console.log(await solConnection.getAccountInfo(solSigner.publicKey));
    setChecksPassed(true)
    setPrompt(buttonPrompts.swap)
    setCurrStep(step == 1 ? 2 : 1);
  }

  const handleBridgeSolToEth = async () => {
    const options = {
      commitment: 'finalized'
    };
    const tx = await application.wormhole.send_from_solana(amount)
    setChecksPassed(false)
    let txid;
    console.log(solConnection);
      try {
        setPrompt("Sending ISC to Wormhole...")
        txid = await solSigner.sendTransaction(tx, solConnection, options)
        console.log(txid);
      }
      catch (e) {
        console.log(e);
      }
    // await solConnection.confirmTransaction(txid)
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
        console.log(txid2);
        await application.ethereum_swap.wait_until_finalized({"hash":txid2})
      }
      catch(e) {
        console.log(e);
      }
    setPrompt("Bridging Complete!")
    // Set bridge state
    await application.updateBalance(saveBalance)
    setCurrStep(3);
  }

  const handleBridgeEthToSol = async () => { /* Tested and ready to roll */
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
    await application.updateBalance(saveBalance)
    setChecksPassed(true)
    setCurrStep(3);
  }

  const handleSwapEth = async () => {
    setChecksPassed(false)
    setPrompt("Swapping ISC...")
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
    await application.updateBalance(saveBalance)
    setChecksPassed(true)
    setPrompt(buttonPrompts.swap)
    setCurrStep(step == 1 ? 2 : 1);
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

/* 0x789733c6Cfd5EAa6c27bEAfD8bB7AF20aBe28500
0xD13ebb5C39fB00C06122827E1cbD389930C9E0E3

Swap.deploy('0x789733c6Cfd5EAa6c27bEAfD8bB7AF20aBe28500','0xD13ebb5C39fB00C06122827E1cbD389930C9E0E3', {'from':a})

'0x8914a9E5C5E234fDC3Ce9dc155ec19F43947ab59'

ISCToken[0].mint('0x8914a9E5C5E234fDC3Ce9dc155ec19F43947ab59', 500000000, {'from':a})
 */