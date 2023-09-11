import { useState } from 'react'
import styles from '../../../styles/mystyle.module.css'
import { Card } from '../Card'



const BridgeApp = () => {
  const [currStep, setCurrStep] = useState(1)
  const steps = [1,2,3]

  const html = steps.map(( step ) => {  return <Card step={step} currStep={currStep}/>  })


  return ( <>
    {/* Temporary buttons */}
            <button onClick={() => {currStep - 1 > 0 ? setCurrStep(currStep-1) : console.log()}}>Step Up</button>
            <button onClick={() => {currStep + 1 < 4 ? setCurrStep(currStep+1) : console.log()}}>Step Down</button>
    <div className={styles.v2App}>
      {html}
    </div>
    </>
  )
}

export default BridgeApp