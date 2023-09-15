import { Inter } from "next/font/google"
import BridgeApp from "../components/v2Components/app/App"
import styles from "../styles/mystyle.module.css"
import { useState } from "react"
import BalanceContext from "../components/v2Components/contexts/balanceContext"
import MaxAmountContext from "../components/v2Components/contexts/maxAmountContext"
import DirectionContext from "../components/v2Components/contexts/directionContext"
import SolanaContextProvider from "../components/v2Components/app/web3/solConnect"
import Header from '../components/layout/Header'
import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
import Loading from "../components/v2Components/Loading"
import ApplicationContext from "../components/v2Components/contexts/applicationContext"
const inter = Inter({
  subsets: ['latin'],
  weight: '700',
})

 
export async function getStaticProps() {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()
  return { props: { repo } }
}

const App = () => {
  const [ maxAmounts, setMaxAmounts ] = useState([<Loading/>, <Loading/>, <Loading/>, <Loading/>]);
  const [ balance, setBalance ] = useState();
  const [ direction, setDirection ] = useState('solToEth');
  const [ application, setApplication] = useState()

  const saveApplication = (app) => {
    setApplication(app)
  }

  const saveDirection = (dir) => {
    setDirection(dir)
  }

  const saveBalance = (balances) => {
    setBalance(balances)
  }

  const saveMaxAmounts = (val) => {
    setMaxAmounts(val)
  }

  const getLibrary = (provider) => {
    return new Web3Provider(provider)
  }

  return(
    <Web3ReactProvider getLibrary={getLibrary}>
      <SolanaContextProvider>
        <DirectionContext.Provider value={{direction, saveDirection}}>
          <BalanceContext.Provider value={{balance, saveBalance}}>
            <MaxAmountContext.Provider value = {{maxAmounts, saveMaxAmounts}}>
              <ApplicationContext.Provider value={{application, saveApplication}}>
                
              <main className={inter.className}>
                <Header/>
                <div className={styles.body}>
                  <BridgeApp/>
                </div>
              </main>

              </ApplicationContext.Provider>
            </MaxAmountContext.Provider>
          </BalanceContext.Provider>
        </DirectionContext.Provider>
      </SolanaContextProvider>
    </Web3ReactProvider>
  )
}

export default App