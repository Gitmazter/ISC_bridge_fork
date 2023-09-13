import styles from '../../../../styles/mystyle.module.css'
import { useContext, useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
/* import useConnectionInfo from '../hooks/useConnectionInfo'; */
import { useWeb3React } from '@web3-react/core';
/* import useAmount from '../hooks/useAmount'; */
import { Connection } from '@solana/web3.js';
import { ethers } from 'ethers';


import { BalanceContext } from '../../contexts/balanceContext';
import { AmountContext } from '../../contexts/amountContext';

console.log(useWallet);
const { saveBalance } = useContext(BalanceContext)
const { active, library: provider } = useWeb3React();
const { connection } = useConnection()
const wallets = [useWallet(), useWeb3React()];
const { amount } = useContext(AmountContext);
const solConnection = new Connection("http://localhost:8899", "confirmed")
const ethProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const [step0, setStep0] = useState(null);
const [step1, setStep1] = useState(null);
const [step2, setStep2] = useState(null);
const [step3, setStep3] = useState(null);
const [step4, setStep4] = useState(null);


export async function updateBalance() {
  if(wallets[0].publicKey && wallets[1]) {
      const solana_bal = await my_application.solana_swap.fetch_balance()
      const eth_bal = await my_application.ethereum_swap.fetch_balance()
      const result = []
      result.push({'item':'User ISC', 'solana':solana_bal.user_isc, 'ethereum':eth_bal.user_isc})
      result.push({'item':'User OIL', 'solana':solana_bal.user_oil, 'ethereum':eth_bal.user_oil})
      result.push({'item':'Pool ISC', 'solana':solana_bal.pool_isc, 'ethereum':eth_bal.pool_isc})
      result.push({'item':'Pool OIL', 'solana':solana_bal.pool_oil, 'ethereum':eth_bal.pool_oil})
      result.push({'item':'User SOL', 'solana':solana_bal.user_sol, 'ethereum':0})
      saveBalance(result)
  }
}

async function handleStep0(e) {
  e.preventDefault()
    if (curr_step != null) {
        return
    }
    const options = {
      commitment: 'processed'
    };
    
    try {
      setCurrStep('step_0_waiting');
      const tx = await my_application.solana_swap.swap_isc_to_oil(amount);
      const txid = await wallets[0].sendTransaction(tx, connection, options);
      setCurrStep("step_0_busy") 
      await solConnection.confirmTransaction(txid)
      setStep0(txid)
      updateBalance()
      setCurrStep("step0")
    }
    catch (e) {
      // Handle fail/reject
      console.log(e);
      setCurrStep(null)
    }
}

async function handleStep1(e) {
  //console.log("AMOUNT: "+ amount);
  e.preventDefault()
    if (curr_step != "step0") {
        return
    };
    const options = {
      commitment: 'processed'
    };
    
    try {
      setCurrStep('step_1_waiting');
      const transaction = await my_application.wormhole.send_from_solana(amount);
      const txid = await wallets[0].sendTransaction(transaction,connection, options);
      setCurrStep("step_1_busy");
      await solConnection.confirmTransaction(txid)
      setStep1(txid);
    }
    catch(e) {
      // Handle fail/reject
      console.log(e);
      setCurrStep('step0')
    }
}
// Resume with TXHASH continues from here
useEffect(() => {
  if (step1 !== null && step2 == null) {
    const fetchVaa = async () => {
      setCurrStep("step_1_busy");
      let VAA = ''
      // let txid = await solConnection.confirmTransaction(step1)
      // Timeout to solve meta error "CONFIRM TIMEOUT TIME FOR MAINNET"
      try {
        setTimeout(async() => {
          VAA = await my_application.wormhole.get_vaa_bytes_solana(step1)
          console.log(VAA);
          setStep2(VAA)
          updateBalance();
          setCurrStep("step2");
        }, 1000);
      }
      catch(e) {
        // handle reject/fail
        console.log(e);
        setCurrStep('step0')
      }
    }
    fetchVaa()
  }
},[step1]) 

async function handleStep3(e) {
  //console.log("AMOUNT: "+ amount);
  console.log(curr_step);
  // e.preventDefault()
    if(active) {
      const signer = provider.getSigner()
      if (curr_step != "step2") {
          return
      }
      try {
        setCurrStep('step_3_waiting');
        const tx = await my_application.wormhole.complete_transfer_on_eth(step2, signer)
        setCurrStep("step_3_busy")
        console.log(tx);
        const txHash = await my_application.wormhole.await_tx_completion_eth(tx)
        setStep3(txHash)
        updateBalance()
        setCurrStep("step3")
      }
      catch (e) {
        console.log(e);
        setCurrStep("step2")
      }
    }
}

async function handleStep4(e) {
  //console.log("AMOUNT: " + amount);
  e.preventDefault()
  if (active ) {
      const signer = provider.getSigner()
      if (curr_step != "step3") {
          return
      }
      try {
        setCurrStep('step_4_waiting');
        const tx = await my_application.ethereum_swap.swap_oil_to_isc(amount, signer)
        setCurrStep("step_4_busy")
        await my_application.ethereum_swap.wait_until_finalized(tx)
        setStep4(tx['hash'])
        updateBalance()
        setCurrStep(null)
      }
      catch(e) {
        console.log(e);
        setCurrStep('step3')
      }
  }
}


// useEffect(()=>{
  //   const receiveOil = async() => {
  //     if(active) {
  //       const signer = provider.getSigner()
  //       try {
  //         setCurrStep('step_3_waiting');
  //         console.log(step2);
  //         const tx = await my_application.wormhole.complete_transfer_on_eth_resume(step2, signer)
  //         setCurrStep("step_3_busy")
  //         console.log(tx);
  //         const txHash = await my_application.wormhole.await_tx_completion_eth(tx)
  //         setStep3(txHash)
  //         updateBalance()
  //         setCurrStep("step3")
  //       }
  //       catch (e) {
  //         console.log(e);
  //         setCurrStep("step2")
  //       }
  //     }
  //   }
  //   if (step2 != null) {
  //     console.log(step2);
  //     receiveOil()
  //   }
  //   else {
  //     console.log('step 2 is null');
  //   }
    
  // },[step2])

  // useEffect(() => {
//   //console.log(balance[0]);
//   if (balance[0] === undefined) {
//       const fetchData = async () => {
//           await updateBalance();
//       }
//       fetchData()
//   }
// }, [wallets])
