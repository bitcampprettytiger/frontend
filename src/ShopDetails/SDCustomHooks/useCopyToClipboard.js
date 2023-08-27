import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { Box } from '@mui/system';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = React.useState(false);

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        function () {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 600); // 모달창을 0.6초 동안 보여줌
        },
        function (err) {
          console.error('클립보드 복사 실패', err);
        }
      );
    }
  };

  return { copyToClipboard, isCopied };
};

export default function CopyToClipboardButton() {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  return (
    <div>
      <button onClick={() => copyToClipboard("복사할 텍스트")}>복사하기</button>
      <Dialog
        open={isCopied}
        PaperProps={{
          style: {
            width: '30%',
            height: '10%',
            backgroundColor: 'white',
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          },
        }}
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Box color="black">복사되었습니다</Box>
      </Dialog>
    </div>
  );
}
