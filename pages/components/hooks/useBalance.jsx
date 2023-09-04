import { useContext } from "react";
import BalanceContext from "../contexts/BalanceContext";

export default () => {
  const context = useContext(BalanceContext)
  return context
}