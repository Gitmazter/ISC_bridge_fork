export default async (my_application, saveBalance) => {

  if(my_application.ethSigner._address && my_application.solSigner.publicKey) {
    const solana_bal = await my_application.solana_swap.fetch_balance()
    const eth_bal = await my_application.ethereum_swap.fetch_balance()
    const result = []
    result.push({'item':'User ISC', 'solana':solana_bal.user_isc, 'ethereum':eth_bal.user_isc})
    result.push({'item':'User OIL', 'solana':solana_bal.user_oil, 'ethereum':eth_bal.user_oil})
    result.push({'item':'Pool ISC', 'solana':solana_bal.pool_isc, 'ethereum':eth_bal.pool_isc})
    result.push({'item':'Pool OIL', 'solana':solana_bal.pool_oil, 'ethereum':eth_bal.pool_oil})
    result.push({'item':'User SOL', 'solana':solana_bal.user_sol, 'ethereum':0})
    saveBalance(result)
  }
  else if (my_application.ethSigner._address !== null && my_application.solSigner.publicKey == null) {
    const eth_bal = await my_application.ethereum_swap.fetch_balance()
    const result = []
    result.push({'item':'User ISC','solana':"No Wallet", 'ethereum':eth_bal.user_isc})
    result.push({'item':'User OIL','solana':"No Wallet", 'ethereum':eth_bal.user_oil})
    result.push({'item':'Pool ISC','solana':"No Wallet", 'ethereum':eth_bal.pool_isc})
    result.push({'item':'Pool OIL','solana':"No Wallet", 'ethereum':eth_bal.pool_oil})
    result.push({'item':'User SOL','solana':"No Wallet", 'ethereum':0})
    saveBalance(result)
  }
  else if (my_application.ethSigner._address == null && my_application.solSigner.publicKey !== null) {
    const solana_bal = await my_application.solana_swap.fetch_balance()
    const result = []
    result.push({'item':'User ISC', 'solana':solana_bal.user_isc, 'ethereum':"No Wallet"});
    result.push({'item':'User OIL', 'solana':solana_bal.user_oil, 'ethereum':"No Wallet"});
    result.push({'item':'Pool ISC', 'solana':solana_bal.pool_isc, 'ethereum':"No Wallet"});
    result.push({'item':'Pool OIL', 'solana':solana_bal.pool_oil, 'ethereum':"No Wallet"});
    result.push({'item':'User SOL', 'solana':solana_bal.user_sol, 'ethereum':"No Wallet"});
    saveBalance(result)
  }
}