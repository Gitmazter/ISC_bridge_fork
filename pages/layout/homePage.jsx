import styles from '../../styles/mystyle.module.css'
import AppSelector from '../components/AppSelector';
import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import myWalletApplication from '../../wallet-scripts/my-wallet-application.mjs';
import { useWeb3React } from '@web3-react/core';
import useBalance from '../components/hooks/useBalance';
import useAmount from '../components/hooks/useAmount';

import { ConnectionRequest } from '../components/ConnectionRequest';
import useBrideDirection from '../components/hooks/useBrideDirection';
import { DirSelector } from '../components/DirSelector';
import { BackToTop } from '../components/utils/BackToTop';
import { ReturnDirection } from '../components/utils/ReturnDirection';

/* INDEX */
export default function HomePage() {
      /* ////////////////////////////////////////////////////////////////////// */
     /*                         STATES AND CONTEXTS                            */
    /* ////////////////////////////////////////////////////////////////////// */
    // ETHEREUM Context
    const { active, library : provider , account}   = useWeb3React();
    // SOLANA Context
    const solWallet                                 = useWallet();    
    // Contexts
    const { saveBalance }                           = useBalance();
    const { amount }                                = useAmount()
    const { direction, setDirection }               = useBrideDirection();
    // States
    const [ my_application, set_my_application ]    = useState(null);
    const [ myKeys, setMyKeys ]                     = useState({solana: null, ethereum: null, ethSigner:null});
    const [ connected, setConnected ]               = useState(false)
    const [ curr_step, setCurrStep ]                = useState(null);
    const [ balance, setBalance ]                   = useState([]);
    const [ loading, setLoading ]                   = useState(false)


      /* ////////////////////////////////////////////////////////////////////// */
     /*                              FUNCTIONS                                 */
    /* ////////////////////////////////////////////////////////////////////// */
    async function updateBalance() {
        if (myKeys.solana !== null && myKeys.ethSigner !== undefined) {
            const solana_bal = await my_application.solana_swap.fetch_balance()
            const eth_bal = await my_application.ethereum_swap.fetch_balance()
            const result = []
            result.push({'item':'User ISC', 'solana':solana_bal.user_isc, 'ethereum':eth_bal.user_isc})
            result.push({'item':'User OIL', 'solana':solana_bal.user_oil, 'ethereum':eth_bal.user_oil})
            result.push({'item':'Pool ISC', 'solana':solana_bal.pool_isc, 'ethereum':eth_bal.pool_isc})
            result.push({'item':'Pool OIL', 'solana':solana_bal.pool_oil, 'ethereum':eth_bal.pool_oil})
            result.push({'item':'User SOL', 'solana':solana_bal.user_sol, 'ethereum':0})
            setBalance(result)
            saveBalance(result)
        }
    }
      /* ////////////////////////////////////////////////////////////////////// */
     /*                                 EFFECTS                                */
    /* ////////////////////////////////////////////////////////////////////// */
    useEffect(() => {
        if(solWallet.connected) {
            setMyKeys((keys) => ({...keys, solana:solWallet}))
        }
        else {
            setMyKeys((keys) => ({...keys, solana:solWallet}))
            if (connected) {
                setConnected(false)
            }
        }
    },[solWallet])

    useEffect(() => {
        // console.log(active);
        const updateKeys = async () => {
            if (active === true) {
                let signer = await provider.getSigner();
                setMyKeys((keys) => ({...keys, ethereum: account, ethSigner: signer}))
            }
            else {
                setMyKeys((keys) => ({...keys, ethereum: null, ethSigner: null}))
                if (connected) {
                    setConnected(false)
                }
            }
        }
        updateKeys()
    }, [account])

    useEffect(() => {
        // console.log(myKeys);
        if(active && myKeys.solana.connected === true) {
            console.log('activated');
            const application = new myWalletApplication(myKeys)
            set_my_application(application);
        }
        else {
            setConnected(false)
        }
    }, [myKeys.solana, myKeys.ethSigner])

    useEffect(() => {
        console.log(my_application);
        if (my_application) {
            setTimeout(()=> {
                setConnected(true)
            }, 200)
        }
        // setConnected(true)
    }, [my_application])

      /* ////////////////////////////////////////////////////////////////////// */
     /*                                 RETURN                                 */
    /* ////////////////////////////////////////////////////////////////////// */

    return (
        <div className={styles.main}>
            {/* connect wallets first */}
            {!connected 
                ? <ConnectionRequest/>
                : /* Direction selector then open AppSelector with direction */
                !direction 
                    ? <DirSelector/>
                    :
                <>
                    <ReturnDirection/>
                    <AppSelector
                        amount={amount}
                        curr_step={curr_step}
                        balance = {balance}
                        setBalance={setBalance}
                        setCurrStep={setCurrStep}
                        my_application={my_application}
                        direction={direction}
                    />
                    <BackToTop />
                </>
            }
            <style jsx global>{" body { background: #e0e0e0; } "}</style>
        </div>
    )
}
