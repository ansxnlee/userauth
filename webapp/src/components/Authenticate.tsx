import styled from '@emotion/styled';
import { RouteButton } from '../components/RouteButton';

export const Authenticate = () => {
  return (
    <Container>
      <RouteButton text='Login' href='/login' />
      <RouteButton text='Register' href='/register' border={true} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;