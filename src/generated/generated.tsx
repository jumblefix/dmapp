import gql from 'graphql-tag';
import * as ReactApollo from 'react-apollo';
import * as React from 'react';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Article = {
  __typename?: 'Article';
  id: Scalars['ID'];
  title: Scalars['String'];
  slug: Scalars['String'];
  coverImage?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  rating: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  category: Category;
  tag: Array<Tag>;
};

export type ArticleInput = {
  title: Scalars['String'];
  coverImage?: Maybe<Scalars['String']>;
  rating?: Maybe<Scalars['Float']>;
  description: Scalars['String'];
  categoryId: Scalars['String'];
  tagIds?: Maybe<Array<Scalars['String']>>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  children?: Maybe<Array<Category>>;
  parent?: Maybe<Category>;
  createdAt: Scalars['DateTime'];
  articles: Array<Article>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addArticle: Article;
  addCategory: Category;
  removeCategory: Scalars['Boolean'];
  addTag: Tag;
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  register: User;
  resendVerifySignUp: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  verifyForgotPassword?: Maybe<User>;
  changePassword: User;
  changeEmail: User;
};

export type MutationAddArticleArgs = {
  data: ArticleInput;
};

export type MutationAddCategoryArgs = {
  parentId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type MutationRemoveCategoryArgs = {
  id?: Maybe<Scalars['String']>;
};

export type MutationAddTagArgs = {
  name: Scalars['String'];
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationVerifyForgotPasswordArgs = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};

export type MutationChangePasswordArgs = {
  password: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type MutationChangeEmailArgs = {
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  listArticles: Array<Article>;
  getArticle?: Maybe<Article>;
  getArticlesByCategory: Array<Article>;
  getCategoryById?: Maybe<Category>;
  getCategoryBySlug?: Maybe<Category>;
  getMainCategory: Array<Category>;
  getChildCategories: Category;
  getBreadCrumbPath: Category;
  listTags: Array<Tag>;
  me?: Maybe<User>;
  getUser?: Maybe<User>;
  isEmailExists: Scalars['Boolean'];
};

export type QueryListArticlesArgs = {
  page: Scalars['Float'];
};

export type QueryGetArticleArgs = {
  id: Scalars['String'];
};

export type QueryGetArticlesByCategoryArgs = {
  page: Scalars['Float'];
  categoryId: Scalars['String'];
};

export type QueryGetCategoryByIdArgs = {
  id: Scalars['String'];
};

export type QueryGetCategoryBySlugArgs = {
  slug: Scalars['String'];
};

export type QueryGetChildCategoriesArgs = {
  id: Scalars['String'];
};

export type QueryGetBreadCrumbPathArgs = {
  id: Scalars['String'];
};

export type QueryListTagsArgs = {
  page: Scalars['Float'];
};

export type QueryGetUserArgs = {
  id: Scalars['String'];
};

export type QueryIsEmailExistsArgs = {
  email: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  mobile?: Maybe<Scalars['String']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  article: Array<Article>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  mobile: Scalars['String'];
  confirmed: Scalars['Boolean'];
  profilePic: Scalars['String'];
  createdAt: Scalars['DateTime'];
};
export type RegisterMutationVariables = {
  data: RegisterInput;
};

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'User' } & Pick<User, 'name' | 'email'>;
};

export type MainCategoryQueryVariables = {};

export type MainCategoryQuery = { __typename?: 'Query' } & {
  getMainCategory: Array<
    { __typename?: 'Category' } & Pick<Category, 'id' | 'name' | 'slug'>
  >;
};

export const RegisterDocument = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      name
      email
    }
  }
`;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterMutationVariables
>;
export type RegisterComponentProps = Omit<
  ReactApollo.MutationProps<RegisterMutation, RegisterMutationVariables>,
  'mutation'
>;

export const RegisterComponent = (props: RegisterComponentProps) => (
  <ReactApollo.Mutation<RegisterMutation, RegisterMutationVariables>
    mutation={RegisterDocument}
    {...props}
  />
);

export type RegisterProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterMutationVariables>
> &
  TChildProps;
export function withRegister<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >,
) {
  return ReactApollo.withMutation<
    TProps,
    RegisterMutation,
    RegisterMutationVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, {
    alias: 'withRegister',
    ...operationOptions,
  });
}
export const MainCategoryDocument = gql`
  query MainCategory {
    getMainCategory {
      id
      name
      slug
    }
  }
`;
export type MainCategoryComponentProps = Omit<
  ReactApollo.QueryProps<MainCategoryQuery, MainCategoryQueryVariables>,
  'query'
>;

export const MainCategoryComponent = (props: MainCategoryComponentProps) => (
  <ReactApollo.Query<MainCategoryQuery, MainCategoryQueryVariables>
    query={MainCategoryDocument}
    {...props}
  />
);

export type MainCategoryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<MainCategoryQuery, MainCategoryQueryVariables>
> &
  TChildProps;
export function withMainCategory<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    MainCategoryQuery,
    MainCategoryQueryVariables,
    MainCategoryProps<TChildProps>
  >,
) {
  return ReactApollo.withQuery<
    TProps,
    MainCategoryQuery,
    MainCategoryQueryVariables,
    MainCategoryProps<TChildProps>
  >(MainCategoryDocument, {
    alias: 'withMainCategory',
    ...operationOptions,
  });
}
