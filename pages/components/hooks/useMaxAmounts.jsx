import { useContext } from "react";
import MaxAmountsContext from "../contexts/MaxAmountsContext";

export default () => {
  const context = useContext(MaxAmountsContext)
  return context
}