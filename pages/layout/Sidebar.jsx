import styles from '../../styles/mystyle.module.css'

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <p>HOME</p>
      <p>DASH</p>
      <p>RESERVE</p>
      <p>BRIDGE</p>
    </div>
  )
}