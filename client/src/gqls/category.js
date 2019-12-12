import gql from "graphql-tag";

export const getCategoriesGQL = gql`
  query {
    getCategories {
      id
      name
    }
  }
`;

export const addCategoryGQL = gql`
  mutation($name: String!) {
    addCategory(name: $name) {
      id
      name
    }
  }
`;

export const editCategoryGQL = gql`
  mutation($name: String!, $id: String!) {
    editCategory(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const deletCategoryGQL = gql`
  mutation($id: String!) {
    deleteCategory(id: $id) {
      id
      name
    }
  }
`;
