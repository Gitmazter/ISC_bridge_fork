//import fs from "fs"
import config from "../config/config.json"
import myWalletModule from "./exter_wallet_module.mjs"
import Wormhole from "./wormhole.mjs"
import EthereumWalletSwap from "./ethereum-swap-wallet.mjs"
import SolanaSwapWallet from "./solana-swap-wallet.mjs"

class myWalletApplication {
    constructor() {
        this.value = 100;
        this.exter_module = new myWalletModule()
        //this.config = JSON.parse(fs.readFileSync("./config/config.json").toString());
        this.solana_swap = new SolanaSwapWallet(config)
        this.wormhole = new Wormhole(config)
        this.ethereum_swap = new EthereumWalletSwap(config)
    }

    print_balance() {
        //console.log(await solana_swap.fetch_balance())
        //console.log(await ethereum_swap.fetch_balance())
        //console.log(this.value)
        //this.exter_module.print_module()
        console.log(this.solana_swap.fetch_balance())
    }
}

export default myWalletApplication