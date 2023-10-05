import { useEffect } from 'react';
import styles from '../../../styles/mystyle.module.css'

export const TxSuccessPopup = ({txid, counter}) => {
  const slideIn = () => {
    const popup = document.getElementById(`popupSuccess${txid}`);
    popup.style.display = 'block';
    popup.style.opacity = 1;
    popup.style.transform = "translateX(0)"
  }  
  const slideOut = async () => {
    const popup = document.getElementById(`popupSuccess${txid}`);
    popup.style.opacity = 0;
    popup.style.transform = "translateX(400px)"
    await new Promise(resolve => { 
      setTimeout(() => {resolve()}, 500)  
    })
    popup.style.display = 'none';
  }  


  const animateBorder = async () => {
    const popup = document.getElementById(`popupSuccess${txid}`);
    while (counter <= 1000) {
      popup.style.background = `linear-gradient(to right, #2B7A0F ${counter/10}%, #00000000 ${counter/10+20}%)`;
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
    <div className={styles.popupSuccess} id={`popupSuccess${txid}`} key={txid}> 
      <div className={styles.txPopup}>
        <p className={styles.ppMessage}>Transaction <span>Successful!</span></p>
        <a className={styles.ppTxid} href={`https://explorer.solana.com/tx/${txid}`} target='empty'>
         <p>{txid}</p>
        </a> 
        <img className={styles.statusImg} src='./new/success.svg' />
        <div className={styles.diagonalLine1}></div>
        <div className={styles.diagonalLine2}></div>
        <button type='button' onClick={slideOut} className={styles.closePopup}>X</button>
      </div>
    </div>
  )
}