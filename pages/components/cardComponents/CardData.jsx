import styles from '../../../styles/mystyle.module.css'


export default function CardData({value}) {
  return <p className={styles.data}>{value}</p>
}