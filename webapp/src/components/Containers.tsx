import styled from '@emotion/styled';
import { COLORS } from '../utils/constants';

export const ViewContainer = styled.div`
  background-color: ${COLORS.bg};
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${COLORS.text};
`;

export const BodyContainer = styled.div`
  background-color: ${COLORS.bg};
  min-height: calc(100vh - 3em);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${COLORS.text};
`;