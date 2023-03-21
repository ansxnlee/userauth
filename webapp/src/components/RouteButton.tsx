import styled from '@emotion/styled';
import { COLORS } from '../utils/constants';
import { RouteButtonProps } from '../utils/types';

/**
 * Button that routes to a specified page
 * @param text - button text
 * @param href - route url
 * @param border - alt. button styling
 */
export const RouteButton = ({ text, href, border }: { text?: string, href?: string, border?: boolean }) => {
  return (
    <a href={href}>
      <Button border={border}>{text}</Button>
    </a>
  )
}

const Button = styled.button<RouteButtonProps>`
  padding: 6px 8px 6px 8px;
  background-color: ${COLORS.navbg};
  border: ${(props) => (props.border ? 'solid' : 'none' )};
  border-color: ${COLORS.text};
  border-width: thin;
  border-radius: 5px;
  color: ${COLORS.text};
  &:hover {
    color: ${COLORS.highlight};
    border-color: ${COLORS.highlight};
    cursor: pointer;
  }
`;
