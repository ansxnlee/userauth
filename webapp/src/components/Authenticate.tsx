import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { COLORS } from '../utils/constants';
import { RouteButton } from '../components/RouteButton';
import { logout, connCheck } from '../utils/axios';
import { Link } from 'react-router-dom';

export const Authenticate = () => {
  const [auth, setAuth] = useState(0);
  const [username, setUsername] = useState('');
  // wait for axios promise before rendering
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    conninfoHandler();
  }, [auth]);

  const conninfoHandler = async () => {
    setLoading(true);
    const sess = await connCheck();
    setAuth(Number(sess.response));
    setUsername(sess.username);
    setLoading(false);
  }

  const logoutHandler = () => {
    setLoading(true);
    logout();
    setAuth(0);
    setLoading(false);
  }

  if(isLoading) {
    return <Container>Loading...</Container>
  }
  return (
    <Container>
      {auth === 1
        ? <>
          <div>Welcome back, {username}!</div>
          <LogoutBtn onClick={logoutHandler} to='/'>Logout</LogoutBtn>
        </>
        : <>
          <RouteButton text='Login' href='/login' />
          <RouteButton text='Register' href='/register' border={true} />
        </>
      }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoutBtn = styled(Link)`
  padding: 6px 8px 6px 8px;
  margin: 0px 0px 0px 5px;
  background-color: ${COLORS.navbg};
  border: solid;
  border-color: ${COLORS.text};
  border-width: thin;
  border-radius: 5px;
  color: ${COLORS.text};
  text-decoration: none;
  &:hover {
    color: ${COLORS.highlight};
    border-color: ${COLORS.highlight};
    cursor: pointer;
  }
`;