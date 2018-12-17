export const deleteEventQuery = `
mutation($id: ID!) {
  deleteEvent(id: $id) {
    id
    name
    where
    when
    description
    comments {
      items {
        commentId
      }
    }
  }
}`;
