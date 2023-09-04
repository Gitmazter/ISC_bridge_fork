import { useEffect, useState } from 'react';
import Card from '../Card';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import useConnectionInfo from '../hooks/useConnectionInfo';
import { useWeb3React } from '@web3-react/core';
import SwapCard from '../SwapCard';
import styles from '../../../styles/mystyle.module.css'
import useBalance from '../hooks/useBalance';
import { IscIcon, OilIcon } from '../utils/IconImgs';
import useAmount from '../hooks/useAmount';

export default function SolanaToEthereumApp({ curr_step, balance, setBalance, setCurrStep, my_application}) {
  
  const { saveBalance } = useBalance() 
  const { active, library: provider } = useWeb3React();
  const { connection } = useConnection()
  const wallets = [useWallet(), useConnectionInfo()];
  const {amount} = useAmount();
  const [step0, setStep0] = useState(null);
  const [step1, setStep1] = useState(null);
  const [step2, setStep2] = useState(null);
  const [step3, setStep3] = useState(null);
  const [step4, setStep4] = useState(null);

  async function updateBalance() {
    if(wallets[0].publicKey && wallets[1]) {
        const solana_bal = await my_application.solana_swap.fetch_balance()
        const eth_bal = await my_application.ethereum_swap.fetch_balance()
        console.log(solana_bal)
        console.log(eth_bal)
        const result = []
        result.push({'item':'User ISC', 'solana':solana_bal.user_isc, 'ethereum':eth_bal.user_isc})
        result.push({'item':'User OIL', 'solana':solana_bal.user_oil, 'ethereum':eth_bal.user_oil})
        result.push({'item':'Pool ISC', 'solana':solana_bal.pool_isc, 'ethereum':eth_bal.pool_isc})
        result.push({'item':'Pool OIL', 'solana':solana_bal.pool_oil, 'ethereum':eth_bal.pool_oil})
        result.push({'item':'User SOL', 'solana':solana_bal.user_sol, 'ethereum':0})
        console.log(saveBalance);
        saveBalance(result)
        setBalance(result)
    }
  }

  useEffect(() => {
    console.log(balance[0]);
    if (balance[0] === undefined) {
        const fetchData = async () => {
            await updateBalance();
        }
        fetchData()
    }
  }, [wallets])

  async function handleStep0() {
      if (curr_step != null) {
          return
      }
      setCurrStep("step_0_busy")
      const options = {
        commitment: 'processed'
      };
      const tx = await my_application.solana_swap.swap_isc_to_oil(amount);
      const txid = await wallets[0].sendTransaction(tx, connection, options);
      setStep0(txid)
      updateBalance()
      setCurrStep("step0")
  }
  async function handleStep1() {
      if (curr_step != "step0") {
          return
      };
      setCurrStep("step_1_busy");
      const options = {
        commitment: 'processed'
      };
      const transaction = await my_application.wormhole.send_from_solana(amount);
      const txid = await wallets[0].sendTransaction(transaction, connection, options);
      setStep1(txid);
      updateBalance();
      setCurrStep("step1");
  }
  async function handleStep2() {
      if (curr_step != "step1") {
          return
      }
      setCurrStep("step_2_busy")
      const vaa = await my_application.wormhole.get_vaa_bytes_solana(step1)
      setStep2(vaa)
      updateBalance()
      setCurrStep("step2")
  }
  async function handleStep3() {
      if(active) {
        const signer = provider.getSigner()
        if (curr_step != "step2") {
            return
        }
        setCurrStep("step_3_busy")
        const tx = await my_application.wormhole.complete_transfer_on_eth(step2, signer)
        setStep3(tx)
        updateBalance()
        setCurrStep("step3")
      }
  }
  async function handleStep4() {
    if (active ) {
        const signer = provider.getSigner()
        if (curr_step != "step3") {
            return
        }
        setCurrStep("step_4_busy")
        const txid = await my_application.ethereum_swap.swap_oil_to_isc(amount, signer)
        setStep4(txid)
        updateBalance()
        setCurrStep(null)
    }
  }

  const card_topics = [
      {
        /* This step interacts with the swap contract on Solana to swap your ISC to OIL */
          /* 'title': 'Swap '+amount+' ISC to OIL', */
          'title': {'from':'ISC', 'to':'OIL'},
          'titlev2': {'from': {'name':'ISC', 'icon': <IscIcon/> }, 'to':{'name':'Oil', 'icon': <OilIcon/> }},
          'content': 'Swap your ISC to OIL; Our bridge token!'
      },
      {
          'title': 'Send OIL to Wormhole',
          'content': 'Send the swapped OIL to Wormhole smart contract and request for a VAA'
      },
      {
          'title': 'Get VAA Bytes',
          'content': 'Check the Wormhole network for the verified message of solana transaction'
      },
      {
          'title': 'Get xOIL on Ethereum',
          'content': 'Interact with the Wormhole smart contract on Ethereum to receive the xOIL in your wallet'
      },
      {
        /* Interact with the swap contract on Ethereum to receive native ISC */
/*           'title': 'Swap '+amount+' xOIL to ISC', */
          'title': {'from':'xOil', 'to':'ISC'},
          'titlev2': {'from': {'name':'xOil', 'icon': <OilIcon/> }, 'to':{'name':'ISC', 'icon': <IscIcon/> }},
          'content': 'Swap your xOil to Ethereum-native* ISC!'
      },
  ];

return <div className={styles.BridgeApp}>
          <SwapCard step={0} card_topic={card_topics[0]} data={step0} loading={curr_step=="step_0_busy"} enable={curr_step==null} click_handler={handleStep0}/>
          <Card step={1} card_topic={card_topics[1]} data={step1} loading={curr_step=="step_1_busy"} enable={curr_step=="step0"} click_handler={handleStep1}/>
          <Card step={2} card_topic={card_topics[2]} data={step2} loading={curr_step=="step_2_busy"} enable={curr_step=="step1"} click_handler={handleStep2}/>
          <Card step={3} card_topic={card_topics[3]} data={step3} loading={curr_step=="step_3_busy"} enable={curr_step=="step2"} click_handler={handleStep3}/>
          <SwapCard step={4} card_topic={card_topics[4]} data={step4} loading={curr_step=="step_4_busy"} enable={curr_step=="step3"} click_handler={handleStep4}/>
      </div>
}
