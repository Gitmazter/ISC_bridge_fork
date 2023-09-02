//import fs from "fs"
import config from "../config/config.json"
import myWalletModule from "./exter_wallet_module.mjs"
import WalletWormhole from "./wallet-wormhole.mjs"
import EthereumWalletSwap from "./ethereum-swap-wallet.mjs"
import SolanaSwapWallet from "./solana-swap-wallet.mjs"

class myWalletApplication {
    constructor(myKeys) {
        this.value = 100;
        this.exter_module = new myWalletModule();
        this.wallets = myKeys;
        this.solana_swap = new SolanaSwapWallet(config, this.wallets);
        this.wormhole = new WalletWormhole(config, this.wallets);
        this.ethereum_swap = new EthereumWalletSwap(config, this.wallets);
    }

    print_balance() {
        console.log(this.solana_swap.fetch_balance())
    }
}

export default myWalletApplication