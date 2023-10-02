import styles from '../../../styles/mystyle.module.css';
import { Dropdown } from './Dropdown';


export const BridgeInput = ({chaindata}) => {

  return (
    <div className={styles.selectorWrapper}>
      <div className={styles.bridgeInputWrapper}>
        <div className={styles.bridgeInputChain}>
          <img src={chaindata.imgUrl}/>
          <span>{chaindata.name}</span>
        </div>
        <img src='/chevronDown.svg' className={styles.dropdownBtn}/>
      </div>
      <Dropdown/>
    </div>
  )
}