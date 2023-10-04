import { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/mystyle.module.css';
import { BridgeInput } from './BridgeInput';
import DirectionContext from '../contexts/directionContext';
import chainConfig from "../../../config/chains.json"

export const BridgeSelector = () => {
  const {direction, saveDirection} = useContext(DirectionContext)

  const [chain1, setChain1] = useState({name: "Solana", imgUrl: "./solana.svg"});
  const [chain2, setChain2] = useState({name: "Ethereum", imgUrl: "./ethereum.svg"});
  const [supportedSelection, setSupportedSelection] = useState(false)
  useEffect(()=> {

    const selection = chainConfig.establishedBridges.find((bridge) => {
      if (bridge.chainOne === chain1.name && bridge.chainTwo === chain2.name) {
        return bridge;
      }
    });
    console.log(selection);

    if (selection !== undefined) {
      saveDirection(selection.direction);
      setSupportedSelection(true);
    }
    else {
      setSupportedSelection(false);
    }
  
  },[chain1, chain2])

  useEffect(() => {
    console.log(direction);
  }, [direction])

  return (
    <div className={styles.bridgeSelector}>
      <BridgeInput chaindata={chain1} setChainData={setChain1} order={1}/>
      {
        !supportedSelection
        ?
        <img src='cross.svg' className={styles.turn270}/>
        :
        <img src='/new/ArrowInCircle.svg' className={styles.turn270}/>
      }
      <BridgeInput chaindata={chain2} setChainData={setChain2} order={2}/>
    </div>
  )
}
