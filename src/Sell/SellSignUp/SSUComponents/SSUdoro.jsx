import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const SSUdoro = ({ roadNumber, setRoadNumber }) => {
  const handleSearch = () => {
    // 조회 버튼 클릭 시 실행할 로직
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <label>도로점유허가증</label>
      <TextField
        type="text"
        placeholder="도로점유허가증 번호 입력"
        style={{ width: '70%', margin: '10px 0' }}
        value={roadNumber} // 여기에 value 속성을 추가
        onChange={(e) => setRoadNumber(e.target.value)} // 여기에 onChange 속성을 추가
      />
      <Button
        onClick={handleSearch}
        variant="contained"
        color="primary"
        style={{ marginBottom: '10%' }}
      >
        조회
      </Button>
    </Box>
  );
};

export default SSUdoro;
