import { useContext, useEffect } from 'react'
import AmountContext from '../../../contexts/amountContext'
import StepContext from '../../../contexts/stepContext';

const SwapInput = () => {
  const {amount, saveAmount} = useContext(AmountContext);
  const {step} = useContext(StepContext);

  useEffect(() => {
    const input = document.getElementById(`activeInput${step}`);
    if (amount == undefined) {
      input.value = null;
    };
  },[amount]);

  const handleChange = (e) => {
    saveAmount(e.target.value)
  };

  return ( <input placeholder='0.00' onChange={handleChange} id={`activeInput${step}`}/> );
}
export default SwapInput;