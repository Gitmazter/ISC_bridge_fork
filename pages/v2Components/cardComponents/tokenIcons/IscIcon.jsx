import styles from '../../../../styles/mystyle.module.css'
const IscIcon = ({type}) => {
  switch (type) {
    case 'map':
      return (
        <img className={styles.mapIcon} src="./new/ISC.png" alt=""/>
      )
    case 'swap':
      return (
        <img className={styles.swapIcon} src="./new/ISC.png" alt=""/>
      )
  }
}

export default IscIcon