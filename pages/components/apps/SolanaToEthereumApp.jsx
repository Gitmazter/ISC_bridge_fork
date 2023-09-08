import styles from '../../../styles/mystyle.module.css'
import { useEffect, useState } from 'react';
import Card from '../Card';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import useConnectionInfo from '../hooks/useConnectionInfo';
import { useWeb3React } from '@web3-react/core';
import SwapCard from '../SwapCard';
import useBalance from '../hooks/useBalance';
import { IscIcon, OilIcon } from '../utils/IconImgs';
import useAmount from '../hooks/useAmount';
import SendCard from '../SendCard';
import { Connection } from '@solana/web3.js';
import { ethers } from 'ethers';

export default function SolanaToEthereumApp({ curr_step, balance, setBalance, setCurrStep, my_application}) {
  
  const { saveBalance } = useBalance() 
  const { active, library: provider } = useWeb3React();
  const { connection } = useConnection()
  const wallets = [useWallet(), useConnectionInfo()];
  const { amount } = useAmount();
  const solConnection = new Connection("http://localhost:8899", "confirmed")
  const ethProvider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const [step0, setStep0] = useState(null);
  const [step1, setStep1] = useState(null);
  const [step2, setStep2] = useState(null);
  const [step3, setStep3] = useState(null);
  const [step4, setStep4] = useState(null);

  async function updateBalance() {
    if(wallets[0].publicKey && wallets[1]) {
        const solana_bal = await my_application.solana_swap.fetch_balance()
        const eth_bal = await my_application.ethereum_swap.fetch_balance()
        //console.log(solana_bal)
        //console.log(eth_bal)
        const result = []
        result.push({'item':'User ISC', 'solana':solana_bal.user_isc, 'ethereum':eth_bal.user_isc})
        result.push({'item':'User OIL', 'solana':solana_bal.user_oil, 'ethereum':eth_bal.user_oil})
        result.push({'item':'Pool ISC', 'solana':solana_bal.pool_isc, 'ethereum':eth_bal.pool_isc})
        result.push({'item':'Pool OIL', 'solana':solana_bal.pool_oil, 'ethereum':eth_bal.pool_oil})
        result.push({'item':'User SOL', 'solana':solana_bal.user_sol, 'ethereum':0})
        //console.log(saveBalance);
        saveBalance(result)
        setBalance(result)
    }
  }

  useEffect(() => {
    //console.log(balance[0]);
    if (balance[0] === undefined) {
        const fetchData = async () => {
            await updateBalance();
        }
        fetchData()
    }
  }, [wallets])

  async function handleStep0(e) {
    //console.log("AMOUNT: "+amount);
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

  useEffect(()=>{
    const receiveOil = async() => {
      if(active) {
        const signer = provider.getSigner()
        try {
          setCurrStep('step_3_waiting');
          console.log(step2);
          const tx = await my_application.wormhole.complete_transfer_on_eth_resume(step2, signer)
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
    if (step2 != null) {
      console.log(step2);
      receiveOil()
    }
    else {
      console.log('step 2 is null');
    }
    

  },[step2])



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

  const card_topics = [
      {
        /* This step interacts with the swap contract on Solana to swap your ISC to OIL */
          /* 'title': 'Swap '+amount+' ISC to OIL', */
          'title': '1. Swap ISC for OIL',
          'titlev2': {'from': {'name':'ISC', 'icon': <IscIcon/> }, 'to':{'name':'Oil', 'icon': <OilIcon/> }},
          'content': 'Swap your ISC to OIL; Our bridge token!'
      },
      {
          'title': '2. Send OIL to Wormhole and fetch VAA bytes',
          'content': 'Send the swapped OIL to Wormhole smart contract and request for a VAA receipt'
      },
      {
          'title': '3. VAA bytes',
          'content': 'Check the Wormhole network for the verified message of solana transaction'
      },
      {
          'title': '3. Get xOIL on Ethereum',
          'content': 'Interact with the Wormhole smart contract on Ethereum to receive the xOIL in your wallet'
      },
      {
        /* Interact with the swap contract on Ethereum to receive native ISC */
        /*           'title': 'Swap '+amount+' xOIL to ISC', */
          'title': '4. Swap xOil for ISC',
          'titlev2': {'from': {'name':'xOil', 'icon': <OilIcon/> }, 'to':{'name':'eISC', 'icon': <IscIcon/> }},
          'content': 'Swap your xOil to Ethereum-native* ISC!'
      },
  ];

return <div className={styles.BridgeApp}>
          <SwapCard 
            step={0} 
            card_topic={card_topics[0]} 
            setCurrStep={setCurrStep} 
            data={step0} 
            loading={curr_step=="step_0_busy"} 
            enable={curr_step==null}    
            click_handler={handleStep0} 
            waiting={curr_step == 'step_0_waiting'}
          />
          <SendCard 
            step={1} 
            card_topic={card_topics[1]} 
            setCurrStep={setCurrStep}              
            loading={curr_step=="step_1_busy"} 
            enable={curr_step=="step0"} 
            click_handler={handleStep1} 
            waiting={curr_step == 'step_1_waiting'}  
            txid={step1} vaa={step2}  
            my_application={my_application}
            setStep1={setStep1}
            setStep2={setStep2}
            curr_step={curr_step}
          />
          <Card
            step={3} 
            card_topic={card_topics[3]} 
            setCurrStep={setCurrStep} 
            data={step3} 
            loading={curr_step=="step_3_busy"} 
            enable={curr_step=="step2"} 
            click_handler={handleStep3} 
            waiting={curr_step == 'step_3_waiting'} 
            setStep2={setStep2}
          />
          <SwapCard 
            step={4} 
            card_topic={card_topics[4]} 
            setCurrStep={setCurrStep} 
            data={step4} 
            loading={curr_step=="step_4_busy"} 
            enable={curr_step=="step3"} 
            click_handler={handleStep4} 
            waiting={curr_step == 'step_4_waiting'}
          />
      </div>
}
