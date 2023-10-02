import styles from '../../../styles/mystyle.module.css';

export const ScrollBar = ({chaindata}) => {

  


  return (
    <div className={styles.scrollBar} id={`${chaindata.name}Scroll`}>
      <div id={`${chaindata.name}Bar`}>

      </div>
    </div>
  )
}