import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";

import moment from "moment";

import QueryGetEvent from "../GraphQL/QueryGetEvent";
import SubsriptionEventComments from "../GraphQL/SubsriptionEventComments";

import NewComment from "./NewComment";

const Comment = comment => {
  return (
    <div className="comment" key={comment.commentId}>
      <div className="avatar">
        <i className="icon user circular" />
      </div>
      <div className="content">
        <div className="text">{comment.content}</div>
        <div className="metadata">
          {moment(comment.createdAt).format("LL, LT")}
        </div>
      </div>
    </div>
  );
};

function EventComments({ comments: { items }, eventId, subscribeToComments }) {
  const [subscription, setSubscription] = useState();

  useEffect(
    () => {
      setSubscription(subscribeToComments());
    },
    () => {
      subscription();
    }
  );

  return (
    <div className="ui items">
      <div className="item">
        <div className="ui comments">
          <h4 className="ui dividing header">Comments</h4>
          {[]
            .concat(items)
            .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
            .map(Comment)}
          <NewComment eventId={eventId} />
        </div>
      </div>
    </div>
  );
}

const EventCommentsWithData = graphql(QueryGetEvent, {
  options: ({ eventId: id }) => ({
    fetchPolicy: "cache-first",
    variables: { id }
  }),
  props: props => ({
    comments: props.data.getEvent
      ? props.data.getEvent.comments
      : { items: [] },
    subscribeToComments: () =>
      props.data.subscribeToMore({
        document: SubsriptionEventComments,
        variables: {
          eventId: props.ownProps.eventId
        },
        updateQuery: (
          prev,
          {
            subscriptionData: {
              data: { subscribeToEventComments }
            }
          }
        ) => {
          const res = {
            ...prev,
            getEvent: {
              ...prev.getEvent,
              comments: {
                __typename: "CommentConnections",
                ...prev.getEvent.comments,
                items: [
                  ...prev.getEvent.comments.items.filter(
                    c => c.commentId !== subscribeToEventComments.commentId
                  ),
                  subscribeToEventComments
                ]
              }
            }
          };

          return res;
        }
      })
  })
})(EventComments);

export default EventCommentsWithData;
