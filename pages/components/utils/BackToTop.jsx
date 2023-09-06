import styles from '../../../styles/mystyle.module.css'

export const BackToTop = () => {

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  }

  return (
    <img className={styles.BackToTop} onClick={handleScroll} src='./arrowUp.svg'/>
  )
}