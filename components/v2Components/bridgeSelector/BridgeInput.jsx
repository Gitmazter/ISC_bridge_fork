import { useEffect, useState } from 'react';
import styles from '../../../styles/mystyle.module.css';
import { Dropdown } from './Dropdown';
import { ScrollBar } from './ScrollBar';


export const BridgeInput = ({chaindata}) => {

  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };


  return (
    <div className={styles.selectorWrapper}>
      <div className={styles.bridgeInputWrapper}>
        <div className={styles.bridgeInputChain}>
          <img src={chaindata.imgUrl}/>
          <span>{chaindata.name}</span>
        </div>
        <img src='/chevronDown.svg' className={styles.dropdownBtn} onClick={toggleDropdown} id=''/>
      </div>
      <div className={[open ? styles.active : styles.inactive].join()}> 
        <div className={styles.dropdown} id={`${chaindata.name}-dropdown`}>
          <Dropdown open={open}/>
        </div>
        <ScrollBar chaindata={chaindata}/>
      </div>
    </div>
  )
}