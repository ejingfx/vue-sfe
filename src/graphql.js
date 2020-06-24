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
export const GET_HERO_POSTS = (pagination) => gql`
  query Posts($pagination: pagination) {
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
  query Post($id: id) {
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
  }
`
