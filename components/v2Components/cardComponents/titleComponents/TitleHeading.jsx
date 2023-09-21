import styles from '../../../../styles/mystyle.module.css'
import StepContext from '../../contexts/stepContext'
import { useContext } from 'react'

const TitleHeading = () => {
  const {step} = useContext(StepContext);

  return(
    <h2 className={styles.TitleHeading}>{"Step " + step + " "} <span className={styles.greyText}>{"out of 3"}</span> </h2>
  );
}

export default TitleHeading