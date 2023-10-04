import { useEffect, useState } from "react";
import chainConfig from "../../../config/chains.json"
import styles from '../../../styles/mystyle.module.css';
import { ChainCard } from './ChainCard';
import { SearchField } from "./SearchField";
import Select from 'react-select'

export const Dropdown = ({_selection, _open, chainList}) => { 
  const {selected, setSelected} = _selection;
  const {open, setOpen} = _open
  let mousePosY = 0;
  const [dropdownPosY, setDropdownPosY] = useState(0);


  const handleClick = (chain) => {
    console.log("selecting");
    setSelected(chain)
    setOpen(false)
  }

  const html = chainList.map((chain, index) => {
    console.log(chain.name);
    return (
        <li className={styles.chainCard} key={index} onClick={() => handleClick(chain)}>
          <img src={`chains/${chain.name}.svg`}></img>
          <p>{chain.name}</p>
        </li>
    )
  })


  return (  
    <>
      {html}
    </>  
  )
}