import { useEffect, useState } from 'react'
import styles from '../../../styles/mystyle.module.css'
export const Progressbar = ({isRunning, averageTimeMilliSeconds}) => {

  const [ filled, setFilled ] = useState(0)
  // const [ isRunning, setIsRunning ] = useState(false)
  
  useEffect(() => {
    if (filled < 100 && isRunning) {
      setTimeout(() => setFilled(prev => prev += 2), averageTimeMilliSeconds/50)
    }
  }, [filled, isRunning])

  return(
    <div>
      <div className={styles.Progressbar}>
        <div style={{
          height: '100%',
          width: `${filled}%`,
          transition: 'width 0.5s'
        }}></div>
      </div>
    </div>
  )
}