/* Unused */
async function swap_fully() {
  const my_application = new myApplication();
  //console.log(my_application.print_balance())
  console.log(my_application.solana_swap.fetch_balance())
  //console.log("STARTING SOL -> ETH")
  const amount = 0.0001
  let txid = await my_application.solana_swap.swap_isc_to_oil(amount)
  //console.log(await wormhole.bridge_from_solana(amount))
  txid = await my_application.wormhole.send_from_solana(amount)
  const vaa = await my_application.wormhole.get_vaa_bytes_solana(txid)
  const tx = await my_application.wormhole.complete_transfer_on_eth(vaa)
  txid = await my_application.ethereum_swap.swap_oil_to_isc(amount)
  console.log("Bridge to Ethereum completed", txid)
}