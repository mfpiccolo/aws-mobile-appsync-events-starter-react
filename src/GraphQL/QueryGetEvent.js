export const getEventQuery = `
query($id: ID!) {
  getEvent(id: $id) {
    id
    name
    where
    when
    description
    comments {
      __typename
      items {
        commentId
        content
        createdAt
      }
    }
  }
}`;
