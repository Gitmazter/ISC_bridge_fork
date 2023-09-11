import { Inter } from "next/font/google"
import BridgeApp from "./v2Components/apps/App"

const inter = Inter({
  subsets: ['latin'],
  weight: '700',
})

const App = () => {
  return(
    <main className={inter.className}>
      {/* <Header/> */}
      <BridgeApp/>
      {/* <Footer/> */}
    </main>
  )
}

export default App