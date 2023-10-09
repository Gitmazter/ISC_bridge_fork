import StepContext from './contexts/stepContext'
import styles from '../../styles/mystyle.module.css'
import CardTitle from './cardComponents/CardTitle'
import CardBody from './cardComponents/CardBody'
import CardMap from './cardComponents/CardMap'
import { useState } from 'react'
import AmountContext from './contexts/amountContext'
import ResumeDataContext from './contexts/ResumeDataContext'

const Card = ({step, currStep, setCurrStep}) => {
  const [ amount, setAmount ] = useState(0.00);
  const [ resumeData, setResumeData ] = useState();

  const saveResumeData = (value) => {
    setResumeData(value);
  }

  const saveAmount = (value) => {
    setAmount(value)
  }

  return ( 
    <StepContext.Provider value={{step, currStep, setCurrStep}}>
      <AmountContext.Provider value={{amount, saveAmount}}>
        <ResumeDataContext.Provider value={{resumeData, saveResumeData}}>

          <div className={styles.v2Card}>         
            <CardTitle/>
            <CardMap/>
            <CardBody/>                              
          </div>
          
        </ResumeDataContext.Provider>
      </AmountContext.Provider>
    </StepContext.Provider>
  )
}

export default Card