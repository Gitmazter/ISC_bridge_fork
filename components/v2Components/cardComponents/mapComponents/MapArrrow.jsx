import styles from '../../../../styles/mystyle.module.css';

const MapArrow = ({direction}) => {
  const classNames = `MapArrow turn${direction}`

  switch (direction) {
    case 0:
      return (
        <img className={`${styles.MapArrow} ${styles.turn0}`} src='./new/arrow.png' alt='arrow'/>
      )
    case 90:
      return (
        <img className={`${styles.MapArrow} ${styles.turn90}`} src='./new/arrow.png' alt='arrow'/>
      )
    case 180:
      return (
        <img className={`${styles.MapArrow} ${styles.turn180}`} src='./new/arrow.png' alt='arrow'/>
      )
    case 270:
      return (
        <img className={`${styles.MapArrow} ${styles.turn270}`} src='./new/arrow.png' alt='arrow'/>
      )
    default:
      return (
        <img className={`${styles.MapArrow} ${styles.turn0}`} src='./new/arrow.png' alt='arrow'/>
      )
  }


}
export default MapArrow