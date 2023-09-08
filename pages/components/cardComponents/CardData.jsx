import styles from '../../../styles/mystyle.module.css'


export default function CardData({value, type}) {
  const ethBaseUrl = 'https://etherscan.io/tx/'
  // Using Locally Run Explorer On Port 8000 "Etherparty Explorer" https://github.com/etherparty/explorer
  // Note to self: cd ~/explorer npm start
  const customEthUrl = 'http://localhost:8000/#/transaction/'
  const solBaseUrl = 'https://explorer.solana.com/tx/'
  const customRpc = '?cluster=custom&customUrl=http%3A%2F%2Flocalhost%3A8899'
  // console.log(value);
  type == undefined ? type = 'txid' : console.log();
  // console.log(type);
  

  const checkChain = () => {
    if (value !== null) {
      let chain = null
      const substring = value.substring(0,2);
      substring == '0x' ? chain = 'eth' : chain = 'sol'
      return chain
    }
  }
  let chain = checkChain()
  // console.log(chain);

  const makeUrl = () => {
    switch (chain) {
      case 'sol':
        return `${solBaseUrl}${value}${customRpc}`
      case 'eth':
        return `${customEthUrl}${value}`
      default:
        return '#'
    }
  }

  const copyValueToClipboard = () => {
    navigator.clipboard.writeText(value)
  }

  return(
     value 
     ?
      <p className={styles.cardData}>
        {type == 'txid' ? 'TxHash:' : 'VAA Receipt:'} 
        <br/><br/> 
        <a href={makeUrl()} target='empty'> Link: {value}</a><br/><br/>
        <button onClick={copyValueToClipboard} className={styles.copyButton}>
          📑 Copy To Clipboard
        </button>
      </p>
     :
      <></>
     )
}