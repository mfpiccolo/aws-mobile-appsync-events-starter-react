import React, { useState, useContext } from "react";
import moment from "moment";

import { StoreContext } from "../StoreContext";
import { createComment } from "../actions/events";

function NewComment({ eventId }) {
  let { state, dispatch } = useContext(StoreContext);
  const [comment, setComment] = useState({ content: "" });
  const {
    events: { loading }
  } = state;

  const handleSubmit = async e => {
    e.stopPropagation();
    e.preventDefault();

    createComment(dispatch, eventId, {
      ...comment,
      eventId,
      createdAt: moment.utc().format()
    });

    setComment({ content: "" });
  };

  const handleChange = ({ target: { value: content } }) => {
    setComment({ content });
  };

  return (
    <form className="ui reply form">
      <div className="field">
        <textarea
          value={comment.content}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <button
        className={`ui blue labeled submit icon button ${
          loading ? "loading" : ""
        }`}
        disabled={loading}
        onClick={handleSubmit}
      >
        <i className="icon edit" />
        Add Comment
      </button>
    </form>
  );
}

export default NewComment;
