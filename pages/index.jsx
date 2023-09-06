import HomePage from "./layout/homePage";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import styles from '../styles/mystyle.module.css'

import { SolanaContextProvider } from './components/hooks/SolContextProvider'
import { ConnectionInfoContextProvider } from "./components/contexts/ConnectionInfo";
import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from "@web3-react/core";
import { useEffect } from "react";
import { AmountContextProvider } from "./components/contexts/AmountContext";
import { BalanceContextProvider } from "./components/contexts/BalanceContext";
import { Sidebar } from "./layout/Sidebar";
import { BridgeDirectionContextProvider } from "./components/contexts/BridgeDirectionContext";


export default function App () {
  const getLibrary = (provider) => {
    return new Web3Provider(provider)
  }
  
  useEffect(() => {
    document.querySelector("body").style.backgroundColor = '#060818';
    document.querySelector("body").style.margin = 0
  });


  return (
    <AmountContextProvider>
      <BridgeDirectionContextProvider>
        <BalanceContextProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <ConnectionInfoContextProvider>
              <SolanaContextProvider>
                <Sidebar/>
                <div className={styles.mainFg}>
                  <div className={styles.App}>
                    <Header/>
                    <HomePage/>
                    <Footer/>
                  </div>
                </div>
              </SolanaContextProvider>
            </ConnectionInfoContextProvider>
          </Web3ReactProvider>
        </BalanceContextProvider>
      </BridgeDirectionContextProvider>
    </AmountContextProvider>
  )
}