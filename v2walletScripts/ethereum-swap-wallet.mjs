//const { ethers } = require("ethers");
import {ethers, BigNumber} from "ethers"
//import fs from "fs"
import erc20_json from "../config/ERC20.json"
import swap_json from "../config/Swap.json"
import rpcConfig from '../config/config.json'

class EthereumWalletSwap {
    constructor(config, ethSigner) {
        this.config = config.evm0
        this.erc20_json_abi = erc20_json.abi
        this.swap_abi = swap_json.abi
        this.provider = new ethers.providers.JsonRpcProvider(rpcConfig.evm0.rpc);
        if (ethSigner !== null) {
            this.signer = ethSigner
            // These may cause issues later
            this.SwapContract =         new ethers.Contract(this.config.swap_contract, this.swap_abi, ethSigner)
            this.xOILContract =         new ethers.Contract(this.config.xoil, this.erc20_json_abi, ethSigner)
            this.ISCTokenContract =     new ethers.Contract(this.config.isc, this.erc20_json_abi, ethSigner)
            this.SwapSigner = this.SwapContract  /* this.SwapContract.connect(ethSigner._address) */
            this.xOILSigner = this.xOILContract
            this.ISCTokenSigner = this.ISCTokenContract
        }
    }

    async print_balance() {
        if (this.signer) {
            //const provider = new ethers.JsonRpcProvider();
            let balance = await this.xOILContract.balanceOf(this.signer._address)
            balance = balance.toBigInt()
            console.log("User OIL:", balance)
            balance = await this.ISCTokenContract.balanceOf(this.signer._address)
            balance = balance.toBigInt()
            console.log("User ISC:", balance)
            balance = await this.xOILContract.balanceOf(this.config.swap_contract)
            balance = balance.toBigInt()
            console.log("Swap OIL:", balance)
            balance = await this.ISCTokenContract.balanceOf(this.config.swap_contract)
            balance = balance.toBigInt()
            console.log("Swap ISC:", balance)
            console.log("------------------")
        }
    }

    async fetch_balance() {
        // console.log(this.signer);
        if (this.signer) {
            console.log(this.signer);
            let user_isc = await this.ISCTokenSigner.balanceOf(this.signer._address)
            let user_oil = await this.xOILContract.balanceOf(this.signer._address)
            let pda_isc = await this.ISCTokenContract.balanceOf(this.config.swap_contract)
            let pda_oil = await this.xOILContract.balanceOf(this.config.swap_contract)
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
    async wait_for_fifteen_confirmations(tx) { // Last step only 
        console.log("Waiting for block confirmation")
        await this.provider.waitForTransaction(tx.hash , 15);
    }

    async swap(amount, to_native) {
        const tx = await this.SwapSigner.swap(amount, to_native, {from:this.signer.account});//, gasPrice:'20000000000'});
        // await this.wait_until_finalized(tx)
        await this.wait_for_fifteen_confirmations(tx)
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
