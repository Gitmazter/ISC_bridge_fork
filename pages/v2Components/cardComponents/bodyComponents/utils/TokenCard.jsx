import { useContext } from 'react';
import styles from '../../../../../styles/mystyle.module.css'
import BodyConfig from '../config/BodyConfig'
import { StepContext } from '../../../contexts/stepContext';

const TokenCard = ({active}) => {
  const {step} = useContext(StepContext)
  const direction = 'solToEth'; // To be context

  const tokenName = () => {
    if (active) {
      return BodyConfig[`${direction}`].tokenNames[step-1]
    }
    return BodyConfig[`${direction}`].tokenNames[step]
  }

  const tokenIcons = () => {
    if (active) {
      return BodyConfig[`${direction}`].tokenIcons[step-1]
    }
    return BodyConfig[`${direction}`].tokenIcons[step]
  }

  return (
    <div className={styles.v2TokenCard}>
      <div className={styles.iconsWrapper}>
        {tokenIcons()}
      </div>
      <p className={styles.tokenCardText}>{tokenName()}</p>
    </div>
  )
}

export default TokenCard