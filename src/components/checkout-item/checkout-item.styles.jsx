import styled from "styled-components";

export const CheckoutItemImage = styled.td`
  width: 30%;
  padding: 20px 30px 20px 0;
  border-bottom: 1px solid darkgrey;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const CheckoutRemove = styled.td`
  button {
    font-size: large;
    cursor: pointer;
  }
  border-bottom: 1px solid darkgrey;
  padding: 20px 0;
`;

export const CheckoutArrow = styled.button`
  cursor: pointer;
  font-size: large;
  background-color: transparent;
  border: none;
`;

export const CheckoutItemCount = styled.span`
  margin: 0 10px;
`;

export const CheckoutItemContainer = styled.tr`
  width: 100%;
  min-height: 100px;
`;

export const CheckoutItemData = styled.td`
  padding: 20px 0;
  font-size: 20px;
  border-bottom: 1px solid darkgrey;
`;
