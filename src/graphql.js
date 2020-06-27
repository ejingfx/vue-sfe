import gql from 'graphql-tag'

export const GET_POSTS = gql`
  query Posts {
    posts {
      id
      title
      createdAt
      comments {
        id
        postId
        content
        createdAt
      }
    }
  }
`

export const GET_PAGINATED_POSTS = gql`
  query Posts($pagination: Pagination) {
    posts(pagination: $pagination) {
      id
      title
      createdAt
      comments {
        id
        postId
        content
        createdAt
      }
    }
  }
`

export const GET_POST = gql`
  query Post($id: Int) {
    post (id: $id) {
      id
      title
      image
      content
      createdAt
      comments {
        id
        postId
        content
        createdAt
      }
    }
  }
`

export const AUTHENTICATE = gql`
  mutation ($email: String!, $password: String!) {
    authenticate(email: $email, password: $password)
  }
`

export const REGISTER = gql`
  mutation ($email: String!, $password: String!) {
    register(email: $email, password: $password)
  }
`
