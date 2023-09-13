import styles from '../../../../styles/mystyle.module.css'
import ActiveInputTitle from './activeComponents/ActiveInputTitle'
import SwapInput from './activeComponents/SwapInput'
import TokenCard from './utils/TokenCard'

const ActiveInput = () => {
  return (
    <>
      <div className={styles.activeInputTitle}>
        <ActiveInputTitle/>
      </div>
      <div className={styles.ActiveInput}>
        <div className={styles.inputField}>
          <TokenCard active={true} />
          <SwapInput />
        </div>
      </div>
    </>
  )
}

export default ActiveInput