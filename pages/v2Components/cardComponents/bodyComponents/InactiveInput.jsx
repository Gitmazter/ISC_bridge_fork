import styles from '../../../../styles/mystyle.module.css'
import TokenCard from './utils/TokenCard'
import InactiveInputTitle from "./inactiveComponents/InactiveInputTitle"
import InactiveSwapInput from './inactiveComponents/InactiveSwapInput'

const InactiveInput = () => {
  return (
    <>
      <div className={styles.InactiveInputTitle}>
        <InactiveInputTitle/>
      </div>
      <div className={styles.InactiveInput}>
        <div className={styles.inputField}>
          <TokenCard active={false}/>
          <InactiveSwapInput/>
        </div>
      </div>
    </>
  )
}

export default InactiveInput