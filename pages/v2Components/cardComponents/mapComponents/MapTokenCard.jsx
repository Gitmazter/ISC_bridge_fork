import styles from '../../../../styles/mystyle.module.css'
import {SolIcon, EthIcon, IscIcon, EthIscIcon} from '../tokenIcons/Icons'
const MapTokenCard = ({index}) => {

  const CardTopics = [
    'Solana ISC',
    'Solana Bridge ISC',
    'Ethereum Bridge ISC',
    'Ethereum ISC',
  ]

  const cardIcons = () => {
    switch(index){
      case 1:
        return <> <SolIcon type={'map'}/> <IscIcon type={'map'}/> </>
      case 2:
        return (
          <> <SolIcon type={'map'}/> <EthIscIcon type={'map'}/> </>
        )
      case 3:
        return (
          <> <EthIcon type={'map'}/> <EthIscIcon type={'map'}/></>
        )
      case 4:
        return (
          <> <EthIcon type={'map'}/> <EthIscIcon type={'map'}/></>
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