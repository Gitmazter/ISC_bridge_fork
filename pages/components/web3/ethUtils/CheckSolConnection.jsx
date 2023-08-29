useWallet
import { useWallet } from '@solana/wallet-adapter-react'


export const CheckSolConnection = () => {
  const { publicKey } = useWallet()
  const wallet = useWallet()
  
  const logConnection = () => {
    try {
      console.log(publicKey.toString());
    }
    catch(err) {
      console.log(err);
    }
  } 
  
  return (
    <button onClick={logConnection} type="button">
      Log Sol Connection
    </button>
  )
}