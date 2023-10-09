import { useContext, useEffect, useState } from 'react'
import AmountContext from '../../../contexts/amountContext'
import StepContext from '../../../contexts/stepContext';

const InactiveSwapInput = () => {
  const { amount } = useContext(AmountContext);
  const { step } = useContext(StepContext)

  useEffect(() => {
    const input = document.getElementById(`inactiveInput${step}`);
    if (amount == undefined) {
      input.value = null;
    }
    else {
      input.value = amount;
    }
  },[amount]);
  return (
    <>
      <input placeholder={'0.00'} disabled="disabled" id={`inactiveInput${step}`} />
    </>
  )
}

export default InactiveSwapInput