import React from "react";

function Comment({ comment }) {
  return (
    <div className="border-t pt-1 mt-1 text-sm text-gray-600">
      <span className="font-bold">{comment.user}: </span>
      {comment.text}
    </div>
  );
}

export default Comment;
