import HomePage from "./homePage";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import styles from '../styles/mystyle.module.css'

import { SolanaContextProvider } from './components/hooks/SolContextProvider'

export default function App () {

  return (
          <SolanaContextProvider>
            <div className={styles.App}>
              <Header/>
              <HomePage/>
              <Footer/>
            </div>
          </SolanaContextProvider>
  )
}