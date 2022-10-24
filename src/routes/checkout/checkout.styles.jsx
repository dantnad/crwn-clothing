import styled from "styled-components";

export const Checkout = styled.div`
  width: 55%;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0;
  text-align: left;
`;

export const CheckoutTable = styled.table`
  border-collapse: collapse;
`;

export const CheckoutHeader = styled.tr`
  width: 100%;
`;

export const HeaderCell = styled.td`
  text-transform: capitalize;
  width: 25%;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
`;

export const CartEmpty = styled.div`
  text-align: center;
`;

export const CartTotal = styled.div`
  margin-top: 30px;
  margin-left: auto;
  font-size: 36px;
`;
