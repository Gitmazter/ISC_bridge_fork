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
import { useState } from 'react'
const inter = Inter({ subsets: ['latin'] })

export default function SwapCard({step, card_topic, data, loading, enable, click_handler}) {
  const [ maxAmount, setMaxAmount ] = useState({'ISC':'??', 'xOil':'??', 'eIsc':'??', 'Oil':'??'})

  let info
  if (step == "2" && data!=null) {
      info = data.vaaBytes
  } else if (step == "1" && data !=null && typeof(data)!='string') {
      info = data.transactionHash
  } else {
      info = data
  }

  const {amount} = useAmount()
  const currencies = card_topic.title
  const fromTo = card_topic.titlev2
//   console.log(fromTo);
  //const info = step == "2" && data!=null ? data.vaaBytes : data
  return <div className={inter.className}>
          <div className={styles.plan}>
              <div className={styles.inner}>
              <div className={styles.SwapTitle}>
                <CardTitle value={`Swap ${amount} ${currencies.from} to ${amount} ${currencies.to}`}/>
                <SwapCardMax max={{ maxAmount, setMaxAmount }} fromTo={ fromTo } currencies={ currencies } />
              </div>
              <CardSwapUi maxAmount={maxAmount} fromTo = {fromTo} />
              <CardParagraph value={card_topic.content}/>
              <hr className={styles.card_line}></hr>
              {loading && <Loading/>}
              <CardData value={info}/>
              <CardButton value="Swap" enable={enable} click_handler={click_handler}/>
              </div>
          </div>
      </div>
}


/* 
0x789733c6Cfd5EAa6c27bEAfD8bB7AF20aBe28500 xOIL
0x0000000000000000000000000000000000000000
'0xD13ebb5C39fB00C06122827E1cbD389930C9E0E3'ISC 
Swap.deploy('0x789733c6Cfd5EAa6c27bEAfD8bB7AF20aBe28500', '0xD13ebb5C39fB00C06122827E1cbD389930C9E0E3', {'from':a})
0x8914a9E5C5E234fDC3Ce9dc155ec19F43947ab59
ISCToken[0].mint('0x8914a9E5C5E234fDC3Ce9dc155ec19F43947ab59', 500000000, {'from':a})
*/