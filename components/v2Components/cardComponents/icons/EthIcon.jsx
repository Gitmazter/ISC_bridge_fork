import styles from '../../../../styles/mystyle.module.css'
const EthIcon = ({type}) => {
  switch (type) {
    case 'map':
      return (
        <img className={styles.mapIcon} src="./new/ETH.png" alt=""/>
      )
    case 'swap':
      return (
        <img className={styles.swapIcon} src="./new/ETH.png" alt=""/>
      )
  }
}

export default EthIcon