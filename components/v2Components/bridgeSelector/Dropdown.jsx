import { useEffect, useState } from "react";
import chainConfig from "../../../config/chains.json"
import styles from '../../../styles/mystyle.module.css';
import { ChainCard } from './ChainCard';
import { SearchField } from "./SearchField";
import Select from 'react-select'

export const Dropdown = () => { 
  let mousePosY = 0;
  const [dropdownPosY, setDropdownPosY] = useState(0);

  const handleClick = () => {
    // Update Bridge with new chain
  }
  const handleDrag = () => {
    // smoothly move the div up or down
    console.log('dragging');
    
  }

  const html = chainConfig.chains.map((chain, index) => {
    console.log(chain.name);
    return (
        <div className={styles.chainCard} key={index}>
          <img src={chain.imgUrl}></img>
          <p>{chain.name}</p>
        </div>
    )
  })


  return (  
    <>
      {html}
    </>  
  )
}