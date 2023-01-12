import { gql } from "@apollo/client";

export const categoriesQuery = gql`
  query GetCategories {
    categories {
      name
      products {
        id
        brand
        name
        gallery
        prices {
          amount
        }
      }
    }
  }
`;

export const productQuery = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      brand
      name
      id
      gallery
      description
      prices {
        amount
      }
    }
  }
`;

export const productIdsQuery = gql`
  query GetIds {
    category {
      products {
        id
      }
    }
  }
`;
