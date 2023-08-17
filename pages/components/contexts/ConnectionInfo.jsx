import { createContext, useState } from "react";

const ConnectionInfoContext = createContext(null);

export const ConnectionInfoContextProvider = ({ children }) => {
  const [Accounts, setAccounts] = useState(undefined)

  const saveAccounts = (value) => {
    setAccounts(value)
  }

  return (
    <ConnectionInfoContext.Provider 
      value={{ Accounts , saveAccounts }}
      >
      { children }
    </ConnectionInfoContext.Provider>
  );
};

export const ConnectionInfoConsumer = ConnectionInfoContext.Consumer;

export default ConnectionInfoContext;