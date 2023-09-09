import { createContext, useContext, useEffect, useState } from "react";

const AmountContext = createContext()

export const AmountContextProvider = ({children}) => {
  const [amount, setAmount] = useState(0.01); /* Default amount */

  const saveAmount = (val) => {
    // console.log("new value", val);
    setAmount(val)
  }

  // useEffect(() => {console.log("amount updated");} , [amount])

  return (
    <AmountContext.Provider value={{amount, saveAmount}}>
      {children}
    </AmountContext.Provider>
  )
}

export const AmountContextConsumer = AmountContext.Consumer;
export default AmountContext;
