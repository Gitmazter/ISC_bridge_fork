import styles from '../../../styles/mystyle.module.css'

export const TxSuccessPopup = () => {

  const handleClick = () => {
    const thisComponent = document.getElementById('successPopup');
    thisComponent.style.left = '100vw';
    thisComponent.style.opacity = '0'
  }

  return (
    <div id='successPopup' className={styles.popupWrapper}>
      <div className={styles.popup}>
        <div className={styles.successBanner}>
            <img src='./new/check.svg'/>
            <div className={styles.line1}></div>
            <div className={styles.line2}></div>

        </div>
        <div className={styles.txPopupWrapper}>
          <p className={styles.statusSuccess}>Transaction <span>Successful!</span></p>
          <p className={styles.txid}>0x4dfc6ae36750b78dd7bdc7951478718ed4210a852fc159f5148067a49db6ccb5</p>
          <button onClick={handleClick}>Continue</button>
        </div>
      </div>
    </div>
  )
}