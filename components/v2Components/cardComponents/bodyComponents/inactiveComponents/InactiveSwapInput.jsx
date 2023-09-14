import { useContext, useEffect, useState } from 'react'
import AmountContext from '../../../contexts/amountContext'

const InactiveSwapInput = () => {
  const [val, setVal] = useState()

  const {amount} = useContext(AmountContext);

  useEffect(() => {
    setVal(amount)
  }, [amount])

  return (
    <>
      <input placeholder={'0.00'} value={val? val : undefined}/>
    </>
  )
}

export default InactiveSwapInput