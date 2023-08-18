import HomePage from "./layout/homePage";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import styles from '../styles/mystyle.module.css'

import { SolanaContextProvider } from './components/hooks/SolContextProvider'
import { ConnectionInfoContextProvider } from "./components/contexts/ConnectionInfo";


export default function App () {

  return (
    <ConnectionInfoContextProvider>
      <SolanaContextProvider>
        <div className={styles.App}>
          <Header/>
          <HomePage/>
          <Footer/>
        </div>
      </SolanaContextProvider>
    </ConnectionInfoContextProvider>

  )
}