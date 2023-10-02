import chainConfig from "../../../config/chains.json"
import styles from '../../../styles/mystyle.module.css';
import { ChainCard } from './ChainCard';
import { SearchField } from "./SearchField";
import Select from 'react-select'

export const Dropdown = ({key}) => { 
  const formatOptionLabel = ({ value, label, customAbbreviation }) => (
    <div style={{ display: "flex" }}>
      <div>{label}</div>
      <div style={{ marginLeft: "10px", color: "#ccc" }}>
        {value}
      </div>
    </div>
  );

  return (
    <Select 
      defaultValue={chainConfig.chains[key]}
      formatOptionLabel={formatOptionLabel}
      options={chainConfig.chains}
    />
  )
}