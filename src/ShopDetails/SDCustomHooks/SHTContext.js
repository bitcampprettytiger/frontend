import { createContext, useState, useCallback } from 'react';

const ShopHomeTabsContext = createContext({
  value: 0,
  setValue: () => {},
  loadMoreData: () => {},
  handleVisibilityChange: () => {},
});

export const ShopHomeTabsProvider = ({ children }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loadMoreData = useCallback(() => {
    // 데이터 추가 로직
  }, []);

  const handleVisibilityChange = (inView, entry) => {
    if (inView) {
      loadMoreData();
    }
  };

  const contextValue = {
    value,
    setValue,
    handleChange,
    loadMoreData,
    handleVisibilityChange,
  };

  return (
    <ShopHomeTabsContext.Provider value={contextValue}>
      {children}
    </ShopHomeTabsContext.Provider>
  );
};

export default ShopHomeTabsContext;