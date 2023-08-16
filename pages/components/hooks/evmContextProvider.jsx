import { createContext, useContext } from "react";

export const EvmWalletProvider = createContext([])
export const EvmConnectionProvider = createContext({})

export const EvmContextProvider = ({ children }) => {
  return (
    <evmContext>
      { children }
    </evmContext>
  )
}