import { useContext, useState } from 'react';
import styles from '../../../styles/mystyle.module.css'
import { useEffect } from 'react';
import ContactContext from '../contexts/contactContext';

// IMPLEMENT POP UP WHEN SELECTING STEP 2 COMPONENT / STARTING FLOW (ASK FOR INPUT)
// Implement resume bridge support
// CONTACT INFO CONTEXT 
// BUILD TG BOT EMAIL BACKEND FOR TXS AND IMPLEMENT API CALLS FOR TX'S
// implement api calls for bot
// LOOK INTO GDPR AND PRIVACY LAWS REGARDING REQUESTING TGID/EMAILS

export const BridgeWarning = () => {
  const emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
  const tgidRegex = new RegExp("^@+[a-zA-Z0-9+_.-]");

  const [ deliverySelection, setDeliverySelection ] = useState('');
  const [ contactInfo, setContactInfo ] = useState(useContext(ContactContext));
  const [ understood, setUnderstood ] = useState(false);
  const [ infoIsValid, setInfoIsValid ] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (understood && infoIsValid) {
      const bridgeWarning = document.getElementById('bridgeWarningComponent')
      bridgeWarning.style.display = 'none'
    }
    else {
      console.log('display error');
    }
  }

  const handleChangeInfo = (e) => {
    e.preventDefault()
    const info = e.target.value;

    if (deliverySelection === 'email') {
      //Check for correct Formatting an email prefix and an email domain
      if (emailRegex.test(info)) {
        setContactInfo(e.target.value);
        setInfoIsValid(true);
      }
      else {
        setInfoIsValid(false);
        console.log('error');
      }
    }

    else if (deliverySelection === 'tgid') {
      let tgid;
      if (info.substring(0,1) == '@') {
        tgid = info;
      }
      else {
        tgid = '@' + info;
        console.log(tgid);
      }
      //Check for correct Formatting  * Usernames must be a minimum of five characters and can contain letters, numbers and underscores.
      if (tgid.length >= 6 && tgidRegex.test(tgid)) {
        setContactInfo(e.target.value);
        setInfoIsValid(true);
      }
      else {
        console.log('error');
        setInfoIsValid(false);
      }
    }
    else {
      console.log('No Selection');
      setInfoIsValid(false);
    }
  }

  const handleChangeDelivery = (e) => {
    setDeliverySelection(e.target.value);
  }
  
  useEffect(() => {console.log(understood);},[understood])
  useEffect(() => {console.log(deliverySelection)},[deliverySelection])
  useEffect(() => {console.log(contactInfo)},[contactInfo])


  return (
    <div className={styles.bridgeWarningWrapper} id='bridgeWarningComponent'>
      <div className={styles.bridgeWarning}>
        <div className={styles.warningContent}>
          <h2 className={styles.warningHeading}>Before you <span>Bridge!</span></h2>
          <p className={styles.warningParagraph}>
            To bridge your ISC you will have to complete several steps. These steps may take up to 20 minutes and/or fail. If you wish to receive updates and links to resume the process, please enter your Telegram ID or E-mail below and indicate your choice.
          </p>

          <form onSubmit={handleSubmit} className={styles.warningForm}>
            <div className={styles.flexRow}>
              <input 
                type="radio" 
                id="tgid" 
                name="delivery_method" 
                value="tgid" 
                onChange={(e) => handleChangeDelivery(e)} 
                required  
              />
              <label for="tgid">Telegram ID</label>

              <input 
                type="radio" 
                id="email" 
                name="delivery_method" 
                value="email" 
                onChange={(e) => handleChangeDelivery(e)}  
                required
              />
              <label for="email">E-mail</label>
            </div>

            <input type='text' 
              name="contact_info" 
              onChange={handleChangeInfo} 
              placeholder={deliverySelection == 'tgid' ? '@' : 'abc@isc.money'} 
              minlength="5" 
              required
            />

            <div className={styles.agreeBox}>
              <input 
                type='checkbox' 
                id='agree' 
                onChange={() => setUnderstood(!understood)} 
                required
              />
              <label for="agree">I Understand</label>
            </div>

            <input 
              type="submit"  
              value="Submit" 
              className={styles.warningSubmit} 
            />
          </form>
        </div>

        <div className={styles.bridgeWarningDecor}>
          <div className={styles.line1}>{/* line 1 */}</div>
          <div className={styles.line2}>{/* line 2 */}</div>
          <div className={styles.line3}>{/* line 3 */}</div>
          <div className={styles.line4}>{/* line 4 */}</div>
          <img className={styles.warningIcon} src='./new/warning.svg'>{/* Warning Icon */}</img>
        </div>
      </div>
    </div>
  )
}