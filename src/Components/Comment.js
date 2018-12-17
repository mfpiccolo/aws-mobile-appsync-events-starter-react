import React from "react";
import moment from "moment";

export default comment => {
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
