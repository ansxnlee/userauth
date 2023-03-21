import React from 'react';
import { ViewContainer, BodyContainer } from '../components/Containers';
import { Navbar } from '../components/Navbar';

export const App = () => {
  return (
    <ViewContainer>
      <Navbar />
      <BodyContainer>
        dashboard page
      </BodyContainer> 
    </ViewContainer>
  );
}
