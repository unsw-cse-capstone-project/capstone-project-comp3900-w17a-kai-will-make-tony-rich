import React from 'react';
import styled from 'styled-components';
import Buttons from '../components/Buttons';

const Main = styled.main`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  & > h1, h2 {
    margin: 0;
  }

  & > h1 {
    font-size: 8vw;
  }

  & > h2 {
    font-size: 3vw;
  }
`;

export default function Home({login}) {
  return (
    <Main>
      <h1>Recruit Assistant</h1>
      <h2>Find your dream job today. Without the hassle.</h2>
      <Buttons
        primaryRoute='register'
        secondaryRoute='login'
        primaryInnerText='Register'
        secondaryInnerText='Login'
        login={login}
      />
    </Main>
  )
}