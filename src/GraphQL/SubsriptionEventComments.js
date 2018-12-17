export const subscribeToEventCommentsQuery = `
subscription($eventId: String!) {
  subscribeToEventComments(eventId: $eventId) {
    eventId
    commentId
  }
}`;
