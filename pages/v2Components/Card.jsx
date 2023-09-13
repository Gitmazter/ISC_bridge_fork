import { AmountContext } from './contexts/amountContext'
import { StepContext } from './contexts/stepContext'
import styles from '../../styles/mystyle.module.css'
import CardTitle from './cardComponents/CardTitle'
import CardBody from './cardComponents/CardBody'
import CardMap from './cardComponents/CardMap'
import { useState } from 'react'

export const Card = ({step, currStep}) => {
  const [amount, setAmount] = useState(0.00);

  const saveAmount = (value) => {
    setAmount(value)
  }

  return ( 
    <StepContext.Provider value={{step, currStep}}>
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