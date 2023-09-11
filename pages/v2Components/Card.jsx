import styles from '../../styles/mystyle.module.css'
import CardTitle from './cardComponents/CardTitle'
import CardBody from './cardComponents/CardBody'
import CardMap from './cardComponents/CardMap'

export const Card = ({step, currStep}) => {
  return (
    <div className={styles.v2Card}>                {/* Frame */}
      <CardTitle step={step} currStep={currStep}/> {/* Title with step and currStep ellipse*/}
      <CardMap step={step}/>                       {/* Map with current */}
      <CardBody/>                                  {/* Body With Swap Card */}
    </div>
  )
}