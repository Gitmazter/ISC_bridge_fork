import styles from '../../../../styles/mystyle.module.css'
import {SolIcon, EthIcon, IscIcon, EthIscIcon} from '../tokenIcons/Icons'
const MapTokenCard = ({index}) => {
  const type = 'map'
  const CardTopics = [
    'Solana ISC',
    'Solana Bridge ISC',
    'Ethereum Bridge ISC',
    'Ethereum ISC',
  ];
  const cardIcons = () => {
    switch(index){
      case 1:
        return <> <SolIcon type={type}/> <IscIcon type={type}/> </>
      case 2:
        return (
          <> <SolIcon type={type}/> <EthIscIcon type={type}/> </>
        )
      case 3:
        return (
          <> <EthIcon type={type}/> <EthIscIcon type={type}/></>
        )
      case 4:
        return (
          <> <EthIcon type={type}/> <EthIscIcon type={type}/></>
        )
    }
  }


  return (
    <div className={styles.v2TokenCardMap}>
      <div className={styles.iconsWrapper}>
        {cardIcons()}
      </div>
      <p className={styles.tokenCardText}>{CardTopics[index-1]}</p>
    </div>
  )
}

export default MapTokenCard