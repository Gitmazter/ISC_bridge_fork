import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import styles from '../../styles/mystyle.module.css'
export default function MyTable({value}) {
  return (
      <div className={inter.className}>
              <table className={styles.card}>
                  <thead>
                  <tr>
                      <th>Item</th>
                      <th>Solana</th>
                      <th>Ethereum</th>
                  </tr>
                  </thead>
                  <tbody>
                      {value.map((val, key) => {
                          return (
                          <tr key={key}>
                          <td>{val.item}</td>
                          <td>{val.solana}</td>
                          <td>{val.ethereum}</td>
                          </tr>
                          )
                      })}
                  </tbody>
              </table>
      </div>
  );
}