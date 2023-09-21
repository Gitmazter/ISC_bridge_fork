import styles from '../../../styles/mystyle.module.css'
import MapInfo from './mapComponents/MapInfo'
import Map from './mapComponents/Map'

const CardMap = () => {

  return (
    <div className={styles.CardMap}>
      <div className={styles.mapInner}>
        <Map/>
        <MapInfo/>
      </div>
    </div>
  )
}

export default CardMap