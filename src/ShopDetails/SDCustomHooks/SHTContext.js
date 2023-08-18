import { createContext, useState } from 'react';

const ShopHomeTabsContext = createContext({
  value: 0,
  setValue: () => {},
});

export const ShopHomeTabsProvider = ({ children }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const contextValue = {
    value,
    setValue: handleChange,
  };

  return (
    <ShopHomeTabsContext.Provider value={contextValue}>
      {children}
    </ShopHomeTabsContext.Provider>
  );
};

export default ShopHomeTabsContext;