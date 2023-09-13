export class UpdateBalance {

  constructor () {

  };

  all = async (ethSigner, solSigner) => {
    if(wallets[0].publicKey && wallets[1]) {
      const solana_bal = await my_application.solana_swap.fetch_balance(solSigner)
      const eth_bal = await my_application.ethereum_swap.fetch_balance(ethSigner)
      console.log(solana_bal)
      console.log(eth_bal)
      const result = []
      result.push({'item':'User ISC', 'solana':solana_bal.user_isc, 'ethereum':eth_bal.user_isc})
      result.push({'item':'User OIL', 'solana':solana_bal.user_oil, 'ethereum':eth_bal.user_oil})
      result.push({'item':'Pool ISC', 'solana':solana_bal.pool_isc, 'ethereum':eth_bal.pool_isc})
      result.push({'item':'Pool OIL', 'solana':solana_bal.pool_oil, 'ethereum':eth_bal.pool_oil})
      result.push({'item':'User SOL', 'solana':solana_bal.user_sol, 'ethereum':0})
      // saveBalance(result)
      return result
    }
  }
}