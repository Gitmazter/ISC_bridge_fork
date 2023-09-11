import { createContext, useEffect, useState } from "react";
import Loading from "../Loading";
import useBalance from "../hooks/useBalance";

const MaxAmountsContext = createContext()

export const MaxAmountsContextProvider = ({children}) => {
  const [maxAmounts, setMaxAmounts] = useState({'ISC':<Loading/>, 'xOil':<Loading/>, 'eIsc':<Loading/>, 'Oil':<Loading/>}); /* Default maxAmounts */
  const { balance } = useBalance()
  const  fromTo  = ['ISC','Oil','eIsc','xOil']
  const saveMaxAmounts = (val) => {
    // console.log("new value", val);
    setMaxAmounts(val)
  }

  const updateMaxAmounts = () => {
    if(balance[0]) {
      let userbal
      let poolbal
      // console.log(maxAmounts);
      // console.log(balance);
      for(let i in fromTo) {
        console.log(fromTo[i]);
        switch(fromTo[i]) {
          case 'ISC':
            userbal = balance[0].solana;
            poolbal = balance[3].solana;
            userbal >= poolbal
            ? setMaxAmounts((amounts) => ({...amounts, 'ISC':poolbal}))
            : setMaxAmounts((amounts) => ({...amounts, 'ISC':userbal}));
          case 'Oil':
            userbal = balance[1].solana;
            poolbal = balance[2].solana;
            userbal >= poolbal
            ? setMaxAmounts((amounts) => ({...amounts, 'Oil':poolbal}))
            : setMaxAmounts((amounts) => ({...amounts, 'Oil':userbal}));
          case 'eIsc':
            userbal = balance[0].ethereum;
            poolbal = balance[3].ethereum;
            userbal >= poolbal
            ? setMaxAmounts((amounts) => ({...amounts, 'eIsc':poolbal}))
            : setMaxAmounts((amounts) => ({...amounts, 'eIsx':userbal}));
          case 'xOil':
            userbal = balance[1].ethereum;
            poolbal = balance[2].ethereum;
            userbal >= poolbal
            ? setMaxAmounts((amounts) => ({...amounts, 'xOil':poolbal}))
            : setMaxAmounts((amounts) => ({...amounts, 'xOil':userbal}));
        }
      }
    }
  }

  useEffect(() => {
    updateMaxAmounts()
  },[balance])

  // useEffect(() => {console.log("maxAmounts updated");} , [maxAmounts])

  return (
    <MaxAmountsContext.Provider value={{maxAmounts, saveMaxAmounts}}>
      {children}
    </MaxAmountsContext.Provider>
  )
}

export const MaxAmountsContextConsumer = MaxAmountsContext.Consumer;
export default MaxAmountsContext;
