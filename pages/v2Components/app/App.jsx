import { useEffect, useState } from 'react'
import styles from '../../../styles/mystyle.module.css'
import { Card } from '../Card'
import myWalletApplication from '../../../v2walletScripts/my-wallet-application.mjs';
import { useWeb3React } from '@web3-react/core';
import { useWallet } from '@solana/wallet-adapter-react';



const BridgeApp = () => {
  const ethSigner = useWeb3React()
  const solSigner = useWallet()
  const [application, setApplication] = useState (new myWalletApplication(ethSigner, solSigner))

  useEffect(() => {
    setApplication(new myWalletApplication(ethSigner, solSigner))
  }, [ethSigner, solSigner])

  useEffect(() => {
    const wait = async () => {
      console.log(ethSigner);
      // console.log(await application.solana_swap.fetch_balance());
      console.log(await application.ethereum_swap.fetch_balance());
    }
    wait()
  }, [application])
  
  const [currStep, setCurrStep] = useState(1);
  const steps = [1,2,3]



  // Connection Check
  // Connectivity check (in order of need as in Figma)
  // const app = AppSelector()
  
  // TODO    ::: 
  // Click Handlers 
  // Balance Context
  // Bridge Scripts (Rewrite old app to class with exported fns?)

  // Max amount Context 
  // FOR EACH
      // ->> Greatest value of, wallet balance for source token || target token pool balance

  // SOL TO ETH
  // To use step 1: Connect to Solana, input amount ,Have ISC = ACTIVE If active -> Allow click handler
      // ->> Swap Selected Amount With Sol B ISC pool Token if amount is less than maxAmount
  // To use step 2: Connect to Ethereum & Solana, input amount ,have Sol B ISC = ACTIVE If active -> Allow click handler
      // ->> Bridge Selected Amount of Sol B ISC if amount is less than maxAmount
  // To use step 3: Connect to Ethereum, input amount, have Eth B ISC = ACTIVE If active -> Allow click handler
      // ->> Swap Selected Amount of Eth B ISC with Eth Native ISC if amount is less than max amount

  // ETH TO SOL 
  // To use step 1: Connect to Ethereum, input amount ,Have Eth ISC = ACTIVE If active -> Allow click handler
      // ->> Swap Selected Amount With ETH B ISC pool Token if amount is less than maxAmount
  // To use step 2: Connect to Ethereum & Solana, input amount ,have Eth B ISC = ACTIVE If active -> Allow click handler
      // ->> Bridge Selected Amount of ETH B ISC if amount is less than maxAmount
  // To use step 3: Connect to Solana, input amount, have Sol B ISC = ACTIVE If active -> Allow click handler
      // ->> Swap Selected Amount of Sol B ISC with Sol Native ISC if amount is less than max amount

  const html = steps.map(( step ) => {  return <Card step={step} currStep={currStep}/>  })
  return ( 
    <>
    
      {/* Temporary Buttons */}
        <button onClick={() => {currStep - 1 > 0 ? setCurrStep(currStep-1) : console.log()}}>Step Up</button>
        <button onClick={() => {currStep + 1 < 4 ? setCurrStep(currStep+1) : console.log()}}>Step Down</button>
      {/* End Temporary Buttons */}

      <div className={styles.v2App}>
        {html}
      </div>
    </>
  )
}

export default BridgeApp