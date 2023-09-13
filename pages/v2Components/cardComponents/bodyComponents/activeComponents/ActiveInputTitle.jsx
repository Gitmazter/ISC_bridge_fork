import styles from '../../../../../styles/mystyle.module.css'
import WalletIcon from '../../icons/WalletIcon'
import BodyConfig from '../config/BodyConfig'
import { useContext, useEffect } from 'react'
import { AmountContext } from '../../../contexts/amountContext'
import { StepContext } from '../../../contexts/stepContext'

const ActiveInputTitle = () => {
  const {step} = useContext(StepContext)

  const direction = 'solToEth'
  const prompt = () => {
    return BodyConfig[`${direction}`].activePrompts[step-1]
  }
  return (
    <div className={styles.inputTitle}>
      <div>{prompt()}</div>

      {/* BreakOut */}
      <div className={styles.maxDisplay}>
        <WalletIcon/>
        <div>Max Amount Source</div>
        <button>Max</button>
      </div>

    </div>
  )
}

export default ActiveInputTitle