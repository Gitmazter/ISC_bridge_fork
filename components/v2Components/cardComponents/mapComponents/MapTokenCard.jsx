import { useContext, useEffect, useState } from 'react'
import styles from '../../../../styles/mystyle.module.css'
import DirectionContext from '../../contexts/directionContext'
import BodyConfig from '../../../../config/BodyConfig'

import EthIcon from '../icons/EthIcon'
import IscIcon from '../icons/IscIcon'
import EthIscIcon from '../icons/EthIscIcon'
import SolIcon from '../icons/SolIcon'

const MapTokenCard = ({index}) => {
  const {direction} = useContext(DirectionContext)
  const type = 'map'

  const [CardTopics, setCardTopics ] = useState(BodyConfig[`${direction}`].tokenNames);
  const [Icons, setIcons] = useState(BodyConfig[`${direction}`].tokenIconsMap)
  useEffect(() => {
    setCardTopics(BodyConfig[`${direction}`].tokenNames)
    setIcons(BodyConfig[`${direction}`].tokenIconsMap)
  }, [direction])
  
  const cardIcons = () => {
    switch(index){
      case 1:
        return (
        <> <SolIcon type={type}/> <IscIcon type={type}/> </>
        )
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
          <> <EthIcon type={type}/> <IscIcon type={type}/></>
        )
    }
  }


  return (
    <div className={styles.v2TokenCardMap}>
      <div className={styles.iconsWrapper}>
        {Icons[index-1]}
      </div>
      <p className={styles.tokenCardText}>{CardTopics[index-1]}</p>
    </div>
  )
}

export default MapTokenCard