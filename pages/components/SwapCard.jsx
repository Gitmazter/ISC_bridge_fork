import styles from '../../styles/mystyle.module.css'
import Loading from "./Loading"
import CardButton from "./cardComponents/CardButton"
import CardData from "./cardComponents/CardData"
import CardParagraph from "./cardComponents/CardParagraph"
import { CardSwapUi } from './cardComponents/CardSwapUi'
import CardTitle from "./cardComponents/CardTitle"
import { Inter } from 'next/font/google'
import { SwapCardMax } from './cardComponents/SwapCardMax'
import useAmount from './hooks/useAmount'
import { useEffect, useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function SwapCard({step, card_topic, data, loading, enable, click_handler}) {
  const [ maxAmount, setMaxAmount ] = useState({'ISC':<Loading/>, 'xOil':<Loading/>, 'eIsc':<Loading/>, 'Oil':<Loading/>})

  let info
  if (step == "2" && data!=null) {
      info = data.vaaBytes
  } else if (step == "1" && data !=null && typeof(data)!='string') {
      info = data.transactionHash
  } else {
      info = data
  }

  const currencies = card_topic.title
  const fromTo = card_topic.titlev2


  return <div className={inter.className}>
          <div className={styles.plan}>
              <div className={styles.inner}>
              <CardTitle value={card_topic.title}/>
              <div className={styles.SwapTitle}>
                <CardParagraph value={card_topic.content}/> 
                <SwapCardMax max={{ maxAmount, setMaxAmount }} fromTo={ fromTo } currencies={ currencies } />
              </div>
              <CardSwapUi maxAmount={maxAmount} fromTo = {fromTo} />
              <hr className={styles.card_line}></hr>
              {loading && <Loading/>}
              <CardData value={info}/>
              <CardButton value="Swap" enable={enable} click_handler={click_handler}/>
              </div>
          </div>
      </div>
}
