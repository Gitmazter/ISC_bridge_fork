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
const buttonPrompts = bodyConfig.buttonPrompts;
import {InjectedConnector} from '@web3-react/injected-connector'
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import TransactionContext from '../../../contexts/TransactionContext';
const injected = new InjectedConnector()

const ActionButton = () => {
  const { transactionList, saveTransactions } = useContext(TransactionContext);
  const { step, currStep, setCurrStep } = useContext(StepContext);
  const { application } = useContext(ApplicationContext)
  const { direction } = useContext(DirectionContext)
  const { saveBalance } = useContext(BalanceContext)
  const { balance } = useContext(BalanceContext)
  const { amount, saveAmount } = useContext(AmountContext)

  const { connected, connect } = useWallet()
  const { connection } = useConnection()
  const solConnection = new Connection(config.solana.rpc, 'confirmed');
  const { active, activate, library: provider, wait_until_finalized} = useWeb3React()
  const { setVisible: setModalVisible } = useWalletModal(); 
  const walletConnection = useConnection()
  const solSigner = useWallet();
  
  const [ prompt, setPrompt ] = useState(buttonPrompts.swap);
  const [ checksPassed, setChecksPassed ] = useState(false)
  const [walletSelected, setWalletSelected] = useState(false);

  useEffect(() => {
    setWalletSelected(false)
  },[balance])


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

  async function connectEth () {
    try {
      await activate(injected)
    }
    catch(e){
      console.log(e);
    }
  }

  async function connectSol () {
    console.log(connection);
    if (!walletSelected) {
      console.log("selecting Wallet");
      setModalVisible(true)
      setWalletSelected(true)
    }
    else {
      console.log("connecting");
      connect()
    }
  }

  useEffect(() => {
      switch (step) {
        case 1:
          if (direction == 'solToEth' ? connected : active) {
            if (balance !== undefined && amount > 0) { 
              if(
                direction == 'solToEth' && amount <= balance[0].solana
                ||
                direction == 'ethToSol' && amount <= balance[0].ethereum
                ) {
                setPrompt(buttonPrompts.swap + ` ${amount} ISC`)
                setChecksPassed(true)
              } else {setPrompt(buttonPrompts.tooMuch);  setChecksPassed(false)}
            } else {setPrompt(buttonPrompts.swap);  setChecksPassed(false)}
          } else {setPrompt(direction == 'solToEth' ? buttonPrompts.sol : buttonPrompts.eth);  setChecksPassed(true)}
          return;

        case 2:
          if (connected) {
            if (active) {
              if (balance !== undefined && amount > 0) { 
                if (
                direction == 'solToEth' && amount <= balance[1].solana
                ||
                direction == 'ethToSol' && amount <= balance[1].ethereum
                  ) {
                  setPrompt(buttonPrompts.bridge + ` ${amount} ISC`)
                  setChecksPassed(true)
                } else {setPrompt(buttonPrompts.tooMuch);  setChecksPassed(false)}
              } else {setPrompt(buttonPrompts.bridge);  setChecksPassed(false)}
            } else {setPrompt(buttonPrompts.eth);  setChecksPassed(true)}
          } else {setPrompt(buttonPrompts.sol);  setChecksPassed(true)}
          return;

        case 3:
          if (direction == 'solToEth' ? active : connected) {
            if (balance !== undefined && amount > 0) { 
              if (
                direction == 'solToEth' && amount <= balance[1].ethereum
                ||
                direction == 'ethToSol' && amount <= balance[1].solana
              ) {
                setPrompt(buttonPrompts.swap + ` ${amount} ISC`)
                setChecksPassed(true)
              } else {setPrompt(buttonPrompts.tooMuch);  setChecksPassed(false)}
            } else {setPrompt(buttonPrompts.swap);  setChecksPassed(false)}
          } else {setPrompt(direction == 'solToEth' ? buttonPrompts.eth : buttonPrompts.sol);  setChecksPassed(true)}
          return;
      }
  }, [amount, balance, step, currStep, active, connected, direction])

  const handleSwapSol = async () => {
    console.log(solSigner);
    console.log(walletConnection);
    const options = {
      commitment: 'confirmed'
    };
    setChecksPassed(false);
    setPrompt('Swapping ISC...');
    let tx;
    if (direction === 'solToEth'){
      tx = await application.solana_swap.swap_isc_to_oil(amount);
    } else {
      tx = await application.solana_swap.swap_oil_to_isc(amount);
    }

    let txid;
    try {
      tx.recentBlockhash = (await solConnection.getLatestBlockhash()).blockhash;
      txid = await solSigner.signTransaction(tx);
      txid = await solConnection.sendRawTransaction(txid.serialize(), options);
    
    }
    catch (e) {
      console.log(e);
    }
    
    let confirmation;
    try {
      confirmation = (await solConnection.confirmTransaction(txid, 'finalized')).value.err == null ? true : false;
      console.log(confirmation);

      saveTransactions([...transactionList, {txid:txid, status:confirmation, shown:false, time:Date.now()}]);
    }
    catch (e) { 
      console.log(e);
    }
    await application.updateBalance(saveBalance)
    setChecksPassed(true)
    setPrompt(buttonPrompts.swap)
    setCurrStep(step == 1 ? 2 : 1);  
  } 

  const handleBridgeSolToEth = async () => {
    setChecksPassed(false)
    let txid;
    try {
        setPrompt("Sending ISC to Wormhole...")
        txid = await application.wormhole.send_from_solana(amount)
        setPrompt("Awaiting Block Confirmation...");
        await solConnection.confirmTransaction(txid, 'finalized')
        saveTransactions([...transactionList, {txid:txid, status:true, shown:false, time:Date.now()}]);
      }
      catch (e) {
        console.log(e);
      }
    let VAA;
      try {
        setPrompt("Fetching VAA...");
        VAA = await application.wormhole.get_vaa_bytes_solana(txid);
        saveTransactions([...transactionList, {txid:VAA.vaaBytes, status:true, shown:false, time:Date.now()}]);
        await new Promise(resolve => {setTimeout(() => {resolve()}, 1000)})
      }
      catch (e) {
        console.log(e);
      }
    const signer = provider.getSigner();
    let txid2;
      try {
        setPrompt("Requesting ISC from Wormhole...");
        txid2 = await application.wormhole.complete_transfer_on_eth(VAA, signer)
        console.log(txid2);
        setPrompt("Awaiting Block Confirmation...");
        await application.ethereum_swap.wait_for_fifteen_confirmations({"hash":txid2.hash});
        saveTransactions([...transactionList, {txid:txid2.hash, status:true, shown:false, time:Date.now()}]);
      }
      catch(e) {
        console.log(e);
      }
    setPrompt("Bridging Complete!")
    await application.updateBalance(saveBalance)
    setCurrStep(3);
  }

  const handleBridgeEthToSol = async () => { /* Tested and ready to roll */
    let txid;
    try {
      setChecksPassed(false)
      setPrompt("Sending ISC to Wormhole...")
      txid = await application.wormhole.send_from_ethereum(amount);
      console.log(txid);
      await application.ethereum_swap.wait_for_fifteen_confirmations({"hash":txid.hash});
      saveTransactions([...transactionList, {txid:txid.hash, status:true, shown:false, time:Date.now()}]);
    }
    catch (e) {
      console.log(e);
    }
    let VAA;
    try {
      setPrompt("Fetching VAA...")
      VAA = await application.wormhole.get_vaa_bytes_ethereum(txid)
      console.log(VAA);
      saveTransactions([...transactionList, {txid:VAA.vaaBytes, status:true, shown:false, time:Date.now()}]);
    }
    catch (e) {
      console.log(e);
    }
    let txid2;
    try {
      setPrompt("(3 signatures) Requesting ISC from Wormhole...")
      txid2 = await  application.wormhole.complete_transfer_on_solana(VAA.vaaBytes)
      console.log(txid2);
      saveTransactions([...transactionList, {txid:txid2, status:true, shown:false, time:Date.now()}]);
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
    let txid
    try {
      if (direction === 'solToEth'){
        txid = await application.ethereum_swap.swap_oil_to_isc(amount);
      }
      else {
        txid = await application.ethereum_swap.swap_isc_to_oil(amount);
      }
    }
    catch (e) {
      console.log(e);
    }
    saveTransactions([...transactionList, {txid:txid.hash, status:true, shown:false, time:Date.now()}]);
    await application.updateBalance(saveBalance)
    setChecksPassed(true)
    setPrompt(buttonPrompts.swap)
    setCurrStep(step == 1 ? 2 : 1);
  }


  const clickHandler = async () => {
    if (direction === 'solToEth'){
      switch (step) {
        case 1:
          console.log('Handling Swap 1');
          if (connected) {
            handleSwapSol();
          }
          else {
            console.log('connecting sol');
            connectSol()
          }
          return; 
        case 2: 
        console.log('Handling Bridge');
        if (connected) {
          if (active) {
            handleBridgeSolToEth();
          }
          else {
            connectEth();
          }
        }
        else{
          connectSol();
        }
          // handleBridgeSolToEth();
          return;
        case 3: 
        console.log('Handling Swap 2');
        if (active) {
          handleSwapEth();
        }
        else {
          connectEth()
        }
      }
    }
    
    else {
      switch (step) {
        case 1:
          console.log('Handling Swap 1');
          if (active) {
            handleSwapEth();
          }
          else {
            connectEth()
          }
          return; 
        case 2: 
          console.log('Handling Bridge');
          if (connected) {
            if (active) {
              handleBridgeEthToSol();
            }
            else {
              connectEth();
            }
          }
          else{
            connectSol();
          }
          return
        case 3: 
          console.log('Handling Swap 1');
          if (connected) {
            handleSwapSol();
          }
          else {
            console.log('connecting sol');
            connectSol()
          }
          return; 
      }
    }
  }

  return ( checksPassed ? <>
    <button type='button' onClick={clickHandler} className={styles.ActionButton}>
      <p>{prompt}</p>
    </button>
    {/* <BaseWalletMultiButton/> */}
    </>
   :
   <>
    <button type='button' className={styles.ActionButtonInactive}>
      <p>{prompt}</p>
    </button>
     {/*  <BaseWalletMultiButton/> */}
    </>
  )
}

export default ActionButton
