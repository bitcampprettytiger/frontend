import styled from 'styled-components';

export const StyledMenuList = styled.div`
  width: 100%;
`;

export const StyledMenuItem = styled.div`
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  border-bottom: 0.2px solid #E7E3E3;
  .menu-image {
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 5px;
    }
  }
  .menu-info {
    margin-left: 2vw;
    h3 {
      font-size: 17px;
      font-weight: bold;
      margin-top: 0;
    }
    .menu-description {
      font-size: 13px;
      margin-top : 2;
      margin-bottom: 0;
      color: #9A9696;
    }
    .menu-price {
      color: #FF745A;
      font-size: 14px;
    }
  }
`;