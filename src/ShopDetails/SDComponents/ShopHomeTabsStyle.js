import { styled } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export const StyledAppBar = styled(Tabs)`
  width: 100%;
  & .MuiTabs-flexContainer {
    justify-content: space-between; 
  }
  & .Mui-selected {
    font-weight: bold;
    color: black;
  }
  & .MuiTabs-indicator {
    background-color: #FF745A;
  }
`;

export const StyledTab = styled(Tab)`
  flex: 1;
  font-size: 115%;
  color: black;

  &:active {
    background-color: #FF745A;
    transition: background-color 0.3s ease;
  }

  &.Mui-selected {
    background-color: white;
    font-weight: bold;
    color: black;
  }
`;
export const WrapBox = styled(Box)`
  borderBottom: 1 
  borderColor: divider 
  pb: 8% 
  height: calc(84% - appBarHeight)
  overflowY: auto 
`;