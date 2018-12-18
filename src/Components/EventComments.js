import React, { useEffect, useContext } from "react";

import NewComment from "./NewComment";
import Comment from "./Comment";

import { StoreContext } from "../StoreContext";
import { subscribeToComments } from "../actions/events";

function EventComments({ comments = [], eventId }) {
  let { state, dispatch } = useContext(StoreContext);

  // Todo: figure out the subscription
  useEffect(() => {
    const subscription = subscribeToComments(dispatch, eventId);
    return () => {
      subscription.then(client => client.end());
    };
  }, []);

  return (
    <div className="ui items">
      <div className="item">
        <div className="ui comments">
          <h4 className="ui dividing header">Comments</h4>
          {[]
            .concat(comments)
            .sort((a, b) => {
              if (!a.createdAt) return -1;
              return a.createdAt.localeCompare(b.createdAt);
            })
            .map(Comment)}
          <NewComment eventId={eventId} />
        </div>
      </div>
    </div>
  );
}
export default EventComments;
