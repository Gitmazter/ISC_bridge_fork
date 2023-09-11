import { Inter } from "next/font/google"
import { NewApp } from "./components/apps/NewApp"

const inter = Inter({
  subsets: ['latin'],
  weight: '700',
})

const NewPage = () => {
  return(
    <main className={`${inter.className} font-sans`}>
      {/* <Header/> */}
      <NewApp/>
      {/* <Footer/> */}
    </main>
  )
}

export default NewPage