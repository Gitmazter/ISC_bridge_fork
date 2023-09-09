import { useEffect, useState } from 'react'
import styles from '../../../styles/mystyle.module.css'
import { useConnection  } from '@solana/wallet-adapter-react'
import useBrideDirection from '../hooks/useBrideDirection'
import { Connection } from '@solana/web3.js'


export const CardResumeSend = ({setStep1}) => {
  const [ expand, setExpand ] = useState(false)
  const [ value, setValue ] = useState(undefined)
  const [ showPrompt, SetShowPrompt ] = useState(false)

  const toggleExpand = () => {
    setExpand(!expand);
  }

  // const handleSubmit = () => {
  //   setStep1(value)
  // }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (value == undefined){
      console.log('please input a txhash');
      SetShowPrompt(true)
      return
    }
    else {
      // verify hash
      SetShowPrompt(false)
      setStep1(value);
    }
  }
  return(
    <>
      <div className={styles.resumeStep}>
        <p className={styles.resumeP} onClick={toggleExpand}>Resume With Tx Hash?</p>
        
        {
          expand
          ? 
          <> 
            <form onSubmit={handleSubmit}>
                <textarea rows={3} cols={70} name='input' placeholder='txHash'onChange={(e) => setValue(e.target.value)} ></textarea>
                {showPrompt ? <i className={styles.resumePrompt}>Please Input a TxHash</i> : <></>}
                <div className={styles.resumeBtns}>
                  <button type='button' onClick={toggleExpand} className={styles.resumeClose}>Close</button>
                  <button type='submit' value='submit' className={styles.resumeSubmit}>Submit</button>
                </div>
            </form>
          </>
          :
          <></>
        }
      </div>
    </>
  )
}

export const CardResumeReceive = ({setStep2}) => {
  const [ showPrompt, SetShowPrompt ] = useState(false);
  const [ value, setValue ]           = useState(undefined);
  const [ expand, setExpand ]         = useState(false);


  const toggleExpand = () => {
    setExpand(!expand);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (value == undefined){
      console.log('please input a Vaa');
      SetShowPrompt(true)
      return
    }
    else {
      // verify vaa
      SetShowPrompt(false)
      setStep2(value);
    }
  }

  return(
    <>
      <div className={styles.resumeStep}>
        <p className={styles.resumeP} onClick={toggleExpand}>Resume Step With VAA?</p>
        {
          expand
          ? 
          <> 
            <form onSubmit={handleSubmit}>
                <textarea rows={3} cols={70} name='input' placeholder='vaa'onChange={(e) => setValue(e.target.value)} ></textarea>
                {showPrompt ? <i className={styles.resumePrompt}>Please Input a TxHash</i> : <></>}
                <div className={styles.resumeBtns}>
                  <button type='button' onClick={toggleExpand} className={styles.resumeClose}>Close</button>
                  <button type='submit' value='submit' className={styles.resumeSubmit}>Submit</button>
                </div>
            </form>
          </>
          :
          <></>
        }
      </div>
    </>
  )
}