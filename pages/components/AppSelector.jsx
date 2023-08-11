import EthereumToSolanaApp from "./apps/EthererumToSolanaApp"
import SolanaToEthereumApp from "./apps/SolanaToEthereumApp"


export default function AppSelector({amount, curr_step, setBalance, setCurrStep, my_application, direction}) {
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