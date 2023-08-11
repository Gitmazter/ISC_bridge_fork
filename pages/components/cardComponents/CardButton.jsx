import styles from '../../../styles/mystyle.module.css'

export default function CardButton({value, enable, click_handler}) {
  return <div className={styles.action}>
          <a className={enable?styles.button:styles.button_disabled} onClick={click_handler} href="#"> {value} </a>
         </div>
}