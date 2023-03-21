import styled from '@emotion/styled';
import { COLORS } from '../utils/constants';
import { RouteButton } from '../components/RouteButton';
import { Authenticate } from '../components/Authenticate';

export const Navbar = () => {
  return (
    <NavbarContainer>
      <RouteButton text='userauth webapp' href='/' />
      <Stretcher />
      <Authenticate />
    </NavbarContainer>
  )
}

export const NavbarContainer = styled.div`
  background-color: ${COLORS.navbg};
  height: 3em;
  width: 100%;
  padding: 0px 40px 0px 40px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  color: ${COLORS.text}
`;

const Stretcher = styled.div`
  flex-grow: 1;
`