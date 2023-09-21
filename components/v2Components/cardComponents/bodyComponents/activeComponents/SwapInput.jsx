import styles from '../../../../../styles/mystyle.module.css'
import { useContext, useEffect } from 'react'
import AmountContext from '../../../contexts/amountContext'


const SwapInput = () => {
  const {amount, saveAmount} = useContext(AmountContext)
  useEffect(() => {console.log(amount)},[amount])

  const handleChange = (e) => {
    saveAmount(e.target.value)
  }

  return (
    <input placeholder='0.00' onChange={handleChange}/>
  )
}

export default SwapInput