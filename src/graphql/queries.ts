import { gql } from 'apollo-boost';

export const getMainCategoryQuery = gql`
  query MainCategory {
    getMainCategory {
      id
      name
      slug
    }
  }
`;
