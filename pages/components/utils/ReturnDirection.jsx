import styles from '../../../styles/mystyle.module.css'
import useBrideDirection from '../hooks/useBrideDirection'

export const ReturnDirection = () => {

  const { setDirection } = useBrideDirection()
  const handleReturn = () => {
    setDirection(null)
  }

  return (<>
    <div className={styles.returnDirection} onClick={handleReturn}><img className={styles.returnDirectionIcon} src='./return.svg' alt='return'/><p>Return To Bridge Selection</p></div>
  </>)
}