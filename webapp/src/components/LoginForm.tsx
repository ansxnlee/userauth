import React, { useState } from 'react';
import styled from '@emotion/styled';
import { COLORS } from '../utils/constants';
import { login } from '../utils/axios';

export const LoginForm = () => {
  const [userval, setuserval] = useState('');
  const [passval, setpassval] = useState('');

  const uservalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setuserval(event.target.value);
  }

  const passvalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setpassval(event.target.value);
  }

  const formSubmit = () => {
    login(userval, passval);
  }

  return (
    <LoginContainer>
      <TextLabel>Username</TextLabel>
      <TextInput onChange={uservalChange} />
      <TextLabel>Password</TextLabel>
      <TextInput onChange={passvalChange} />
      <FormSubmit onClick={formSubmit} href='/'>Login</FormSubmit>
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 20px 20px 20px;
  padding: 15px 15px 15px 15px;
  background-color: ${COLORS.navbg};
  border: solid;
  border-color: ${COLORS.outline};
  border-width: thin;
  border-radius: 5px;
`;

const TextInput = styled.input`
  padding: 5px 10px 5px 10px;
  margin: 0px 0px 15px 0px;
  color: ${COLORS.text};
  background-color: ${COLORS.bg};
  border: solid;
  border-color: ${COLORS.outline};
  border-width: thin;
  border-radius: 5px;
  transition-duration: 0.4s;
  &:focus {
    outline: none;
    border-color: ${COLORS.inputHighlight};
  }
`;

const TextLabel = styled.div`
  color: ${COLORS.text};
  margin: 5px 5px 5px 5px;
`;

const FormSubmit = styled.a`
  padding: 5px 5px 5px 5px;
  margin: 10px 0px 10px 0px;
  background-color: ${COLORS.buttons};
  border: solid;
  border-color: ${COLORS.outline};
  border-width: thin;
  border-radius: 5px;
  color: ${COLORS.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${COLORS.inputHighlight};
    cursor: pointer;
  }
  &:active {
    background-color: ${COLORS.buttons};
  }
`;