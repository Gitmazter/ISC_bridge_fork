import StepContext from './contexts/stepContext'
import styles from '../../styles/mystyle.module.css'
import CardTitle from './cardComponents/CardTitle'
import CardBody from './cardComponents/CardBody'
import CardMap from './cardComponents/CardMap'
import { useEffect, useState } from 'react'
import AmountContext from './contexts/amountContext'

const Card = ({step, currStep, setCurrStep}) => {
  const [amount, setAmount] = useState(0.00);

  const saveAmount = (value) => {
    setAmount(value)
  }

  useEffect(() => {
    const card = document.getElementById(`Card${step}`);
    console.log(card);
    if (currStep == step){
      card.style.display = "flex";
    }
    else {
      card.style.display = "none";
    }
  }, [currStep])

  return ( 
    <StepContext.Provider value={{step, currStep, setCurrStep}}>
      <AmountContext.Provider value={{amount, saveAmount}}>

        <div id={`Card${step}`} className={styles.v2Card}>         
          <CardTitle/>
          <CardMap/>
          <CardBody/>                              
        </div>
        
      </AmountContext.Provider>
    </StepContext.Provider>
  )
}

export default Card