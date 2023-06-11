import React from 'react';
import { Container, ListItemContainer } from './list.style';

interface ListProps {
  children: React.ReactNode
}

export const List = (props: ListProps) => {
  return (
    <Container>
      {props.children}
    </Container>
  );
}

List.Item = (props: ListProps) => {
  const { children } = props;
  
  return (
    <ListItemContainer>{children}</ListItemContainer>
  );
};