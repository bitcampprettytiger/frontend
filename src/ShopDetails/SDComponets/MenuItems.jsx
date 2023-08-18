import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

function MenuItem({ menu, isLast, viewType }) {
  const renderContent = () => {
    if (viewType === 'MenuOrderPage') {
      return (
        <>
          <div className="menu-image">
            <img src={menu.image} alt={menu.name} />
          </div>
          <div className="menu-info">
            <h3>{menu.name}</h3>
            <p className="menu-description">{menu.description}</p>
            <p className="menu-price">가격: {menu.price}원</p>
          </div>
        </>
      );
    } else if (viewType === 'MenuSeeMore') {
      return <ListItemText primary={menu.name} />;
    } else {
      return null;
    }
  };

  return (
    <React.Fragment>
      <ListItem>
        {renderContent()}
      </ListItem>
      {!isLast && <Divider />}
    </React.Fragment>
  );
}

export default MenuItem;
