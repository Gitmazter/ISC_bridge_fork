import { useContext } from "react";
import AmountContext from "../contexts/AmountContext";

export default () => {
  const context = useContext(AmountContext)
  return context
}