import { useEffect, useState } from 'react';
import Card from '../Card';

export default function EthereumToSolanaApp({amount, curr_step, setBalance, setCurrStep, my_application}) {
  const [step0, setStep0] = useState(null);
  const [step1, setStep1] = useState(null);
  const [step2, setStep2] = useState(null);
  const [step3, setStep3] = useState(null);
  const [step4, setStep4] = useState(null);

  async function updateBalance() {
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
      setBalance(result)
  }

  useEffect(() => {
      const fetchData = async () => {
          await updateBalance();
      }
      fetchData()
  }, [])

  async function handleStep0() {
      if (curr_step != null) {
          return
      }
      setCurrStep("step_0_busy")
      const txid = await my_application.ethereum_swap.swap_isc_to_oil(amount)
      setStep0(txid)
      console.log(txid)
      updateBalance()
      setCurrStep("step0")
  }
  async function handleStep1() {
      if (curr_step != "step0") {
          return
      }
      setCurrStep("step_1_busy")
      const txid = await my_application.wormhole.send_from_ethereum(amount)
      setStep1(txid)
      updateBalance()
      setCurrStep("step1")
  }
  async function handleStep2() {
      if (curr_step != "step1") {
          return
      }
      setCurrStep("step_2_busy")
      const vaa = await my_application.wormhole.get_vaa_bytes_ethereum(step1)
      setStep2(vaa)
      updateBalance()
      setCurrStep("step2")
  }
  async function handleStep3() {
      if (curr_step != "step2") {
          return
      }
      setCurrStep("step_3_busy")
      const tx = await my_application.wormhole.complete_transfer_on_solana(step2)
      setStep3(tx)
      updateBalance()
      setCurrStep("step3")
  }
  async function handleStep4() {
      if (curr_step != "step3") {
          return
      }
      setCurrStep("step_4_busy")
      const txid = await my_application.solana_swap.swap_oil_to_isc(amount)
      setStep4(txid)
      updateBalance()
      setCurrStep(null)
  }
  function AppSelector({amount, curr_step, setBalance, setCurrStep, my_application, direction}) {
      if (direction == 'sol_to_eth') {
          return <SolanaToEthereumApp
                  amount={amount}
                  curr_step={curr_step}
                  setBalance={setBalance}
                  setCurrStep={setCurrStep}
                  my_application={my_application}/>
      } else {
          return <EthereumToSolanaApp
                  amount={amount}
                  curr_step={curr_step}
                  setBalance={setBalance}
                  setCurrStep={setCurrStep}
                  my_application={my_application}/>
      }
  }
  const card_topics = [
      {
          'title': 'Swap '+amount+' ISC to xOIL',
          'content': 'This step interacts with the swap contract on Solana to swap your ISC to OIL'
      },
      {
          'title': 'Send xOIL to Wormhole',
          'content': 'Send the swapped OIL to Wormhole smart contract and request for a VAA'
      },
      {
          'title': 'Get VAA Bytes',
          'content': 'Check the Wormhole network for the verified message of solana transaction'
      },
      {
          'title': 'Get OIL on Solana',
          'content': 'Interact with the Wormhole smart contract on Ethereum to receive the xOIL in your wallet'
      },
      {
          'title': 'Swap '+amount+' OIL to ISC',
          'content': 'Interact with the swap contract on Ethereum to receive native ISC'
      },
  ];

return <div>
          <Card step={0} card_topic={card_topics[0]} data={step0} loading={curr_step=="step_0_busy"} enable={curr_step==null} click_handler={handleStep0}/>
          <Card step={1} card_topic={card_topics[1]} data={step1} loading={curr_step=="step_1_busy"} enable={curr_step=="step0"} click_handler={handleStep1}/>
          <Card step={2} card_topic={card_topics[2]} data={step2} loading={curr_step=="step_2_busy"} enable={curr_step=="step1"} click_handler={handleStep2}/>
          <Card step={3} card_topic={card_topics[3]} data={step3} loading={curr_step=="step_3_busy"} enable={curr_step=="step2"} click_handler={handleStep3}/>
          <Card step={4} card_topic={card_topics[4]} data={step4} loading={curr_step=="step_4_busy"} enable={curr_step=="step3"} click_handler={handleStep4}/>
      </div>
}
