import styles from '../../styles/mystyle.module.css'
import Loading from "./Loading"
import CardButton from "./cardComponents/CardButton"
import CardData from "./cardComponents/CardData"
import CardParagraph from "./cardComponents/CardParagraph"
import { CardSwapUi } from './cardComponents/CardSwapUi'
import CardTitle from "./cardComponents/CardTitle"
import { Inter } from 'next/font/google'
import { SwapCardMax } from './cardComponents/SwapCardMax'
import { useEffect, useState } from 'react'
import { Progressbar } from './cardComponents/Progressbar'
import useBalance from './hooks/useBalance'
import { CardSkip, SwapSkip } from './cardComponents/SwapSkip'
import useBrideDirection from './hooks/useBrideDirection'
import useMaxAmounts from './hooks/useMaxAmounts'
const inter = Inter({ subsets: ['latin'] })

export default function SwapCard({step, card_topic, data, loading, enable, click_handler, waiting, setCurrStep}) {
  const { maxAmount } = useMaxAmounts()
  const [ skipAvailable, setSkipAvailable ] = useState(false)
  const [ fromTo, setFromTo ] = useState(null)

  const {balance} = useBalance();
  const {direction} = useBrideDirection()
  let info
  if (step == "2" && data!=null) {
      info = data.vaaBytes
  } else if (step == "1" && data !=null && typeof(data)!='string') {
      info = data.transactionHash
  } else {
      info = data
  }

  useEffect(() => {
    if (balance[0]) {
        if (step == 0 && direction == 'sol_to_eth' && enable) {
            if (balance[1].solana > 0) {
                setSkipAvailable(true)
            }
        }
        else if (step == 0 && direction == 'eth_to_sol' && enable) {
            if (balance[1].ethereum > 0) {
                setSkipAvailable(true)
            }
        }
        else if (step == 4 && direction == 'sol_to_eth') {
            if (balance[1].ethereum > 0) {
                setSkipAvailable(true)
            }
        }
        else if (step == 4 && direction  == 'eth_to_sol') {
            if (balance[1].solana > 0) {
                setSkipAvailable(true)
            }
        }
        else {
            setSkipAvailable(false)
        }
    }
  },[balance, direction, enable])

  useEffect(() => {
    card_topic.titlev2 ? setFromTo(card_topic.titlev2) : setFromTo(null)
  }, [card_topic])

  return (
        <div className={ inter.className }>
            <div className={ styles.plan }>
                <div className={ styles.inner }>
                    <CardTitle value={ card_topic.title }/>
                    <div className={ styles.SwapTitle }>
                        <CardParagraph value={ card_topic.content }/> 
                        <SwapCardMax fromTo={ card_topic.titlev2 }/>
                    </div>
                    <CardSwapUi maxAmount={ maxAmount } fromTo={ card_topic.titlev2 } />
                    <hr className={styles.card_line}></hr>
                    {loading && <Progressbar isRunning={ loading } averageTimeMilliSeconds={ 3000 }/>}
                    {skipAvailable 
                    ? <SwapSkip enable={ enable } skipAvailable={ skipAvailable } setCurrStep={ setCurrStep } step={ step }/>
                    : <></>}
                    <CardButton value="Swap" enable={ enable } click_handler={ click_handler } waiting={ waiting }/>
                    <CardData value={ info }/>
                </div>
            </div>
        </div>
    )
}
