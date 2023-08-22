import { useState, useCallback } from 'react';

const useCopyPaste = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.log('복사 실패', err);
        setIsCopied(false);
      });
  }, []);

  return [isCopied, copyToClipboard];
};

export default useCopyPaste;
