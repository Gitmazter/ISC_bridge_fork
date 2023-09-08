import styles from '../../styles/mystyle.module.css'
import Loading from "./Loading"
import CardButton from "./cardComponents/CardButton"
import CardData from "./cardComponents/CardData"
import CardParagraph from "./cardComponents/CardParagraph"
import CardTitle from "./cardComponents/CardTitle"
import { Inter } from 'next/font/google'
import { Progressbar } from './cardComponents/Progressbar'
import { CardResume, CardResumeReceive } from './cardComponents/CardResume'
const inter = Inter({ subsets: ['latin'] })


export default function Card({step, card_topic, data, loading, enable, click_handler, waiting,  my_application, setStep2}) {
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
              <hr className={styles.card_line}></hr>
              {loading && <Progressbar isRunning={loading} averageTimeMilliSeconds={5000}/>}
              {
                info 
                ? <></>
                : <CardResumeReceive my_application={my_application} setStep2={setStep2}/>
              }
              <CardButton value="Initiate" enable={enable} click_handler={click_handler} waiting={waiting}/>
              <CardData value={info}  />
              </div>
          </div>
      </div>
}