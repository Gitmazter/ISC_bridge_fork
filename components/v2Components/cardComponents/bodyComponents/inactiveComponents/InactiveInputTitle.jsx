import { useContext } from 'react';
import styles from '../../../../../styles/mystyle.module.css'
import WalletIcon from '../../icons/WalletIcon';
import BodyConfig from '../../../../../config/BodyConfig'
import StepContext from '../../../contexts/stepContext';
import BalanceContext from '../../../contexts/balanceContext';
import MaxAmountContext from '../../../contexts/maxAmountContext';
import DirectionContext from '../../../contexts/directionContext';

const InactiveInputTitle = () => {
  const { step } = useContext(StepContext)
  const {direction} = useContext(DirectionContext);
  const { balance } = useContext(BalanceContext)
  const { maxAmounts } = useContext(MaxAmountContext)

  const prompt = () => {
    return BodyConfig[`${direction}`].inactivePrompts[step-1]
  }

  return (
    <div className={styles.inputTitle}>
      <div>{prompt()}</div>
      <div className={styles.maxDisplay}>
        <WalletIcon/>
        <div>{maxAmounts[step] + " " + BodyConfig[`${direction}`].tokenNames[step]}</div>
      </div>
    </div>
  )
}

export default InactiveInputTitle