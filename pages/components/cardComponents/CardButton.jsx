import { useEffect, useState } from 'react';
import styles from '../../../styles/mystyle.module.css'

export default function CardButton({value, enable, click_handler, waiting}) {
  const [ display, setDisplay ] = useState(false);
  const waitingMessageBase = 'Waiting for signature....'
  const [ waitingMessage, setWaitingMessage ] = useState(waitingMessageBase)


  // Waiting animation
  useEffect(()=>{
    let interval = undefined
    let i = 21
    if (waiting) {
      interval = setInterval(()=> {
        if (i < waitingMessageBase.length) {
          setWaitingMessage(waitingMessageBase.substring(0,i))
          i++
        }
        else {
          i = 21;
          setWaitingMessage(waitingMessageBase.substring(0,i))
          i++;
        }
      }, 333);
    }
    else {
      clearInterval(interval)
    }
  },[waiting])


  return (
    waiting 
    ?
      <div className={styles.action_waiting}>
        <button type='button' className={waiting?styles.button:styles.noDisplay} href="#"> {waitingMessage} </button>
      </div>
    :
      <div className={styles.action}>
        <button type='button' className={enable?styles.button:styles.noDisplay} onClick={click_handler} href="#"> {value} </button>
      </div>
  )
}