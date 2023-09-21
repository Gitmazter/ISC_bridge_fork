import { useEffect, useState } from 'react'
import styles from '../../../../../styles/mystyle.module.css'
const Step = ({step, currStep, setCurrStep}) => {

  const [status, setStatus] = useState("Alo");
  const [ellipse, setEllipse] = useState("./new/FilledEllipse.svg")

  useEffect(() => {
    console.log(currStep);
    if (currStep == step) {
      setStatus("In Progress")
      setEllipse("./new/FilledEllipse.svg");
    }
    else {
      if (currStep > step) {
        setStatus("Complete");
        setEllipse('./new/GreenEllipse.svg')
      } 
      else {
        setStatus("Pending");
        setEllipse('./new/Ellipse.svg')
      }
    }
  }, [currStep])

  return (
    <div className={styles.Step}>
      <div className={styles.Status}>
        <button type='button' className={styles.invisiButt} onClick={() => {setCurrStep(step)}}>
          <img src={ellipse}/>
        </button>
        <div className={styles.loadingbar}></div>
      </div>
      <div className={styles.StatusText}> 
        <p>Step {step}</p>
        <h2>{step == 2 ? "Bridge" : `Swap`}</h2>
        <p>{
          status
          }</p>
      </div>
    </div>
  )
}

export default Step