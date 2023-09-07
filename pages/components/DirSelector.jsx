import { useEffect } from "react"
import useBrideDirection from "./hooks/useBrideDirection"
import styles from '../../styles/mystyle.module.css'
export const DirSelector = () => {

  const { direction, setDirection } = useBrideDirection()

  const setSol2Eth = () => {
    setTimeout(()=> {
      setDirection('sol_to_eth')
    }, 100)
  }

  const setEth2Sol = () => {
    setTimeout(()=> {
      setDirection('eth_to_sol')
    }, 100)
  }

  useEffect(() => {console.log(direction);}, [direction])

  return (
    <div className={styles.requestDirection}>
      <div className={styles.innerRequestDirection}>
        <h2>Select Direction</h2>
        <div className={styles.DirSelectorIcons}>
          <img src="./solana.svg"/>
          <p>⇔</p>
          <img src="./ethereum.svg"/>
        </div>
        <button onClick={setSol2Eth}>{"SOLANA -> ETHEREUM"}</button>
        <button onClick={setEth2Sol}>{"ETHEREUM -> SOLANA"}</button>
      </div>
    </div>
  )
}