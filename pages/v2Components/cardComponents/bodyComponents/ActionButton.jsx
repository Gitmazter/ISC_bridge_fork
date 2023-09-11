import styles from '../../../../styles/mystyle.module.css'

const ActionButton = ({prompt}) => {
  return (  
   <button type='button' className={styles.ActionButton}>
    <p>{prompt}</p>
   </button>
  )
}

export default ActionButton