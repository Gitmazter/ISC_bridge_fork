import { use, useContext, useEffect, useState } from 'react';
import styles from '../../../../styles/mystyle.module.css'
import StepContext from '../../contexts/stepContext';
import DirectionContext from '../../contexts/directionContext';
import BodyConfig from '../../../../config/BodyConfig';

const MapInfo = () => {
  const {direction} = useContext(DirectionContext);
  const {step} = useContext(StepContext);
  const [tokenNames, setTokenNames] = useState(BodyConfig[`${direction}`].tokenNames)
  useEffect(() => {setTokenNames(BodyConfig[`${direction}`].tokenNames)}, [direction])
  const infos = [
    <p>
      {'Swap '}
      <span className={styles.underlined}>
        {tokenNames[0]}
      </span>
      {' for '}
      <span className={styles.underlined}>
        {tokenNames[1]}
      </span>
    </p>
    ,
    <p>
      {'Bridge '}
      <span className={styles.underlined}>
        {tokenNames[1]}
      </span>
      {` to ${direction == 'solToEth' ? "Ethereum" : "Solana"}`}
    </p>
    ,
    <p>
      {'Swap '}
      <span className={styles.underlined}>
        {tokenNames[2]}
      </span>
      {' for '}
      <span className={styles.underlined}>
        {tokenNames[3]}
      </span>
    </p>

  ];

  return (
    <p className={styles.MapInfo}>{infos[step-1]}</p>
  );

}

export default MapInfo