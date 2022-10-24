import styled from "styled-components";

export const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
`;

export const CategoryHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const CategoryTitle = styled.div`
  margin-top: 20px;
  font-size: 38px;
  margin-bottom: 25px;
`;

export const TitleDecoration = styled.span`
  padding: 3px 14px;
  border: 2px solid black;
`;
