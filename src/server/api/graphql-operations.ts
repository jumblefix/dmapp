import { gql } from 'apollo-server-core';

export const user = {
  name: 'someone',
  email: 'testing@gmail.com',
  password: '123456',
  mobile: '1232323232',
};

export const registerMutation = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      name
      email
    }
  }
`;

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
    }
  }
`;

export const logoutMutation = gql`
  mutation {
    logout
  }
`;

export const meQuery = gql`
  {
    me {
      name
      email
    }
  }
`;

export const getUserQuery = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
      name
      email
    }
  }
`;

export const isEmailExistsQuery = gql`
  query IsEmailExists($email: String!) {
    isEmailExists(email: $email)
  }
`;

export const resendVerifySignup = gql`
  mutation {
    resendVerifySignup
  }
`;

export const forgotPasswordMutation = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const changePasswordMutation = gql`
  mutation ChangePassword($oldPassword: String!, $password: String!) {
    changePassword(oldPassword: $oldPassword, password: $password) {
      name
      email
    }
  }
`;

export const verifyForgotPasswordMutation = gql`
  mutation VerifyForgotPassword(
    $token: String!
    $password: String!
    $confirmPassword: String!
  ) {
    verifyForgotPassword(
      token: $token
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
    }
  }
`;

export const changeEmailMutation = gql`
  mutation ChangeEmail($email: String!) {
    changeEmail(email: $email) {
      name
      email
    }
  }
`;

export const listProductsQuery = gql`
  query ListProduct($page: Float) {
    listProducts(page: $page) {
      title
      id
    }
  }
`;

export const getProductQuery = gql`
  query GetProduct($id: String!) {
    getProduct(id: $id) {
      title
      id
    }
  }
`;

export const getProductsByCategoryQuery = gql`
  query GetProduct($categoryId: String!) {
    getProductsByCategory(categoryId: $categoryId) {
      title
      id
    }
  }
`;

export const getCategoryByIdQuery = gql`
  query GetCategory($id: String!) {
    getCategoryById(id: $id) {
      name
      id
    }
  }
`;

export const addProductMutation = gql`
  mutation AddProduct($data: ProductInput!) {
    addProduct(data: $data) {
      title
      price
      category {
        name
      }
    }
  }
`;

export const addCategoryMutation = gql`
  mutation AddCategory($name: String!) {
    addCategory(name: $name) {
      name
    }
  }
`;

export const addCategoryWithParentMutation = gql`
  mutation AddCategory($name: String!, $parentId: String) {
    addCategory(name: $name, parentId: $parentId) {
      name
    }
  }
`;

export const removeCategoryMutation = gql`
  mutation RemoveCategory($id: String) {
    removeCategory(id: $id)
  }
`;

export const getMainCategoryQuery = gql`
  query {
    getMainCategory {
      name
    }
  }
`;

export const getChildCategoriesQuery = gql`
  query GetChildCategories($id: String!) {
    getChildCategories(id: $id) {
      name
      children {
        name
      }
    }
  }
`;
export const getBreadCrumbPathQuery = gql`
  query GetBreadCrumbPath($id: String!) {
    getBreadCrumbPath(id: $id) {
      name
      parent {
        name
      }
    }
  }
`;

export const getCartQuery = gql`
  query {
    getCart {
      title
      product {
        title
      }
      user {
        name
      }
    }
  }
`;

export const addToCartMutation = gql`
  mutation AddToCart($productId: String!) {
    addToCart(productId: $productId) {
      title
    }
  }
`;

export const removeFromCartMutation = gql`
  mutation RemoveFromCart($cartId: String!) {
    removeFromCart(cartId: $cartId)
  }
`;

export const emptyCartMutation = gql`
  mutation {
    emptyCart
  }
`;

export const getCategoryBySlugQuery = gql`
  query GetCategoryBySlugQuery($slug: String!) {
    getCategoryBySlug(slug: $slug) {
      name
      slug
    }
  }
`;

export const updateCartMutation = gql`
  mutation UpdateCartMutation($cartId: String!, $quantity: Float!) {
    updateCart(cartId: $cartId, quantity: $quantity)
  }
`;
