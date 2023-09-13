export default (balance) =>  {
  const results = []
  results.push(balance[0].solana)
  results.push(balance[1].solana)
  results.push(balance[1].ethereum)
  results.push(balance[0].ethereum)
  return results
}