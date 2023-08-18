import { styled } from '@mui/system';
import { Box, Tab, Tabs, Typography } from '@mui/material';

export const CustomTabPanel = styled((props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
})``;

export const CustomTab = styled(Tab)`
  font-size: 115%;
`;

export const AppBar = styled((props) => {
  const { value, onChange, children, ...other } = props;
  return (
    <Tabs
      value={value}
      onChange={onChange}
      aria-label="ShophHomeTabs"
      variant="fullWidth"
      {...other}
    >
      {children}
    </Tabs>
  );
})`
  & .Mui-selected {
    font-weight: bold;
    color: black;
  }
  & .MuiTabs-indicator {
    background-color: ${(props) => props.theme.palette.primary.main};
  }
`;
