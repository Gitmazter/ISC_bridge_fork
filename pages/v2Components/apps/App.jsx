import styles from '../../../styles/mystyle.module.css'
import { Card } from '../Card'

const BridgeApp = () => {
  const steps = [1,2,3]
  const html = steps.map((step) => {
    return(
      <Card step={step}/>
    )
  })


  return (
    <div className={styles.v2App}>
      {html}
    </div>
  )
}

export default BridgeApp