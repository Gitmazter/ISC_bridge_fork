import StepContext from './contexts/stepContext'
import styles from '../../styles/mystyle.module.css'
import CardTitle from './cardComponents/CardTitle'
import CardBody from './cardComponents/CardBody'
import CardMap from './cardComponents/CardMap'
import { useState } from 'react'
import AmountContext from './contexts/amountContext'

const Card = ({step, currStep, setCurrStep}) => {
  const [amount, setAmount] = useState(0.00);

  const saveAmount = (value) => {
    setAmount(value)
  }

  return ( 
    <StepContext.Provider value={{step, currStep, setCurrStep}}>
      <AmountContext.Provider value={{amount, saveAmount}}>

        <div className={styles.v2Card}>         
          <CardTitle/>
          <CardMap/>
          <CardBody/>                              
        </div>
        
      </AmountContext.Provider>
    </StepContext.Provider>
  )
}

export default Card