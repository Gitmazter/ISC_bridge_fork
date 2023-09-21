import styles from '../../../../styles/mystyle.module.css'

const BorderedArrow = ({type}) => {
  switch (type) {
    case 'map':
      return (
        <img className={styles.mapIcon} src="./new/ArrowInCircle.svg" alt=""/>
      )
    case 'swap':
      return (
        <img className={styles.swapIcon} src="./new/ArrowInCircle.svg" alt=""/>
      )
  }
}
export default BorderedArrow