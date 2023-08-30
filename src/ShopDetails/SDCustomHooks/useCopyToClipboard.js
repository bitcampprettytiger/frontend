import { useCallback } from 'react';

function useCopyToClipboard() {
  const copyToClipboard = useCallback((text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        function () {
          console.log('복사 성공');
        },
        function (err) {
          console.error('클립보드 복사 실패', err);
        }
      );
    }
  }, []);

  return copyToClipboard;
}

export default useCopyToClipboard;