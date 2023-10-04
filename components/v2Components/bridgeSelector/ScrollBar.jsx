import styles from '../../../styles/mystyle.module.css';

export const ScrollBar = ({chaindata}) => {

  const handleDrag = (event) => {
    console.log(event);
  } 


  return (
    <div className={styles.scrollBar} id={`${chaindata.name}Scroll`}>
      <div id={`${chaindata.name}Bar`} draggable onDrag={handleDrag} />
    </div>
  )
}