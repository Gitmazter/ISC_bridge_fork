import { useEffect } from 'react';
import styles from '../../../styles/mystyle.module.css'
import { resolve } from 'styled-jsx/css';

// Make sure these show up accurately after each addition to Transaction List
// 


export const TxFailedPopup = ({txid, counter}) => {

  const slideIn = () => {
    const popup = document.getElementById(`popupFailed${txid}`);
    popup.style.opacity = 1;
    popup.style.transform = "translateX(0)"
  }  
  const slideOut = async () => {
    const popup = document.getElementById(`popupFailed${txid}`);
    popup.style.opacity = 0;
    popup.style.transform = "translateX(400px)"
    popup.style.display = 'none'
    await new Promise(resolve => { 
      setTimeout(() => {resolve()}, 500)  
    })
    popup.style.display = 'none'
    popup.style.height = '0px';
  }  


  const animateBorder = async () => {
    const popup = document.getElementById(`popupFailed${txid}`);
    while (counter <= 1000) {
      popup.style.background = `linear-gradient(to right, #BB5151 ${(counter/10)}%, #00000000 ${(counter/10)+20}%)`;
      await new Promise(resolve => {
        setTimeout(() => {
          counter++;
          resolve()
        }, 5000/1000); 
        console.log("updating style");
      });
    } 
  }

  useEffect(() => {
    async function loadPopup () {
      slideIn();
      await animateBorder();
      slideOut();
    }   
    loadPopup();
  },[])

  return (
    <div className={styles.popupFailed} id={`popupFailed${txid}`} key={txid}>
      <div className={styles.txPopup}>
        <p className={styles.ppMessage}>Transaction 
          <span> Failed!</span>
        </p>
        <a className={styles.ppTxid} href={`https://explorer.solana.com/tx/${txid}`} target='empty'>
          <p>{txid}</p>
        </a>
        <img className={styles.statusImg} src='./new/failed.svg' />
        <div className={styles.diagonalLine1}></div>
        <div className={styles.diagonalLine2}></div>
        <button type='button' onClick={slideOut} className={styles.closePopup}>X</button>
      </div> 
    </div>
  )
}