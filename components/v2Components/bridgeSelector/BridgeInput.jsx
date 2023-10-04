import { useEffect, useState } from 'react';
import styles from '../../../styles/mystyle.module.css';
import { Dropdown } from './Dropdown';
import { ScrollBar } from './ScrollBar';


export const BridgeInput = ({chaindata}) => {

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(chaindata)
  const [dropdownYPos, setDropdownYPos] = useState(0)

  const toggleDropdown = () => {
    setOpen(!open);
    const chevron = document.getElementById(`${selected.name}Chevron`);
    open 
    ? chevron.style.rotate = '0deg'
    : chevron.style.rotate = '180deg';
  };


  return (
    <div className={styles.selectorWrapper}>
      <div className={styles.bridgeInputWrapper}>
        <div className={styles.bridgeInputChain}>
          <img src={selected.imgUrl}/>
          <span>{selected.name}</span>
        </div>
        <img src='/chevronDown.svg' className={styles.dropdownBtn} onClick={toggleDropdown} id={`${selected.name}Chevron`}/>
      </div>
      <div className={[open ? styles.active : styles.inactive].join()}> 
        <ul className={styles.dropdown} id={`${selected.name}-dropdown`}>
          <Dropdown selection={{selected, setSelected}} />
        </ul>
      </div>
    </div>
  )
}