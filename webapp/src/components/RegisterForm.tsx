import styled from '@emotion/styled';
import { COLORS } from '../utils/constants';

export const RegisterForm = () => {
  return (
    <RegisterContainer>
      yo
    </RegisterContainer>
  )
}

const RegisterContainer = styled.div`
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