//import fs from "fs"
import config from "../config/config.json"
import myWalletModule from "./exter_wallet_module.mjs"
import WalletWormhole from "./wallet-wormhole.mjs"
import EthereumWalletSwap from "./ethereum-swap-wallet.mjs"
import SolanaSwapWallet from "./solana-swap-wallet.mjs"

class myWalletApplication {
    constructor(ethSigner, solSigner) {
        this.value = 100;
        this.exter_module = new myWalletModule();
        this.ethSigner = ethSigner;
        this.solSigner = solSigner;
        this.solana_swap = new SolanaSwapWallet(config, this.solSigner);
        this.wormhole = new WalletWormhole(config, [ethSigner, solSigner]);
        this.ethereum_swap = new EthereumWalletSwap(config, this.ethSigner);
    }

    print_balance() {
        console.log(this.solana_swap.fetch_balance())
    }
}

export default myWalletApplication