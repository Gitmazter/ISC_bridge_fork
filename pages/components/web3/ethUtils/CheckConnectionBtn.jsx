import { useEffect } from "react";
import useConnectionInfo from "../../hooks/useConnectionInfo"


export const CheckConnectionButton =  () => {

  const { Accounts } = useConnectionInfo()
  console.log(Accounts);

  useEffect(() => {
    console.log(Accounts);
  },[Accounts])

  const logConnection = ( ) => {
    console.log(Accounts);
  }

  return (
    <button type="button" onClick={logConnection}>Log Eth Connection</button>
  )
}