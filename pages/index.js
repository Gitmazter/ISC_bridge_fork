//import '@picocss/pico'
// index.html
import styles from '../styles/mystyle.module.css'
import myApplication from '../scripts/my-application.mjs'
import Form from './components/Form';
import MyTable from './components/MyTable';
import AppSelector from './components/AppSelector';
import { useEffect, useState } from 'react';

/* INDEX */
export default function HomePage() {
    const my_application = new myApplication();
    const [balance, setBalance] = useState([]);
    const [amount, setAmount] = useState(0.0001);
    const [direction, setDirection] = useState('sol_to_eth');
    const [curr_step, setCurrStep] = useState(null);

    async function updateBalance() {
        const solana_bal = await my_application.solana_swap.fetch_balance()
        const eth_bal = await my_application.ethereum_swap.fetch_balance()
        console.log(solana_bal)
        console.log(eth_bal)
        const result = []
        result.push({'item':'User ISC', 'solana':solana_bal.user_isc, 'ethereum':eth_bal.user_isc})
        result.push({'item':'User OIL', 'solana':solana_bal.user_oil, 'ethereum':eth_bal.user_oil})
        result.push({'item':'Pool ISC', 'solana':solana_bal.pool_isc, 'ethereum':eth_bal.pool_isc})
        result.push({'item':'Pool OIL', 'solana':solana_bal.pool_oil, 'ethereum':eth_bal.pool_oil})
        result.push({'item':'User SOL', 'solana':solana_bal.user_sol, 'ethereum':0})
        setBalance(result)
    }

    useEffect(() => {
        const fetchData = async () => {
            await updateBalance();
        }
        fetchData()
    }, [])


  return <div className={styles.flex}>
        <AppSelector
            amount={amount}
            curr_step={curr_step}
            setBalance={setBalance}
            setCurrStep={setCurrStep}
            my_application={my_application}
            direction={direction}
        />
        <div>
        <Form event_handler={setAmount} setDirection={setDirection} enabled={curr_step==null}/>
        <MyTable value={balance}/>
        </div>
            <style jsx global>{" body { background: #e0e0e0; } "}</style>
        </div>
}
