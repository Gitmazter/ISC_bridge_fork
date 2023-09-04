import { createContext, useContext, useEffect, useState } from "react";

const BalanceContext = createContext()

export const BalanceContextProvider = ({children}) => {
  const [balance, setBalance] = useState([]); /* Default amount */

  const saveBalance = (val) => {
    console.log('updating balance');
    console.log(val);
    setBalance(val)
  }

  useEffect(() => {console.log("amount updated")} , [balance])

  return (
    <BalanceContext.Provider value={{ balance, saveBalance }}>
      {children}
    </BalanceContext.Provider>
  )
}

export const BalanceContextConsumer = BalanceContext.Consumer;
export default BalanceContext;
