import styles from '../../../styles/mystyle.module.css'

export default function CardTitle({value}) {
  return <p className={styles.title}>{value}</p>
}