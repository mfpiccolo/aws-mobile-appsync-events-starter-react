import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import Event from "./Event";

import { StoreContext } from "../StoreContext";
import { fetchEvents, deleteEvent } from "../actions/events";

function AllEvents() {
  let { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    fetchEvents(dispatch);
  }, []);

  const {
    events: { loading, data: events }
  } = state;
  return (
    <div>
      <div className="ui clearing basic segment">
        <h1 className="ui header left floated">All Events</h1>
        <button
          className="ui icon left basic button"
          onClick={() => fetchEvents(dispatch)}
          disabled={loading}
        >
          <i className={`refresh icon ${loading && "loading"}`} />
          Sync with Server
        </button>
      </div>
      <div className="ui link cards">
        <div className="card blue">
          <Link to="/newEvent" className="new-event content center aligned">
            <i className="icon add massive" />
            <p>Create new event</p>
          </Link>
        </div>
        {[]
          .concat(events)
          .sort((a, b) => a.when.localeCompare(b.when))
          .map(event => Event(event, () => deleteEvent(dispatch, event.id)))}
      </div>
    </div>
  );
}

export default AllEvents;
