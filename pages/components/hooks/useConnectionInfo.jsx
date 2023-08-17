import { useContext } from "react";
import ConnectionInfoContext from "../contexts/ConnectionInfo";

export default () => {
  const context = useContext(ConnectionInfoContext)
  return context
}

