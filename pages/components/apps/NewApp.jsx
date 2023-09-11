import styles from '../../../styles/mystyle.module.css'
import { NewCard } from '../../v2Components/NewCard'

export const NewApp = () => {




  return (
    <div className={styles.v2App}>
      <NewCard/>
      <NewCard/>
      <NewCard/>
    </div>
  )
}