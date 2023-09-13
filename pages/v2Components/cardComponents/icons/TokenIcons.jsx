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

const SolIcon = ({type}) => {
  switch (type) {
    case 'map':
      return (
        <img className={styles.mapIcon} src="./new/SOL.png" alt=""/>
      )
    case 'swap':
      return (
        <img className={styles.swapIcon} src="./new/SOL.png" alt=""/>
      )
  }
}

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


export {
  EthIcon, 
  SolIcon, 
  EthIscIcon, 
  IscIcon
}