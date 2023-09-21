import styles from '../../../../styles/mystyle.module.css'
import Step from './stepSelectorComponents/Step'
const StepSelector = ({currStepProps}) => {

  const {currStep, setCurrStep} = currStepProps;

  return  (
    <>
      <div className={styles.StepSelector}>
        <div className={styles.StepWrapper}>
          <Step step={1} currStep={currStep} setCurrStep={setCurrStep}/>
          <Step step={2} currStep={currStep} setCurrStep={setCurrStep}/>
          <Step step={3} currStep={currStep} setCurrStep={setCurrStep}/>
        </div>
      </div>
    </>
  )

}

export default StepSelector