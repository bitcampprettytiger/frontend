import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MenuItem from './MenuItems';
import shopList from '../../DataEx/shop'

const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
    fontSize: '100%'
};

function MenuSeeMore() {
    const menuItems = shopList.slice(0, 3);

    return (
        <List sx={style} component="nav" aria-label="mailbox folders">
            <ListItem>
                <ListItemText primary="메뉴" />
                <KeyboardArrowRightIcon />
            </ListItem>
            <Divider />
            {menuItems.map((menu, index) => (
                <MenuItem
                    key={index}
                    menu={menu}
                    viewType="MenuSeeMore"
                    isLast={index === menuItems.length - 1}
                />
            ))}
            <ListItem sx={{ justifyContent: 'center' }}>
                <Button
                    variant="outlined"
                    sx={{
                        width: '70vw',
                        borderColor: '#000000',
                        borderWidth: '1px',
                        color: '#000000',
                        fontSize: '90%'
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