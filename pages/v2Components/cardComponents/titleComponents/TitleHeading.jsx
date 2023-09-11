import styles from '../../../../styles/mystyle.module.css'

const TitleHeading = ({step}) => {
  
  return(
    <>
      <h2 className={styles.TitleHeading}>Step {step}   <span className={styles.greyText}>out of 3</span> </h2>
    </>
  )
}

export default TitleHeading