import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: "Account";
  createdAt: Scalars["String"];
  id: Scalars["Float"];
  updatedAt: Scalars["String"];
  username: Scalars["String"];
};

export type AccountResponse = {
  __typename?: "AccountResponse";
  account?: Maybe<Account>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createPost: Post;
  deletePost: Scalars["Boolean"];
  login: AccountResponse;
  register: AccountResponse;
  updatePost?: Maybe<Post>;
};

export type MutationCreatePostArgs = {
  title: Scalars["String"];
};

export type MutationDeletePostArgs = {
  id: Scalars["Float"];
};

export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};

export type MutationUpdatePostArgs = {
  id: Scalars["Float"];
  title?: Maybe<Scalars["String"]>;
};

export type Post = {
  __typename?: "Post";
  createdAt: Scalars["String"];
  id: Scalars["Float"];
  title: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  bye: Scalars["String"];
  hello: Scalars["String"];
  me?: Maybe<Account>;
  post?: Maybe<Post>;
  posts: Array<Post>;
};

export type QueryPostArgs = {
  id: Scalars["Float"];
};

export type UsernamePasswordInput = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "AccountResponse";
    account?:
      | {
          __typename?: "Account";
          id: number;
          username: string;
          createdAt: string;
          updatedAt: string;
        }
      | null
      | undefined;
    errors?:
      | Array<{ __typename?: "FieldError"; message: string; field: string }>
      | null
      | undefined;
  };
};

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type RegisterMutation = {
  __typename?: "Mutation";
  register: {
    __typename?: "AccountResponse";
    errors?:
      | Array<{ __typename?: "FieldError"; field: string; message: string }>
      | null
      | undefined;
    account?:
      | { __typename?: "Account"; id: number; username: string }
      | null
      | undefined;
  };
};

export const LoginDocument = gql`
  mutation Login($options: UsernamePasswordInput!) {
    login(options: $options) {
      account {
        id
        username
        createdAt
        updatedAt
      }
      errors {
        message
        field
      }
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const RegisterDocument = gql`
  mutation Register($options: UsernamePasswordInput!) {
    register(options: $options) {
      errors {
        field
        message
      }
      account {
        id
        username
      }
    }
  }
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
