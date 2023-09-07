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
import { IscIcon } from './utils/IconImgs'
import { Progressbar } from './cardComponents/Progressbar'
const inter = Inter({ subsets: ['latin'] })

export default function SwapCard({step, card_topic, data, loading, enable, click_handler, waiting}) {
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
                    {loading && <Progressbar isRunning={loading} averageTimeMilliSeconds={3000}/>}
                    <CardButton value="Swap" enable={enable} click_handler={click_handler} waiting={waiting}/>
                    <CardData value={info}/>
                </div>
          </div>
      </div>
}


/* 
xoil '0x789733c6Cfd5EAa6c27bEAfD8bB7AF20aBe28500'
ISCToken Contract '0xD13ebb5C39fB00C06122827E1cbD389930C9E0E3'
Swap.deploy('0x789733c6Cfd5EAa6c27bEAfD8bB7AF20aBe28500', '0xD13ebb5C39fB00C06122827E1cbD389930C9E0E3', {'from':a})
<Swap Contract '0x8914a9E5C5E234fDC3Ce9dc155ec19F43947ab59'>
ISCToken[0].mint('0x8914a9E5C5E234fDC3Ce9dc155ec19F43947ab59', 500000000, {'from':a})

*/