import styles from '../../../../styles/mystyle.module.css'

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

export default SolIcon