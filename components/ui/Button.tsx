import styled from 'styled-components';

export const Button = styled.button`
  color: ${props => props.theme.colors.white};
  border: 2px solid ${props => props.theme.borderRadius};
  background: ${props => props.theme.colors.primary};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
`;
