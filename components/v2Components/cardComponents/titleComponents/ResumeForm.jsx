import { useContext, useState } from 'react';
import styles from '../../../../styles/mystyle.module.css';
import StepContext from '../../contexts/stepContext';
import DirectionContext from '../../contexts/directionContext';
import ResumeDataContext from '../../contexts/ResumeDataContext';
import { useWeb3React } from '@web3-react/core';
import { useWallet } from '@solana/wallet-adapter-react';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

const injected = new InjectedConnector();

const Tooltip_text = `
  TXID is the Transaction ID for the transaction that sent funds to our bridge contract. Please look through your transaction history to find it.
`

 const Tooltip_text2 = ` 
  VAA is the receipt returned by the bridge, this will have been sent to your telegram/e-mail if you supplied your contact information. If you did not choose to do so, please paste your TXID so it can be fetched again.
`


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
  const { active, activate, library: provider } = useWeb3React();
  const { connected, connect } = useWallet();
  const { setVisible: setModalVisible } = useWalletModal(); 
  const [ walletSelected, setWalletSelected ] = useState(false);

  const [idType, setIdType] = useState('')
  const { resumeData, saveResumeData } = useContext(ResumeDataContext);
  const { direction, saveDirection } = useContext(DirectionContext);
  const { showResumeForm, setShowResumeForm } = ResumeFormProps;
  const { setCurrStep } = useContext(StepContext);

  const handleSubmit = (e) => {
    if (!active || !connected) {
      return
    }
    e.preventDefault();
    const newDirection = getDirection(e.target);
    saveDirection(newDirection);
    setCurrStep(2);
    const newResumeData = getResumeData(e.target);
    saveResumeData(newResumeData);
    setShowResumeForm(!showResumeForm);
  }

  const handleIdTypeChange = (e) => {
    const string = e.target.value[0].toUpperCase() + e.target.value.substring(1)
    setIdType(string)
  }

  const closeForm = () => {
    setShowResumeForm(!showResumeForm);
  }

  async function connectEth () {
    try {
      await activate(injected);
    }
    catch(e){
      console.log(e);
    };
  };

  async function connectSol () {
    if (!walletSelected) {
      console.log("selecting Wallet");
      setWalletSelected(true);
      setModalVisible(true);
    }
    else {
      console.log("connecting");
      connect();
    };
  };

  const handleConnect = (e) => {

    e.preventDefault()
    if (!active) {
      connectEth();
    }
    else if (!connected) {
      connectSol();
    }
    else {
      return
    }
  }

  return (
    <div className={styles.resumeForm}>
      <form onSubmit={handleSubmit}>
        <button type='button' onClick={closeForm} className={styles.closeForm}>X</button>
        <h2>Resume Bridge Flow</h2>
        <section className={styles.resumeDirection}>
          <h3>I was bridging between...</h3>  
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
            <h3>I have a...<button type='button' className={styles.help}>?<span className={styles.tooltiptext}>{Tooltip_text} <><br/><br/></> {Tooltip_text2}</span></button></h3>  
          </span>

          <input 
            type="radio" 
            id="txid" 
            name="idType" 
            value="txid" 
            onChange={handleIdTypeChange} 
            required 
          />
          <label for="txid">Tx Hash</label>

          <input 
            type="radio" 
            id="vaa" 
            name="idType" 
            value="vaa" 
            onChange={handleIdTypeChange}
            required
          />
          <label for="vaa">Vaa</label>
        </div>
        <textarea name="resumeInfo" id="resumeInfo" cols="30" rows="4" required minLength={64} placeholder='paste txid/vaa here'></textarea>
        {active && connected ?
        <button type='submit' className={styles.resumeSubmitBtn}>{`Submit ${idType}`}</button>
        :
        <button className={styles.resumeSubmitBtn} onClick={handleConnect}>Connect Wallets</button>
        }
      </form>
    </div>
  );
};