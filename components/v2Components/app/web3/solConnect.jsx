import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import * as web3 from '@solana/web3.js'
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets'
require('@solana/wallet-adapter-react-ui/styles.css')
import config from '../../../../config/config.json'

const SolanaContextProvider = ({ children }) => {
    const endpoint = config.solana.rpc
    const wallets = [new walletAdapterWallets.BackpackWalletAdapter]

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    { children }
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}

export default SolanaContextProvider