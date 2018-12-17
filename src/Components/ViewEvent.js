import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import moment from "moment";

import EventComments from "./EventComments";

import { StoreContext } from "../StoreContext";
import { fetchEvent } from "../actions/events";

function ViewEvent({
  match: {
    params: { id }
  },
  loading
}) {
  const { state, dispatch } = useContext(StoreContext);
  const {
    events: { data: events }
  } = state;
  const event = events.find(e => e.id === id);

  useEffect(() => {
    fetchEvent(dispatch, id);
  }, []);

  return (
    <div
      className={`ui container raised very padded segment ${
        loading ? "loading" : ""
      }`}
    >
      <Link to="/" className="ui button">
        Back to events
      </Link>
      <div className="ui items">
        <div className="item">
          {event && (
            <div className="content">
              <div className="header">{event.name}</div>
              <div className="extra">
                <i className="icon calendar" />
                {moment(event.when).format("LL")}
              </div>
              <div className="extra">
                <i className="icon clock" />
                {moment(event.when).format("LT")}
              </div>
              <div className="extra">
                <i className="icon marker" />
                {event.where}
              </div>
              <div className="description">{event.description}</div>
              <div className="extra">
                <EventComments
                  eventId={event.id}
                  comments={event.comments.items}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewEvent;
