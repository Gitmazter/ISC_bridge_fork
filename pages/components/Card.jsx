import styles from '../../styles/mystyle.module.css'
import Loading from "./Loading"
import CardButton from "./cardComponents/CardButton"
import CardData from "./cardComponents/CardData"
import CardParagraph from "./cardComponents/CardParagraph"
import CardTitle from "./cardComponents/CardTitle"
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })


export default function Card({step, card_topic, data, loading, enable, click_handler}) {
  let info
  if (step == "2" && data!=null) {
      info = data.vaaBytes
  } else if (step == "1" && data !=null && typeof(data)!='string') {
      info = data.transactionHash
  } else {
      info = data
  }
  //const info = step == "2" && data!=null ? data.vaaBytes : data
  return <div className={inter.className}>
          <div className={styles.plan}>
              <div className={styles.inner}>
              <CardTitle value={card_topic.title}/>
              <CardParagraph value={card_topic.content}/>
              {loading && <Loading/>}
              <CardData value={info}/>
              <CardButton value="Initiate" enable={enable} click_handler={click_handler}/>
              </div>
          </div>
      </div>
}