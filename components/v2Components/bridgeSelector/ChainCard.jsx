// This will be each item in Dropdown Menu
import styles from '../../../styles/mystyle.module.css';

export const  ChainCard = ({chaindata}) => {
  // console.log(chaindata);
  return (
    <option className={styles.chainCard}>
      <div className={styles.chain}>
        <img src={chaindata.imgUrl}/>
        <span>{chaindata.name}</span>
      </div>
    </option>
  )
}