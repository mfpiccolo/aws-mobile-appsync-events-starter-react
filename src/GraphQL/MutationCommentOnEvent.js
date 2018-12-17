export const commentOnEventQuery = `
mutation MutationCommentOnEvent($eventId: ID! $content: String! $createdAt: String!) {
  commentOnEvent(
    eventId: $eventId
    content: $content
    createdAt: $createdAt
  ) {
    eventId
    commentId
    content
    createdAt
  }
}`;
