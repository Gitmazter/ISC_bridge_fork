import { useEffect, useState } from 'react';
import styles from '../../../styles/mystyle.module.css';
import { Dropdown } from './Dropdown';
import chainConfig from "../../../config/chains.json"

export const BridgeInput = ({chaindata, setChainData, order}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(chaindata);
  const [ chainList, setChainList ] = useState(chainConfig.chains);

  useEffect(() => {
    setChainData(selected)
    const input = document.getElementById(`Input${order}`);
    input.value = selected.name;
  },[selected])

  const toggleDropdown = () => {
    setChainList(chainConfig.chains)
    if (open == false) {
      setOpen(true);
    }
  };

  useEffect(() => {
    const chevron = document.getElementById(`Chevron${order}`);
    open 
    ? chevron.style.rotate = '180deg'
    : chevron.style.rotate = '0deg';
  }, [open])

  useEffect(() => {
    const eventHandler = () => {
      setOpen(false)
    }
    document.addEventListener("mouseup", eventHandler)
  }, [])

  const handleChange = (e) => {
    const input = e.target.value.toLowerCase();
    setOpen(true)

    let templist = chainConfig.chains.filter(
      function (chain) { return chain.name.toLowerCase().indexOf(input) !== -1; }
    )
    setChainList(templist);
  }

  useEffect(() => {
    console.log(chainList);
  }, [chainList]);
  
  return (
    <div className={styles.selectorWrapper}>
      <div className={styles.bridgeInputWrapper}>
        <div className={styles.bridgeInputChain}>
          <img src={`chains/${chaindata.name}.svg`}/>
          <input defaultValue={chaindata.BridgeInput} id={`Input${order}`} onChange={handleChange} onClick={(e) => {e.value = ""}}/>
        </div>
        <img src='/chevronDown.svg' className={styles.dropdownBtn} onClick={toggleDropdown} id={`Chevron${order}`}/>
      </div>
      <div className={[open ? styles.active : styles.inactive].join()}> 
        <ul className={styles.dropdown} id={`dropdown${order}`}>
          <Dropdown _selection={{selected, setSelected}} _open={{open, setOpen}} chainList={chainList} />
        </ul>
      </div>
    </div>
  )
}