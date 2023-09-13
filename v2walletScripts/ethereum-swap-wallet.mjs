//const { ethers } = require("ethers");
import {ethers, BigNumber} from "ethers"
//import fs from "fs"
import erc20_json from "../config/ERC20.json"
import swap_json from "../config/Swap.json"
BigNumber

class EthereumWalletSwap {
    constructor(config, ethSigner) {
        this.config = config.evm0
        this.erc20_json_abi = erc20_json.abi
        this.swap_abi = swap_json.abi
        this.provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
        this.signer = ethSigner
        this.localSigner = new ethers.Wallet(this.config.privateKey, this.provider);
        this.SwapContract = new ethers.Contract(this.config.swap_contract, this.swap_abi, this.provider)
        this.SwapSigner = this.SwapContract.connect(this.localSigner)
        this.xOIL = new ethers.Contract(this.config.xoil, this.erc20_json_abi, this.provider)
        this.ISCToken = new ethers.Contract(this.config.isc, this.erc20_json_abi, this.provider)
        this.xOILSigner = this.xOIL.connect(this.localSigner)
        this.ISCTokenSigner = this.ISCToken.connect(this.localSigner)
    }

    async print_balance() {
        if (signer.account !== null) {
            let balance = await this.xOIL.balanceOf(this.signer.publicKey)
            balance = balance.toBigInt()
            console.log("User OIL:", balance)
            balance = await this.ISCToken.balanceOf(this.signer.publicKey)
            balance = balance.toBigInt()
            console.log("User ISC:", balance)
            balance = await this.xOIL.balanceOf(this.config.swap_contract)
            balance = balance.toBigInt()
            console.log("Swap OIL:", balance)
            balance = await this.ISCToken.balanceOf(this.config.swap_contract)
            balance = balance.toBigInt()
            console.log("Swap ISC:", balance)
            console.log("------------------")
        }
    }

    async fetch_balance() {
        if (this.signer.account !== null) {
            console.log('working 0'); // BREAKPOINT
            let user_isc = await this.ISCToken.balanceOf(this.signer.publicKey)
            console.log('working 1');
            let user_oil = await this.xOIL.balanceOf(this.signer.publicKey)
            console.log('working 2');
            let pda_isc = await this.ISCToken.balanceOf(this.config.swap_contract)
            console.log('working 3');
            let pda_oil = await this.xOIL.balanceOf(this.config.swap_contract)
            console.log('working all');
            return {
                'user_isc': user_isc / 10**this.config.decimals,
                'user_oil': user_oil / 10**this.config.decimals,
                'pool_isc': pda_isc / 10**this.config.decimals,
                'pool_oil': pda_oil / 10**this.config.decimals,
            }
        }
    }
    

    async swap_back_and_forth() {
        //await this.print_balance();
        //let receipt;
        ////const blocks = await provider.getBlockNumber()
        //const signer = new ethers.Wallet(this.config.privateKey, this.provider);
        ////console.log(blocks)
        //const xOIL = new ethers.Contract(this.config.xoil, this.erc20_json_abi, this.provider)
        //const xOILSigner = xOIL.connect(signer)
        //const ISCToken = new ethers.Contract(this.config.isc, this.erc20_json_abi, this.provider)
        //const ISCTokenSigner = ISCToken.connect(signer);
        ////await ISCTokenSigner.approve("0xaa8751Df9FC4b9424831Fb361F0C14096FC0C204", 10000000)
        ////await xOILSigner.approve("0xaa8751Df9FC4b9424831Fb361F0C14096FC0C204", 10000)
        ////console.log(approval)
        ////let tx = await ISCTokenSigner.transfer("0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1", 1)
        ////console.log(tx)

        //const Swap = new ethers.Contract(this.config.swap_contract, this.swap_abi, this.provider)
        //const SwapSigner = Swap.connect(signer)

        let tx = await this.SwapSigner.swap(1, true, {from:this.config.publicKey});//, gasPrice:'20000000000'});
        let receipt = await this.provider.getTransactionReceipt(tx.hash)
        while (!(receipt&&receipt.blockNumber)) {
            await new Promise((r) => setTimeout(r, 50)); //Timeout to let Guardiand pick up log and have VAA ready
            receipt = await this.provider.getTransactionReceipt(tx.hash)
            //console.log("Receipt:", receipt)
            console.log("Waiting for block confirmation")
        }


        console.log(tx)
        await this.print_balance();

        tx = await this.SwapSigner.swap(1, false, {from:this.config.publicKey});//, gasPrice:'20000000000'});
        receipt = await this.provider.getTransactionReceipt(tx.hash)
        while (!(receipt&&receipt.blockNumber)) {
            await new Promise((r) => setTimeout(r, 50)); //Timeout to let Guardiand pick up log and have VAA ready
            receipt = await this.provider.getTransactionReceipt(tx.hash)
            console.log("Waiting for block confirmation")
        }
        await this.print_balance();
    }

    async wait_until_finalized(tx) {
        let receipt = await this.provider.getTransactionReceipt(tx.hash)
        while (!(receipt&&receipt.blockNumber)) {
            await new Promise((r) => setTimeout(r, 500)); //Timeout to let Guardiand pick up log and have VAA ready
            receipt = await this.provider.getTransactionReceipt(tx.hash)
            console.log("Waiting for block confirmation")
        }
    }

    async swap(amount, to_native) {
        const tx = await this.SwapSigner.swap(amount, to_native, {from:this.signer.publicKey});//, gasPrice:'20000000000'});
        await this.wait_until_finalized(tx)
        return tx
    }
    
    async swap_oil_to_isc(amount) {
        amount = amount * (10**this.config.decimals);
        let tx = await this.xOILSigner.approve(this.config.swap_contract, amount);
        await this.wait_until_finalized(tx);
        tx = await this.swap(amount, true);
        console.log(tx);
        return tx;
    }
    async approve_oil_to_isc(amount) {
        let tx = await this.xOILSigner.approve(this.config.swap_contract, amount);
        return tx()
    }

    async swap_isc_to_oil(amount) {
        amount = amount * (10**this.config.decimals)
        let tx = await this.ISCTokenSigner.approve(this.config.swap_contract, amount)
        await this.wait_until_finalized(tx)
        tx = await this.swap(amount, false)
        return tx
    }

    async mint_isc(amount) {
        amount = amount * (10**this.config.decimals)
        let tx = await this.ISCTokenSigner.mint(this.config.swap_contract, amount)
        await this.wait_until_finalized(tx)
    }

    async burn(amount) {
        amount = amount * (10**this.config.decimals)
        let tx = await this.ISCTokenSigner.burn(amount)
        await this.wait_until_finalized(tx)
    }
}

//module.exports = EthereumSwap
export default EthereumWalletSwap
