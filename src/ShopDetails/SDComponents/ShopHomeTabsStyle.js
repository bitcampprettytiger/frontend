import { styled } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export const StyledAppBar = styled(Tabs)`
  & .Mui-selected {
    font-weight: bold;
    color: black;
  }
  & .MuiTabs-indicator {
    background-color: #FF745A;
  }
`;

export const StyledTab = styled(Tab)`
  font-size: 115%;
`;
