import styles from '../../../styles/mystyle.module.css'

export default function CardParagraph({value}) {
  return <p className={styles.info}>{value}</p>
}