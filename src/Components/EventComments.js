import React from "react";

import NewComment from "./NewComment";
import Comment from "./Comment";

function EventComments({ comments = [], eventId }) {
  // const [subscription, setSubscription] = useState();

  // // Todo: figure out the subscription
  // useEffect(
  //   () => {
  //     setSubscription(subscribeToComments());
  //   },
  //   () => {
  //     subscription();
  //   }
  // );

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
