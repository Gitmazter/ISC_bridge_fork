import EthIcon from '../components/v2Components/cardComponents/icons/EthIcon'
import IscIcon from '../components/v2Components/cardComponents/icons/IscIcon'
import EthIscIcon from '../components/v2Components/cardComponents/icons/EthIscIcon'
import SolIcon from '../components/v2Components/cardComponents/icons/SolIcon'


const type = 'swap'
const map = 'map'
export default {
  "buttonPrompts": {
    "eth":"Connect Ethereum Wallet",
    "sol":"Connect Solana Wallet",
    "noAmount":"Please Input An Amount",
    "tooMuch":"Amount Exceeds Balance",
    "waiting":"Awaiting previous step",
    "swap":"Swap",
    "bridge":"Bridge"
  },

  "solToEth": {
    "activePrompts" : [
      "You're swapping",
      "You're Bridging",
      "You're swapping"
    ],
    "inactivePrompts" : [
      "To Receive",
      "To Ethereum",
      "To Receive"
    ],
    "tokenIcons": [
      <><SolIcon type={type}/><IscIcon type={type}/></>,
      <><SolIcon type={type}/><EthIscIcon type={type}/></>,
      <><EthIcon type={type}/><EthIscIcon type={type}/></>,
      <><EthIcon type={type}/><IscIcon type={type}/></>
    ],
    "tokenIconsMap": [
      <><SolIcon type={map}/><IscIcon type={map}/></>,
      <><SolIcon type={map}/><EthIscIcon type={map}/></>,
      <><EthIcon type={map}/><EthIscIcon type={map}/></>,
      <><EthIcon type={map}/><IscIcon type={map}/></>
    ],
    "tokenNames": [
      "Solana ISC",
      "Solana Bridge ISC",
      "Ethereum Bridge ISC",
      "Ethereum ISC"
    ],
  },

  "ethToSol": {
    "activePrompts" : [
      "You're swapping",
      "You're Bridging",
      "You're swapping"
    ],
    "inactivePrompts" : [
      "To Receive",
      "To Solana",
      "To Receive"
    ],
    "tokenIcons": [
      <><EthIcon type={type}/><IscIcon type={type}/></>,
      <><EthIcon type={type}/><EthIscIcon type={type}/></>,
      <><SolIcon type={type}/><EthIscIcon type={type}/></>,
      <><SolIcon type={type}/><IscIcon type={type}/></>,
    ],
    "tokenIconsMap": [
      <><EthIcon type={map}/><IscIcon type={map}/></>,
      <><EthIcon type={map}/><EthIscIcon type={map}/></>,
      <><SolIcon type={map}/><EthIscIcon type={map}/></>,
      <><SolIcon type={map}/><IscIcon type={map}/></>,
    ],
    "tokenNames": [
      "Ethereum ISC",
      "Ethereum Bridge ISC",
      "Solana Bridge ISC",
      "Solana ISC",
    ],
    "activeTokens": [
      <>Token Card 1</>,
      <>Token Card 2</>,
      <>Token Card 3</>
    ],
    "inactiveTokens": [
      <>Token Card 1</>,
      <>Token Card 2</>,
      <>Token Card 3</>
    ]
  }
}