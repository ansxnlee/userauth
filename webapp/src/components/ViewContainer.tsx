import styled from '@emotion/styled';
import { COLORS } from '../utils/constants';

export const ViewContainer = styled.div`
  background-color: ${COLORS.background};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${COLORS.text}
`;