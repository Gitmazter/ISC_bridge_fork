import styles from '../../../styles/mystyle.module.css';
import { BridgeInput } from './BridgeInput';


export const BridgeSelector = () => {

  const chain1 = {name: "Solana", imgUrl: "./solana.svg"  };
  const chain2 = {name: "Ethereum", imgUrl: "./ethereum.svg"  };


  return (
    <div className={styles.bridgeSelector}>
      <BridgeInput chaindata={chain1}/>
      <img src='/new/ArrowInCircle.svg' className={styles.turn270}/>
      <BridgeInput chaindata={chain2}/>
    </div>
  )
}
