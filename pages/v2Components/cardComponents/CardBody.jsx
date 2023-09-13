import styles from '../../../styles/mystyle.module.css'
import ActionButton from './bodyComponents/utils/ActionButton'
import ActiveInput from './bodyComponents/ActiveInput'
import InactiveInput from './bodyComponents/InactiveInput'
import BorderedArrow from './icons/BorderedArrow'
import { useContext } from 'react'
import { StepContext } from '../contexts/stepContext'

const CardBody = () => {
  return (
    <div className={styles.CardBody}>
      <div className={styles.CardBodyInner}> 

        <ActiveInput/>
        <BorderedArrow type={'swap'}/>
        <InactiveInput/>
        <ActionButton/>
        
      </div>
    </div>
  )
}

export default CardBody