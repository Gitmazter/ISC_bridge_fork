import { useContext } from 'react';
import styles from '../../../../styles/mystyle.module.css';
import StepContext from '../../contexts/stepContext';
import DirectionContext from '../../contexts/directionContext';
import ResumeDataContext from '../../contexts/ResumeDataContext';


function getDirection({chain1, chain2}) {
  let newDirection = "";
  newDirection += chain1.value.substring(0, 3).toLowerCase();
  newDirection += "To";
  newDirection += chain2.value.substring(0, 3);
  return newDirection;
}

function getResumeData({ idType, resumeInfo }) {
  let resumeData = {};
  resumeData.idType = idType.value;
  resumeData.resumeInfo = resumeInfo.value;
  return resumeData
}

export const ResumeForm = ({ ResumeFormProps }) => {

  const { resumeData, saveResumeData } = useContext(ResumeDataContext);
  const { direction, saveDirection } = useContext(DirectionContext);
  const { showResumeForm, setShowResumeForm } = ResumeFormProps;
  const { setCurrStep } = useContext(StepContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDirection = getDirection(e.target);
    saveDirection(newDirection);
    setCurrStep(2);
    const newResumeData = getResumeData(e.target);
    saveResumeData(newResumeData);
    setShowResumeForm(!showResumeForm);
  }

  const closeForm = () => {
    setShowResumeForm(!showResumeForm);
  }

  return (
    <div className={styles.resumeForm}>
      <form onSubmit={handleSubmit}>
        <button type='button' onClick={closeForm} className={styles.closeForm}>X</button>
        <h2>Resume Bridge Flow</h2>
        <section className={styles.resumeDirection}>
          <h3>Direction</h3>  
          <span>
            <select
              id='resumeChain1'
              name='chain1'
            > 
              <option value={"Solana"}>Solana</option>
              <option value={"Ethereum"}>Ethereum</option>
            </select>
            <span>{" ---> "}</span>
            <select
              id='resumeChain2'
              name='chain2'
            >
              <option value={"Ethereum"}>Ethereum</option>
              <option value={"Solana"}>Solana</option>
            </select>
          </span>
        </section>

        <div className={styles.resumeInfoType}>
          <span>
            <h3>Txid/Vaa<button type='button' className={styles.help}>?</button></h3>  
          </span>

          <input 
            type="radio" 
            id="txid" 
            name="idType" 
            value="txid" 
            required  
          />
          <label for="txid">Tx Hash</label>

          <input 
            type="radio" 
            id="vaa" 
            name="idType" 
            value="vaa" 
            required
          />
          <label for="vaa">Vaa</label>
        </div>
        <textarea name="resumeInfo" id="resumeInfo" cols="30" rows="4" required minLength={64}></textarea>
        
        <button type='submit' className={styles.resumeSubmitBtn}>Submit</button>
      </form>
    </div>
  );
};