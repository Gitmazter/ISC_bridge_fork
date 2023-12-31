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
        if (solSigner != null) {
          this.solana_swap = new SolanaSwapWallet(config, this.solSigner);
        }
        if (ethSigner != false) {
          this.ethereum_swap = new EthereumWalletSwap(config, this.ethSigner);
        }
        if (ethSigner && solSigner) {
          this.wormhole = new WalletWormhole(config, [ethSigner, solSigner]);
        }
    }

    async updateBalance(saveBalance) {
        if(this.ethSigner._address && this.solSigner.publicKey) {
            const solana_bal = await this.solana_swap.fetch_balance()
            console.log(solana_bal);
            const eth_bal = await this.ethereum_swap.fetch_balance()
            const result = []
            result.push({'item':'User ISC', 'solana':solana_bal.user_isc, 'ethereum':eth_bal.user_isc})
            result.push({'item':'User OIL', 'solana':solana_bal.user_oil, 'ethereum':eth_bal.user_oil})
            result.push({'item':'Pool ISC', 'solana':solana_bal.pool_isc, 'ethereum':eth_bal.pool_isc})
            result.push({'item':'Pool OIL', 'solana':solana_bal.pool_oil, 'ethereum':eth_bal.pool_oil})
            result.push({'item':'User SOL', 'solana':solana_bal.user_sol, 'ethereum':0})
            saveBalance(result)
            // return result
          }
          else if (this.ethSigner._address !== null && this.solSigner.publicKey == null) {
            const eth_bal = await this.ethereum_swap.fetch_balance()
            const result = []
            result.push({'item':'User ISC', 'ethereum':eth_bal.user_isc})
            result.push({'item':'User OIL', 'ethereum':eth_bal.user_oil})
            result.push({'item':'Pool ISC', 'ethereum':eth_bal.pool_isc})
            result.push({'item':'Pool OIL', 'ethereum':eth_bal.pool_oil})
            result.push({'item':'User SOL', 'ethereum':0})
            saveBalance(result)
            // return result
          }
          else if (this.ethSigner._address == null && this.solSigner.publicKey !== null) {
            const solana_bal = await this.solana_swap.fetch_balance()
            const result = []
            result.push({'item':'User ISC', 'solana':solana_bal.user_isc});
            result.push({'item':'User OIL', 'solana':solana_bal.user_oil});
            result.push({'item':'Pool ISC', 'solana':solana_bal.pool_isc});
            result.push({'item':'Pool OIL', 'solana':solana_bal.pool_oil});
            result.push({'item':'User SOL', 'solana':solana_bal.user_sol});
            saveBalance(result)
            // return result
          }
    }

    print_balance() {
        console.log(this.solana_swap.fetch_balance())
    }
}

export default myWalletApplication