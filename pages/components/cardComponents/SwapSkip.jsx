import { useEffect, useState } from 'react'
import styles from '../../../styles/mystyle.module.css'

export const SwapSkip = ({enable, setCurrStep, step}) => {
  // console.log(setCurrStep);
  const [skip, setSkip] = useState(false);
  useEffect(() => {
    if (step == 0 && enable) {
      setSkip(true)
    }
    else if (step == 4) {
      setSkip(true)
    }
    else {setSkip(false)}
  },[enable])

  return (
    skip 
    ? <div className={styles.skip} onClick={() => setCurrStep('step0')}> You already have OIL! Want to proceed without swapping? </div>
    : <></>
  )
}