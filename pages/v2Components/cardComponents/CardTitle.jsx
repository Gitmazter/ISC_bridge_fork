import styles from '../../../styles/mystyle.module.css'
import { Ellipse, EllipseFilled } from './titleComponents/Ellipses'
import TitleHeading from './titleComponents/TitleHeading';

const CardTitle = ({step}) => {
  const active = false;

  return (
    <div className={styles.CardTitle}>
      {active ? <EllipseFilled/> : <Ellipse/>}
      <TitleHeading step={step}/>
    </div>
  )
}

export default CardTitle