import styles from '../../../styles/mystyle.module.css'

export const Nav = () => {



  return (
    <div className={styles.nav}>
      <a href="/#">Home</a>
      <a href="/#">Dashboard</a>
      <a href="/#">Reserve</a>
      <a href="/#" id='activeNav'>Bridge</a>
      <a href="/#">Contact</a>
      <a href="/#">Buy & Sell ISC</a>
      <a href="/#">Borrow & Lend ISC</a>
    </div>
  )

}