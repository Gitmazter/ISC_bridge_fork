import styles from '../../../styles/mystyle.module.css'


export default function CardData({value}) {
  //console.log(value);
  return(
     value 
     ?
      <p className={styles.cardData}>TxHash/VAA: <br/><br/> <a href=''>{value}</a></p>
     :
      <></>
     )
}