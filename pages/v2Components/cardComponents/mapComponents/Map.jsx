import styles from '../../../../styles/mystyle.module.css'
import MapArrow from './MapArrrow'
import MapTokenCard from './MapTokenCard'

const Map = ({step}) => {

  const activeSteps = [false,false,false,false].map((state, index) => {
    if (index == step -1  || index == step) {
      return true
    }
    else {
      return false
    }
  })

  const opacity = (index) => {
    return activeSteps[index] ? styles.opacity1:styles.opacity02
  }
  const arrowOpacity = (index) => {
    return step == index ? styles.opacity1:styles.opacity02
  }

  return (
    <div className={styles.Map}>
      <div className={styles.mapCards}> {/* left */}
        <div className={opacity(0)     }><MapTokenCard index={1}/></div>
        <div className={arrowOpacity(1)}><MapArrow direction={0}/></div>
        <div className={opacity(1)     }><MapTokenCard index={2}/></div>
      </div>
      <div className={styles.mapCentre}> {/* center */}
        <div className={arrowOpacity(2)}><MapArrow direction={270}/></div>
      </div>
      <div className={styles.mapCards}> {/* right */}
        <div className={opacity(3)     }><MapTokenCard index={4}/></div>
        <div className={arrowOpacity(3)}><MapArrow direction={180}/></div>
        <div className={opacity(2)     }><MapTokenCard index={3}/></div>
      </div>
    </div>
  )
}

export default Map