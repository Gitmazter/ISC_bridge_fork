import { Ellipse, EllipseFilled } from './titleComponents/Ellipses'
import TitleHeading from './titleComponents/TitleHeading';
import styles from '../../../styles/mystyle.module.css'
import { StepContext } from '../contexts/stepContext';
import { useContext } from 'react';

const CardTitle = () => {
  const {step, currStep} = useContext(StepContext)

  return (
    <div className={styles.CardTitle}>
      {step == currStep ? <EllipseFilled/> : <Ellipse/>}
      <TitleHeading/>
    </div>
  )
}

export default CardTitle