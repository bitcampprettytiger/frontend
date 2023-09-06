import styled from 'styled-components';

export const StyledMenuList = styled.div`
  width: 100%;
`;

export const StyledMenuItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;

  .menu-image {
    width: 20%;
    height: 20%;
    margin-right: 20%; 

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 5px; 
    }
  }

  .menu-info {
    text-align: left;

    h3 {
      margin: 0;
      margin-bottom: 10%;
    }

    .menu-description {
      margin: 0;
      margin-bottom: 10%;
      color: grey;  
    }

    .menu-price {
      margin: 0;
      color: #FD5E53;
    }
  }
`;