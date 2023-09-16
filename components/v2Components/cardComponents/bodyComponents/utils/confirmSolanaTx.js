import axios from "axios";
import config from '../../../../../config/config.json'

export default async (txid) => {
  let conf = await axios.post(config.solana.rpc, {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "getTransaction",
      "params": [
        txid,
        "json"
      ]
    }, {
    "headers" : {
      "Content-Type":"application/json"
    }
  });
  console.log(conf);
  while(conf.data.result === null){
    await new Promise(resolve => setTimeout(() => resolve(console.log('.')), 1000));
    conf = await axios.post(config.solana.rpc, {
      "jsonrpc": "2.0",
      "id": 1,
      "method": "getTransaction",
      "params": [
        txid,
        "json"
      ]
      }, {
    "headers" : {
      "Content-Type":"application/json"
      }
    })
  }
  return conf
}