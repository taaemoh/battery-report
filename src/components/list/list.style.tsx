import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid #e1dbdb;
  border-radius: 20px;
  overflow: auto;

  & > div:nth-child(odd) {
    background-color: #f9f9f9;
  }

  & > div:nth-child(even) {
    background-color: #fff;
  }
`;

export const ListItemContainer = styled.div`
  color: #541fb7;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-family: Verdana;
  text-transform: lowercase;
  letter-spacing: 1px;
  border-bottom: 1px solid #ebebeb;
  display: flex;

  & > div {
    flex: 1;
    margin-bottom: 14px;
  }
`;
