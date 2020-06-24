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
