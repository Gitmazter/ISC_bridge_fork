import {
  Transaction,
  SystemProgram,
  Connection,
  TransactionInstruction,
  PublicKey} from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import borsh from 'borsh'
import rpcConfig from '../config/config.json'
class Parameters {
  constructor(instruction, amount) {
    this.instruction = instruction;
    this.amount = amount;
  }
}

class SolanaWalletSwap {
constructor(config, solSigner) {
  this.signer = solSigner;
  // this.signerPubKey = solSigner.publicKey;
  this.acc_info = null;
  this.config = config.solana;
  this.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(this.config.spl_ata_program_id);
  this.programId = new PublicKey(this.config.swap_contract);
  this.isc = new PublicKey(this.config.isc);
  this.oil = new PublicKey(this.config.oil);
  this.user_isc_ata = null;
  this.user_oil_ata = null;
  this.pda_isc_ata = null;
  this.pda_oil_ata = null;
  this.updateAccounts();
  this.connection = new Connection(rpcConfig.solana.rpc);
  this.options = {
      commitment: 'processed'
  };
  this.updateAccounts();
  this.schema = new Map(
      [
        [
          Parameters, {
            kind: 'struct',
            fields: [
                ['instruction', 'u8'],
                ['amount', 'u64'],
            ]
          }
        ]
      ]
    );
  };

  async hello() {
    console.log("Hello");
  };
  

  async fetch_balance() {
    // Only updates balances if a wallet has been connected
    // console.log(this.signer);
    if (this.signer.publicKey !== null) {
      this.updateAccounts()
      let user_isc = await this.connection.getTokenAccountBalance(this.user_isc_ata, "processed");
      let user_oil = await this.connection.getTokenAccountBalance(this.user_oil_ata, "processed");
      let pda_isc = await this.connection.getTokenAccountBalance(this.pda_isc_ata, "processed");
      let pda_oil = await this.connection.getTokenAccountBalance(this.pda_oil_ata, "processed");
      let user_sol = await this.connection.getBalance(this.signer.publicKey, "processed");
      return {
          'user_isc': user_isc.value.uiAmount,
          'user_oil': user_oil.value.uiAmount,
          'pool_isc': pda_isc.value.uiAmount,
          'pool_oil': pda_oil.value.uiAmount,
          'user_sol': user_sol/1000000000,
      };
    };
  };

  findAssociatedTokenAddress(
    walletAddress,
    tokenMintAddress
  ) {
    return PublicKey.findProgramAddressSync(
        [
            walletAddress.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            tokenMintAddress.toBuffer(),
        ],
        this.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
    )[0];
  };

  updateAccounts() {
    // Only updates solana accounts if a wallet has been connected
    if (this.signer.publicKey !== null) {
      const acc_info_initializer = this.signer.publicKey;
      const acc_info_initializer_isc_ata = this.findAssociatedTokenAddress(this.signer.publicKey, this.isc);
      const acc_info_initializer_oil_ata = this.findAssociatedTokenAddress(this.signer.publicKey, this.oil);
      const acc_info_program = this.programId;
      const acc_info_pda = PublicKey.findProgramAddressSync([Buffer.from("oolaa")], this.programId)[0];
      const acc_info_pda_isc_ata = this.findAssociatedTokenAddress(acc_info_pda, this.isc);
      const acc_info_pda_oil_ata = this.findAssociatedTokenAddress(acc_info_pda, this.oil);
      const acc_info_isc = this.isc;
      const acc_info_oil = this.oil;
      const acc_info_token_prog = TOKEN_PROGRAM_ID;
      const acc_info_assoc_token_prog = this.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID;
      const acc_info_sys_prog = SystemProgram.programId;
    
      this.user_isc_ata = acc_info_initializer_isc_ata;
      this.user_oil_ata = acc_info_initializer_oil_ata;
      this.pda_isc_ata = acc_info_pda_isc_ata;
      this.pda_oil_ata = acc_info_pda_oil_ata;
    
      this.acc_info = [
          {  pubkey:  acc_info_initializer,          isSigner:  true,   isWritable:  true   },
          {  pubkey:  acc_info_initializer_isc_ata,  isSigner:  false,  isWritable:  true   },
          {  pubkey:  acc_info_initializer_oil_ata,  isSigner:  false,  isWritable:  true   },
          {  pubkey:  acc_info_program,              isSigner:  false,  isWritable:  false  },
          {  pubkey:  acc_info_pda,                  isSigner:  false,  isWritable:  false  }, // HiCJMeuFfwHVAk2uDN2zDJexnuaqN14YQEjP3X92jPd7
          {  pubkey:  acc_info_pda_isc_ata,          isSigner:  false,  isWritable:  true   },
          {  pubkey:  acc_info_pda_oil_ata,          isSigner:  false,  isWritable:  true   },
          {  pubkey:  acc_info_isc,                  isSigner:  false,  isWritable:  false  },
          {  pubkey:  acc_info_oil,                  isSigner:  false,  isWritable:  false  },
          {  pubkey:  acc_info_token_prog,           isSigner:  false,  isWritable:  false  },
          {  pubkey:  acc_info_assoc_token_prog,     isSigner:  false,  isWritable:  false  },
          {  pubkey:  acc_info_sys_prog,             isSigner:  false,  isWritable:  false  },
      ];
    };
  };

  //creates a transaction that can be signed by a wallet 
  async createTransaction (param) {
    const data = borsh.serialize(this.schema, param);
    const tx = new Transaction();
    const ix = new TransactionInstruction({
        keys:this.acc_info,
        programId: this.programId,
        data:data,
    });
    tx.add(ix);
    const recentBlockhash = await this.connection.getLatestBlockhash();
    tx.recentBlockhash = recentBlockhash.blockhash;
    return tx;
  };

  // Creates params for a ist to oil swap and returns the return of create transaction
  async swap_isc_to_oil(amount) {
    const scaled_amount = amount*(10**this.config.decimals);
    const param = new Parameters(0, scaled_amount);
    return await this.createTransaction(param);
  };

  // Creates params for a oil to isc swap and returns the return of create transaction
  async swap_oil_to_isc(oil_amount) {
    const scaled_amount = oil_amount*(10**this.config.decimals);
    const param = new Parameters(1, scaled_amount);
    return await this.createTransaction(param);
  };

  async send_transaction(tx) {
    
  }
};

export default SolanaWalletSwap;
