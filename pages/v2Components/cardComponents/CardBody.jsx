import styles from '../../../styles/mystyle.module.css'
import ActionButton from './bodyComponents/ActionButton'
import ActiveInput from './bodyComponents/ActiveInput'
import InactiveInput from './bodyComponents/InactiveInput'

const CardBody = () => {
  // TODO
  // Max Amounts
  // Connection Check
  /* 
  Implement: 
    Balance Context
    Bridge Scripts (Rewrite old app to class with exported fns?)
    Max Amounts
    Connectivity check (in order of need as in Figma)
    
  */
  const prompt = 'swap'

  return (
    <div className={styles.CardBody}>
      <div className={styles.CardBodyInner}> 
        <ActiveInput/>
        <div>ARROW</div>
        <InactiveInput/>
        <ActionButton prompt={prompt}/>
      </div>
    </div>
  )
}

export default CardBody