import { useContext } from 'react';
import styles from '../../../../../styles/mystyle.module.css'
import WalletIcon from '../../icons/WalletIcon';
import BodyConfig from '../config/BodyConfig'
import { StepContext } from '../../../contexts/stepContext';

const InactiveInputTitle = () => {
  const { step } = useContext(StepContext)
  const direction = 'solToEth';

  const prompt = () => {
    return BodyConfig[`${direction}`].inactivePrompts[step-1]
  }

  return (
    <div className={styles.inputTitle}>
      <div>{prompt()}</div>
      <div className={styles.maxDisplay}>
        <WalletIcon/>
        <div>Max Amount Target</div>
      </div>
    </div>
  )
}

export default InactiveInputTitle