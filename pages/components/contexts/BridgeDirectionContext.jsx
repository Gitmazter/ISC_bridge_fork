import { createContext, useContext, useEffect, useState } from "react";

const BridgeDirectionContext = createContext()

export const BridgeDirectionContextProvider = ({children}) => {
  const [direction, setDirection] = useState(undefined);
  const saveBridgeDirection = (val) => {
    //console.log('updating bridgeDirection');
    // console.log(val);
    setDirection(val)
  }

  useEffect(() => {/* console.log("bridgeDirection updated") */} , [direction])

  return (
    <BridgeDirectionContext.Provider value={{ direction,setDirection }}>
      {children}
    </BridgeDirectionContext.Provider>
  )
}

export const BridgeDirectionContextConsumer = BridgeDirectionContext.Consumer;
export default BridgeDirectionContext;
