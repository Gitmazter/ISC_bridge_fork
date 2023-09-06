import { useContext } from "react";
import BridgeDirectionContext from "../contexts/BridgeDirectionContext";

export default () => {
  const context = useContext(BridgeDirectionContext)
  return context
}