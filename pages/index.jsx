import { Inter } from "next/font/google"
import BridgeApp from "./v2Components/app/App"
import styles from "../styles/mystyle.module.css"
import { useState } from "react"
import { BalanceContext } from "./v2Components/contexts/balanceContext"
import { MaxAmountContext } from "./v2Components/contexts/maxAmountContext"
import { DirectionContext } from "./v2Components/contexts/directionContext"
import { SolanaContextProvider } from "./v2Components/app/web3/solConnect"
import Header from './layout/Header'
import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
const inter = Inter({
  subsets: ['latin'],
  weight: '700',
})

const App = () => {
  const [ maxAmounts, setMaxAmounts ] = useState();
  const [ balance, setBalance ] = useState();
  const [ direction, setDirection ] = useState('solToEth');

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
              <main className={inter.className}>
                <Header/>
                <div className={styles.body}>
                  <BridgeApp/>
                </div>
              </main>
            </MaxAmountContext.Provider>
          </BalanceContext.Provider>
        </DirectionContext.Provider>
      </SolanaContextProvider>
    </Web3ReactProvider>
  )
}

export default App