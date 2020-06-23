import gql from 'graphql-tag'

export const GET_ALL_POSTS = gql`query Posts {
  posts {
    id
    title
    createdAt
    comments {
      id
      postId
      content
    }
  }
}`

export const GET_POST = gql`query Post($id: id) {
  post (id: $id) {
    id
    title
    createdAt
    comments {
      id
      postId
      content
    }
  }
}`
