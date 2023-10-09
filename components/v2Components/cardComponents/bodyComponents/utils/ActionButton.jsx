import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import TransactionContext from '../../../contexts/TransactionContext';
import ApplicationContext from '../../../contexts/applicationContext';
import { InjectedConnector } from '@web3-react/injected-connector';
import DirectionContext from '../../../contexts/directionContext';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import styles from '../../../../../styles/mystyle.module.css';
import BalanceContext from '../../../contexts/balanceContext';
import AmountContext from '../../../contexts/amountContext';
import bodyConfig from '../../../../../config/BodyConfig';
import { useContext, useEffect, useState } from 'react';
import StepContext from '../../../contexts/stepContext';
import config from '../../../../../config/config.json';
import { useWeb3React } from '@web3-react/core';
import { Connection } from '@solana/web3.js';
import ResumeDataContext from '../../../contexts/ResumeDataContext';

const solConnection = new Connection(config.solana.rpc, 'confirmed');
const buttonPrompts = bodyConfig.buttonPrompts;
const injected = new InjectedConnector();

const ActionButton = () => {
  const { transactionList, saveTransactions } = useContext(TransactionContext);
  const { step, currStep, setCurrStep } = useContext(StepContext);
  const { amount, saveAmount } = useContext(AmountContext);
  const { application } = useContext(ApplicationContext);
  const { resumeData } = useContext(ResumeDataContext);
  const { direction } = useContext(DirectionContext);
  const { saveBalance } = useContext(BalanceContext);
  const { balance } = useContext(BalanceContext);

  const { active, activate, library: provider } = useWeb3React();
  const { setVisible: setModalVisible } = useWalletModal(); 
  const { connected, connect } = useWallet();
  const { connection } = useConnection();
  const solSigner = useWallet();
  
  const [walletSelected, setWalletSelected] = useState(false);
  const [ prompt, setPrompt ] = useState(buttonPrompts.swap);
  const [ checksPassed, setChecksPassed ] = useState(false);
  const [ bridgeWarning, setBridgeWarning ] = useState();

  useEffect(() => {
    setWalletSelected(false);
  },[balance]);

  useEffect(() => {
   setBridgeWarning(document.getElementById('bridgeWarningComponent'));
  },[]);

  useEffect(() => {
    if (resumeData !== undefined) {
      switch (resumeData.idType) {
        case "txid":
          direction == 'solToEth'
          ? 
          resumeSolToEthFromTxidOne(resumeData.resumeInfo)
          :
          ResumeEthToSolWithTxidOne(resumeData.resumeInfo)
          return;
        case "vaa":
          direction == 'solToEth'
          ? 
          resumeSolToEthFromVAA(resumeData.resumeInfo)
          :
          ResumeEthToSolWithVAA(resumeData.resumeInfo)
          return;
        default:
          console.log("no resume data");
      }
    }
  }, [resumeData])

  function amountCheck ()  {
    if (balance !== undefined) {
      console.log(step);
      let tocheck;
      switch (step) {
        case 1:
          tocheck = balance[0][`${direction == 'solToEth' ? 'solana' : 'ethereum'}`];
        case 2:
          tocheck = balance[1][`${direction == 'solToEth' ? 'solana' : 'ethereum'}`];
        case 3:
          tocheck = balance[1][`${direction == 'solToEth' ? 'ethereum' : 'solana'}`];
      }
      if (amount > 0) { 
        if (amount < tocheck) {
          return true;
        } else {setPrompt(buttonPrompts.tooMuch)};
      } else {setPrompt(buttonPrompts.swap)};
    };
    return false;
  };

  async function connectEth () {
    try {
      await activate(injected);
    }
    catch(e){
      console.log(e);
    };
  };

  async function connectSol () {
    console.log(connection);
    if (!walletSelected) {
      console.log("selecting Wallet");
      setWalletSelected(true);
      setModalVisible(true);
    }
    else {
      console.log("connecting");
      connect();
    };
  };

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
                setPrompt(buttonPrompts.swap + ` ${amount} ISC`);
                setChecksPassed(true);
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
  }, [
    amount, 
    balance, 
    step, 
    currStep, 
    active, 
    connected, 
    direction
  ]);

  const handleSwapSol = async () => {
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
      saveTransactions([...transactionList, {txid:txid, status:confirmation, shown:false, time:Date.now()}]);
    }
    catch (e) { 
      console.log(e);
    }
    await application.updateBalance(saveBalance)
    setChecksPassed(true)
    setPrompt(buttonPrompts.swap)
    setCurrStep(step == 1 ? 2 : 1); 
    saveAmount(undefined); 
  } 

  const sendFromSolana = async () => {
    setChecksPassed(false);
    setPrompt("Sending ISC to Wormhole...");
    const txid = await application.wormhole.send_from_solana(amount);
    setPrompt("Awaiting Block Confirmation...");
    await solConnection.confirmTransaction(txid, 'finalized');
    saveTransactions([...transactionList, {txid:txid, status:true, shown:false, time:Date.now()}]);
    return txid;
  };
 
  const fetchSolToEthVAA = async (txid) => {
    setChecksPassed(false);
    setPrompt("Fetching VAA...");
    const VAA = await application.wormhole.get_vaa_bytes_solana(txid);
    // saveTransactions([...transactionList, {txid:VAA.vaaBytes, status:true, shown:false, time:Date.now()}]); DOESNT DISPLAY WHEN FETCHED
    await new Promise(resolve => {setTimeout(() => {resolve()}, 1000)});
    return VAA;
  };

  const completeTransferWithVaaSolToEth = async (VAA, signer) => {
    setChecksPassed(false);
    setPrompt("Requesting ISC from Wormhole...");
    const txid2 = await application.wormhole.complete_transfer_on_eth(VAA, signer);
    setPrompt("Awaiting Block Confirmation...");
    await application.ethereum_swap.wait_for_fifteen_confirmations({"hash":txid2.hash});
    saveTransactions([...transactionList, {txid:txid2.hash, status:true, shown:false, time:Date.now()}]);
    return txid2;
  };

  const handleBridgeSolToEth = async () => {
    let txid, VAA;
    const signer = provider.getSigner();
    try {
      // step 2.1
      txid = await sendFromSolana();
      // step 2.2
      VAA = await fetchSolToEthVAA(txid);
      // step 2.3
      await completeTransferWithVaaSolToEth(VAA, signer);
      // step 2.4
      setPrompt("Bridging Complete!");
      await application.updateBalance(saveBalance);
      setCurrStep(3);
      saveAmount(undefined);
    }
    catch (e) {
      console.log(e);
    };
  };

  const resumeSolToEthFromTxidOne = async (txid) => {
    const signer = provider.getSigner();
    const VAA = await fetchSolToEthVAA(txid);
    await completeTransferWithVaaSolToEth(VAA, signer);
    setPrompt("Bridging Complete!");
    await application.updateBalance(saveBalance);
    setCurrStep(3);
  };

  const resumeSolToEthFromVAA = async (VAA) => {
    const signer = provider.getSigner();
    await completeTransferWithVaaSolToEth({vaaBytes: VAA}, signer);
    setPrompt("Bridging Complete!");
    await application.updateBalance(saveBalance);
    setCurrStep(3);
  };

  const sendFromEthereum = async () => {
    setChecksPassed(false);
    setPrompt("Sending ISC to Wormhole...");
    const txid = await application.wormhole.send_from_ethereum(amount);
    await application.ethereum_swap.wait_for_fifteen_confirmations({"hash":txid.transactionHash});
    saveTransactions([...transactionList, {txid:txid.transactionHash, status:true, shown:false, time:Date.now()}]);
    return txid;
  };

  const fetchEthToSolVaa = async (txid) => {
    setChecksPassed(false);
    setPrompt("Fetching VAA...");
    const VAA = await application.wormhole.get_vaa_bytes_ethereum(txid);
    saveTransactions([...transactionList, {txid:VAA.vaaBytes, status:true, shown:false, time:Date.now()}]);
    return VAA
  };

  const completeTransferWithVaaEthToSol = async (VAA) => {
    setChecksPassed(false);
    setPrompt("(3 signatures) Requesting ISC from Wormhole...");
    const txid2 = await application.wormhole.complete_transfer_on_solana(VAA.vaaBytes);
    console.log(txid2);
    saveTransactions([...transactionList, {txid:txid2[0].signature, status:true, shown:false, time:Date.now()}]);
    setPrompt("Bridging Complete");
  }

  const handleBridgeEthToSol = async () => { /* Tested and ready to roll */
    let txid, VAA;
    try {
      // step 2.1
      txid = await sendFromEthereum();
      // step 2.2
      VAA = await fetchEthToSolVaa(txid);
      // step 2.3
      await completeTransferWithVaaEthToSol(VAA);
      // step.2.4
      await application.updateBalance(saveBalance);
      setChecksPassed(true);
      setCurrStep(3);
    }
    catch (e) {
      console.log(e);
      setChecksPassed(true);
      setCurrStep(2);
    }
  }

  const ResumeEthToSolWithTxidOne = async (txid) => {
    VAA = await fetchEthToSolVaa(txid);
    await completeTransferWithVaaEthToSol(VAA);
    await application.updateBalance(saveBalance);
    setChecksPassed(true);
    setCurrStep(3);
  }

  const ResumeEthToSolWithVAA = async (VAA) => {
    await completeTransferWithVaaEthToSol(VAA);
    await application.updateBalance(saveBalance);
    setChecksPassed(true);
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
    await application.updateBalance(saveBalance);
    setChecksPassed(true);
    setPrompt(buttonPrompts.swap);
    setCurrStep(step == 1 ? 2 : 1);
    saveAmount(undefined);
  };

  const clickHandler = async () => {
    if (direction === 'solToEth'){
      switch (step) {
        case 1:
          console.log('Handling Swap 1');
          if (connected) {
            await handleSwapSol();
            bridgeWarning.style.display = 'flex';
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
        return;
        case 3: 
        console.log('Handling Swap 2');
        if (active) {
          handleSwapEth();
        }
        else {
          connectEth();
        }
      }
    }
    
    else {
      switch (step) {
        case 1:
          console.log('Handling Swap 1');
          if (active) {
            await handleSwapEth();
            bridgeWarning.style.display = 'flex';
          }
          else {
            connectEth();
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
            connectSol();
          }
          return; 
      }
    }
  }

  return ( checksPassed ? <>
    <button type='button' onClick={clickHandler} className={styles.ActionButton}>
      <p>{prompt}</p>
    </button>
    </>
   :
   <>
    <button type='button' className={styles.ActionButtonInactive}>
      <p>{prompt}</p>
    </button>
    </>
  );
};

export default ActionButton;
