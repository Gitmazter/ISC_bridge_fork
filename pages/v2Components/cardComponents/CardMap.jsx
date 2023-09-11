import styles from '../../../styles/mystyle.module.css'
import Map from './mapComponents/Map'
import MapInfo from './mapComponents/MapInfo'

const CardMap = ({step}) => {

  return (
    <div className={styles.CardMap}>
      <div className={styles.mapInner}>
        <Map step={step}/>
        <MapInfo step={step}/>
      </div>
    </div>
  )
}

export default CardMap