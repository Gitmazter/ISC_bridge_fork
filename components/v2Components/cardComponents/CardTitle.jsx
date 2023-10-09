import Ellipse from './titleComponents/Ellipses'
import TitleHeading from './titleComponents/TitleHeading';
import styles from '../../../styles/mystyle.module.css'
import StepContext from '../contexts/stepContext';
import { useContext } from 'react';
import { Resume } from './titleComponents/Resume';

const CardTitle = () => {
  const {step, currStep} = useContext(StepContext)

  return (
    <div className={styles.CardTitle}>
      {step == currStep ? <Ellipse filled={true}/> : <Ellipse filled={false}/>}
      <TitleHeading/>
      {
        step == 2 ? <Resume/> : <></>
      } 
    </div>
  )
}

export default CardTitle