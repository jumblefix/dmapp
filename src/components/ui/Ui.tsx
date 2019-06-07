import styled from 'styled-components';

export const UL = styled.ul`
  padding: 0;
  margin: auto;
`;

export const LI = styled.li`
  list-style: none;
  padding: 1rem 4rem;
  display: inline;
  a {
    font-size: 1.2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    text-decoration: none;
    color: orangered;
    :hover {
      text-decoration: underline;
    }
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
`;
