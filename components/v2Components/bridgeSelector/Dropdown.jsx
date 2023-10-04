import { useEffect, useState } from "react";
import chainConfig from "../../../config/chains.json"
import styles from '../../../styles/mystyle.module.css';
import { ChainCard } from './ChainCard';
import { SearchField } from "./SearchField";
import Select from 'react-select'

export const Dropdown = ({selection}) => { 
  const {selected, setSelected} = selection;
  let mousePosY = 0;
  const [dropdownPosY, setDropdownPosY] = useState(0);


  const handleClick = (chain) => {
    console.log("selecting");
    setSelected(chain)
  }

  const html = chainConfig.chains.map((chain, index) => {
    console.log(chain.name);
    return (
        <li className={styles.chainCard} key={index} onClick={() => handleClick(chain)}>
          <img src={chain.imgUrl}></img>
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