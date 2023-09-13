import { EthIcon, EthIscIcon, IscIcon, SolIcon } from "../../icons/TokenIcons";

const type = 'swap'
export default {
  "buttonPrompts": {
    "eth":"Connect Ethereum Wallet",
    "sol":"Connect Solana Wallet",
    "noAmount":"Please Input An Amount",
    "tooMuch":"Amount Exceeds Max Amount",
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