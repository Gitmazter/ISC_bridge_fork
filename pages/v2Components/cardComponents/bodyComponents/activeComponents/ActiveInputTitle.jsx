import styles from '../../../../../styles/mystyle.module.css'
import WalletIcon from '../../icons/WalletIcon'
import BodyConfig from '../config/BodyConfig'
import { useContext, useEffect } from 'react'
import { AmountContext } from '../../../contexts/amountContext'
import { StepContext } from '../../../contexts/stepContext'
import { BalanceContext } from '../../../contexts/balanceContext'
import { MaxAmountContext } from '../../../contexts/maxAmountContext'

const ActiveInputTitle = () => {
  const {step} = useContext(StepContext)
  const { balance } = useContext(BalanceContext)
  const { maxAmounts } = useContext(MaxAmountContext)

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
        <div>{maxAmounts[step-1] + " " + BodyConfig[`${direction}`].tokenNames[step-1]}</div>
        <button>Max</button>
      </div>

    </div>
  )
}

export default ActiveInputTitle