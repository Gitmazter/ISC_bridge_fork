import styles from '../../styles/mystyle.module.css'
import Loading from "./Loading"
import CardButton from "./cardComponents/CardButton"
import CardData from "./cardComponents/CardData"
import CardParagraph from "./cardComponents/CardParagraph"
import CardTitle from "./cardComponents/CardTitle"
import { Inter } from 'next/font/google'
import { Progressbar } from './cardComponents/Progressbar'
import { CardSkip } from './cardComponents/SwapSkip'
import { CardResume, CardResumeSend } from './cardComponents/CardResume'
import { CardSendUi } from './cardComponents/CardSendUi'
import { SwapCardMax } from './cardComponents/SwapCardMax'
import { useEffect, useState } from 'react'
import useBrideDirection from './hooks/useBrideDirection'
const inter = Inter({ subsets: ['latin'] })


export default function SendCard({step, card_topic, txid, vaa, loading, enable, click_handler, waiting, my_application ,setCurrStep, setStep1, setStep2, curr_step}) {
  vaa != undefined ? vaa = vaa.vaaBytes : vaa = vaa; 
  const [ maxAmount, setMaxAmount ] = useState({'ISC':<Loading/>, 'xOil':<Loading/>, 'eIsc':<Loading/>, 'Oil':<Loading/>})
return <div className={inter.className}>
          <div className={styles.plan}>
              <div className={styles.inner}>
                <CardTitle value={card_topic.title}/>
                <CardParagraph value={card_topic.content}/>
                <SwapCardMax max={{ maxAmount, setMaxAmount }} fromTo={ fromTo } currencies={ currencies } />
                <div className={styles.sendInput}>
                  <CardSendUi />
                </div>
                <hr className={styles.card_line}></hr>
                <CardButton value="Initiate" enable={enable} click_handler={click_handler} waiting={waiting}/>
                {
                  txid 
                  ? <CardData value={txid} type={'txid'} /> 
                  : <CardResumeSend my_application={my_application} setCurrStep={setCurrStep} setStep1={setStep1} setStep2={setStep2} click_handler={click_handler} curr_step={curr_step}/>/* Input Field With State Skip Button OK*/
                }
                {vaa ? <CardData value={vaa} type={'vaa'} /> : <></>}
                {loading  && <Progressbar isRunning={loading} averageTimeMilliSeconds={20000}/>}
              </div>
          </div>
      </div>
}


