import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const handleDeleteClick = async (event, e, deleteEvent) => {
  e.preventDefault();

  if (window.confirm(`Are you sure you want to delete event ${event.id}`)) {
    await deleteEvent(event);
  }
};

const Event = (event, deleteEvent) => {
  return (
    <Link to={`/event/${event.id}`} className="card" key={event.id}>
      <div className="content">
        <div className="header">{event.name}</div>
      </div>
      <div className="content">
        <p>
          <i className="icon calendar" />
          {moment(event.when).format("LL")}
        </p>
        <p>
          <i className="icon clock" />
          {moment(event.when).format("LT")}
        </p>
        <p>
          <i className="icon marker" />
          {event.where}
        </p>
      </div>
      <div className="content">
        <div className="description">
          <i className="icon info circle" />
          {event.description}
        </div>
      </div>
      <div className="extra content">
        <i className="icon comment" /> {event.comments.items.length} comments
      </div>
      <button
        className="ui bottom attached button"
        onClick={e => handleDeleteClick(event, e, deleteEvent)}
      >
        <i className="trash icon" />
        Delete
      </button>
    </Link>
  );
};

export default Event;
