import { useContext } from 'react';
import styles from '../../../../styles/mystyle.module.css'
import { StepContext } from '../../contexts/stepContext';

const MapInfo = () => {
  const {step} = useContext(StepContext)
  const infos = [
    <p>
      {'Swap '}
      <span className={styles.underlined}>
        {'Solana ISC'}
      </span>
      {' for '}
      <span className={styles.underlined}>
        {'Solana Bridge ISC'}
      </span>
    </p>
    ,
    <p>
      {'Bridge '}
      <span className={styles.underlined}>
        {'Solana Bridge ISC'}
      </span>
      {' to Ethereum'}
    </p>
    ,
    <p>
      {'Swap '}
      <span className={styles.underlined}>
        {'Ethereum Bridge ISC'}
      </span>
      {' for '}
      <span className={styles.underlined}>
        {'Ethereum ISC'}
      </span>
    </p>

  ];

  return (
    <p className={styles.MapInfo}>{infos[step-1]}</p>
  );

}

export default MapInfo