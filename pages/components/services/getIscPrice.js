import axios from "axios";


export default async function getIscUsdPrice () {
  const price = await axios.get('https://dashboard.isc.money/api/price') 
  return price.data.iscNow
}