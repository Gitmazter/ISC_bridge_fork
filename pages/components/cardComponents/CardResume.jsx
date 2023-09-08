import { useEffect, useState } from 'react'
import styles from '../../../styles/mystyle.module.css'
import { useConnection  } from '@solana/wallet-adapter-react'
import useBrideDirection from '../hooks/useBrideDirection'
import { Connection } from '@solana/web3.js'


export const CardResumeSend = ({setStep1}) => {
  const [ expand, setExpand ] = useState(false)
  const [ value, setValue ] = useState('')
  const [ type, setType ] = useState(null)
  const {connection} = useConnection()
  const {direction} = useBrideDirection()
  const solConnection = new Connection("http://localhost:8899", "confirmed")


  const toggleExpand = () => {
    setExpand(!expand);
  }

  const handleSubmit = () => {
    setStep1(value)
  }

  return(
    <>
      <div>
        Resume With Tx Hash? 
        
        {
          expand
          ? 
          <> 
            <form onSubmit={handleSubmit}>
                <textarea rows={3} cols={70} name='input' placeholder='txHash/vaa'onChange={(e) => setValue(e.target.value)} ></textarea>
                <button type='submit' value='submit'>Submit</button>
            </form>
            <button type='button' onClick={toggleExpand}>Close</button>
          </>
          :
          <button type='button' onClick={toggleExpand}>OK</button>
        }
      </div>
    </>
  )
}





export const CardResumeReceive = ({setStep2}) => {
  const [expand, setExpand] = useState(false);
  const [ value, setValue ] = useState('');
 
  const toggleExpand = () => {
    setExpand(!expand);
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStep2(value);
  }

  useEffect(()=>{console.log(value);},[value])

  return(
    <>
      <div>
        Resume Step With VAA?
        {
          expand
          ? 
          <> 
            <form onSubmit={handleSubmit}>
                <textarea rows={3} cols={70} name='input' placeholder='txHash/vaa'onChange={(e) => setValue(e.target.value)} ></textarea>
                <button type='submit' value='submit'>Submit</button>
            </form>
            <button type='button' onClick={toggleExpand}>Close</button>
          </>
          :
          <button type='button' onClick={toggleExpand}>OK</button>
        }
      </div>
    </>
  )
}