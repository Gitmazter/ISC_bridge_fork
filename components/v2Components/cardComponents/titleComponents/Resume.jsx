import { useEffect, useState } from 'react'
import styles from '../../../../styles/mystyle.module.css'
import { ResumeForm } from './ResumeForm'

export const Resume = () => {
  const [ showResumeForm, setShowResumeForm ] = useState(false)

  const handleClick = () => {
    setShowResumeForm(!showResumeForm);
  }

  useEffect(() => {
    // console.log(showResumeForm);
  }, [showResumeForm])

  return (
    <>
      <div className={styles.resumeBtn}>
        <button onClick={handleClick}>Resume</button>
      </div>
      {
        showResumeForm 
        ? <ResumeForm ResumeFormProps={{showResumeForm, setShowResumeForm}}/>
        : <></>
      }
    </>
  )
}