import { Inter } from "next/font/google"
import BridgeApp from "./v2Components/apps/App"
import styles from '../styles/mystyle.module.css'
const inter = Inter({
  subsets: ['latin'],
  weight: '700',
})

const App = () => {
  return(
    <main className={inter.className}>
      {/* <Header/> */}
      <div className={styles.body}>
        <BridgeApp/>
      </div>
      {/* <Footer/> */}
    </main>
  )
}

export default App