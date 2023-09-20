import { useConnection, useWallet } from '@solana/wallet-adapter-react';
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
import axios from 'axios';
import confirmSolanaTx from './confirmSolanaTx';
import MaxAmountContext from '../../../contexts/maxAmountContext';
const buttonPrompts = bodyConfig.buttonPrompts;


config
const ActionButton = () => {
  const { step, currStep, setCurrStep } = useContext(StepContext);
  const { amount } = useContext(AmountContext)
  const { balance } = useContext(BalanceContext)
  const { direction } = useContext(DirectionContext)
  const { application } = useContext(ApplicationContext)
  const { saveBalance } = useContext(BalanceContext)

  const { connected, signMessage } = useWallet()
  const { active, library: provider} = useWeb3React()
  const solConnection = new Connection(config.solana.rpc, "confirmed")
  // solConnection._rpcWsEndpoint = config.solana.wss;
  // // solConnection.underlyingSocket.url = config.solana.wss;
  const solSigner = useWallet();
  const [ prompt, setPrompt ] = useState(buttonPrompts.swap);
  const [ checksPassed, setChecksPassed ] = useState(false)
  const walletConnection = useConnection()
  const { maxAmounts, saveMaxAmounts } = useContext(MaxAmountContext)

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
            if (/* balance !== undefined && */ amount > 0) { 
              if (/* amount <= maxAmounts[0] */ true) {
                setPrompt(buttonPrompts.swap + ` ${amount} ISC`)
                setChecksPassed(true)
              } else {setPrompt(buttonPrompts.tooMuch);  setChecksPassed(false)}
            } else {setPrompt(buttonPrompts.swap);  setChecksPassed(false)}
          } else {setPrompt(direction == 'solToEth' ? buttonPrompts.sol : buttonPrompts.eth);  setChecksPassed(false)}
          return;

        case 2:
          if (connected) {
            if (active) {
              if (/* balance !== undefined && */ amount > 0) { 
                if (/* amount <= maxAmounts[1] */ true) {
                  setPrompt(buttonPrompts.bridge + ` ${amount} ISC`)
                  setChecksPassed(true)
                } else {setPrompt(buttonPrompts.tooMuch);  setChecksPassed(false)}
              } else {setPrompt(buttonPrompts.bridge);  setChecksPassed(false)}
            } else {setPrompt(buttonPrompts.eth);  setChecksPassed(false)}
          } else {setPrompt(buttonPrompts.sol);  setChecksPassed(false)}
          return;

        case 3:
          if (/* direction == 'solToEth' ? active : connected */ true) {
            if (/* balance !== undefined && */ amount > 0) { 
              if (/* amount <= maxAmounts[2] */ true) {
                setPrompt(buttonPrompts.swap + ` ${amount} ISC`)
                setChecksPassed(true)
              } else {setPrompt(buttonPrompts.tooMuch);  setChecksPassed(false)}
            } else {setPrompt(buttonPrompts.swap);  setChecksPassed(false)}
          } else {setPrompt(direction == 'solToEth' ? buttonPrompts.eth : buttonPrompts.sol);  setChecksPassed(false)}
          return;
      }
  }, [amount, balance, step, currStep, active, connected, direction])

  const handleSwapSol = async () => {
    console.log(solSigner);
    console.log(walletConnection);
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
    try {
      console.log(solConnection);
      console.log('works til here');
      
      const conf = await confirmSolanaTx(txid)
      console.log(conf.data.result);
      // await solConnection.confirmTransaction({
      //   blockhash: latestBlockHash.blockhash,
      //   lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      //   signature: txid,
      // }, 'confirmed');
    }
    catch (e) {
      console.log(e);
    }
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
    await confirmSolanaTx(txid)
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
        await application.ethereum_swap.wait_until_finalized({"hash":txid2.hash})
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
      txid2 = await  application.wormhole.complete_transfer_on_solana(VAA.vaaBytes, walletConnection)
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
        tx = await application.ethereum_swap.swap_oil_to_isc(0.100);
      }
      else {
        tx = await application.ethereum_swap.swap_isc_to_oil(0.100);
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

  async function mockIt1 () {
    setChecksPassed(false)
    setPrompt("Requesting Signature");
    await new Promise(resolve => setTimeout(() => resolve(console.log('.')), 3000));
    setPrompt("Swapping ISC...");
    await new Promise(resolve => setTimeout(() => resolve(console.log('.')), 4000));
    let tempBalance = maxAmounts
    setPrompt("Swap")
    setChecksPassed(true)
    tempBalance[0] -= 100;
    tempBalance[1] += 100;
    console.log(maxAmounts);
    saveMaxAmounts(tempBalance)
    setCurrStep(2)
  }
  async function mockIt2 () {
    setChecksPassed(false)
    setPrompt("Requesting Signature");
    await new Promise(resolve => setTimeout(() => resolve(console.log('.')), 3000));
    setPrompt("Sending ISC...");
    await new Promise(resolve => setTimeout(() => resolve(console.log('.')), 4000));
    setPrompt("Requesting VAA...");
    await new Promise(resolve => setTimeout(() => resolve(console.log('.')), 8000));
    setPrompt("Requesting Signature");
    await new Promise(resolve => setTimeout(() => resolve(console.log('.')), 4000));
    setPrompt("Awaiting Confirmation...");
    await new Promise(resolve => setTimeout(() => resolve(console.log('.')), 4000));
    let tempBalance = maxAmounts
    setPrompt("Bridge Complete")
    setChecksPassed(true)
    tempBalance[1] -= 100;
    tempBalance[2] += 100;
    console.log(maxAmounts);
    saveMaxAmounts(tempBalance)
    setCurrStep(3)

  }
  async function mockIt3 () {
    setChecksPassed(false)
    setPrompt("Requesting Signature");
    await new Promise(resolve => setTimeout(() => resolve(console.log('.')), 3000));
    setPrompt("Swapping ISC...");
    await new Promise(resolve => setTimeout(() => resolve(console.log('.')), 4000));
    let tempBalance = maxAmounts
    setPrompt("Swap")
    setChecksPassed(true)
    tempBalance[2] -= 100;
    tempBalance[3] += 100;
    console.log(maxAmounts);
    saveMaxAmounts(tempBalance)
    setCurrStep(1)
  }


  const clickHandler = () => {
      switch (step) {
        case 1:
          console.log('Handling Swap 1');
          mockIt1()
          return; 
        case 2: 
          console.log('Handling Bridge');
          mockIt2();
          return;
        case 3: 
          console.log('Handling Swap 2');
          mockIt3()
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