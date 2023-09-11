import styles from '../../../../styles/mystyle.module.css'
const EthIscIcon = ({type}) => {
  switch (type) {
    case 'map':
      return (
        <img className={styles.mapIcon} src="./new/EthISC.png" alt=""/>
      )
    case 'swap':
      return (
        <img className={styles.swapIcon} src="./new/EthISC.png" alt=""/>
      )
  }
}

export default EthIscIcon