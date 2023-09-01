import React, {useContext} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useMenuData from '../MenuCustomHook/useMenuData';
import useVendor from '../../../SDCustomHooks/useVendor';
import ShopHomeTabsContext from '../../../SDCustomHooks/SHTContext';
import { useParams } from 'react-router-dom';

const style = {
    width: '100%',
    bgcolor: 'background.paper',
    fontSize: '100%'
};
//ShopDetail 메뉴 더보기 
function MenuSeeMore() {
    const menuDataList = useMenuData();
    const displayData = menuDataList.slice(0, 3); 
    const {vendorId} = useParams();
    const { vendor } =  useVendor(vendorId);
    const { setValue, selectedVendor } = useContext(ShopHomeTabsContext);
    
    const handleMenuClick = () => {
        setValue(1); //메뉴 탭 이동
      };

    return (
        <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem>
          <ListItemText primary="메뉴" />
          <KeyboardArrowRightIcon />
        </ListItem>
        <Divider />
        {displayData.map(menuDataItem => (
        <ListItem key={menuDataItem.id}>
          <ListItemText primary={menuDataItem.menuName} />
          <ListItemText primary={`${menuDataItem.price} 원`} sx={{textAlign: 'right'}}/>
        </ListItem>
    ))}
        <ListItem sx={{ justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={handleMenuClick}
            sx={{
              width: '80vw',
              borderColor: '#000000',
              borderWidth: '1px',
              color: '#000000',
              fontSize: '90%',
            }}
          >
            메뉴 전체보기
            <KeyboardArrowRightIcon />
          </Button>
        </ListItem>
      </List>
    );
}

export default MenuSeeMore;