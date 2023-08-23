import { useCallback } from 'react';

function useCopyToClipboard() {
  const copyToClipboard = useCallback((text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        function () {
          console.log('Successfully copied to clipboard');
        },
        function (err) {
          console.error('Failed to copy to clipboard:', err);
        }
      );
    }
  }, []);

  return copyToClipboard;
}

export default useCopyToClipboard;
