import React from "react";
import toStringByFormatting from "../utils/toStringFormat";
function DiscussionItem({ avatarUrl, title, author, createdAt, answer }) {
  return (
    <li className="discussions">
      <img src={avatarUrl} className="discussions__tagImage" alt="avatar" />
      <div className="discussions__contentBox">
        <div className="discussions_title">{title}</div>
        <div className="discussions__infoBox">
          <div className="discussions__author">{author}</div>
          <div className="discussions__createAt">
            {toStringByFormatting(new Date(createdAt))}
          </div>
        </div>
      </div>
      <div
        className={`discussions__answered
      ${answer ? "answered" : ""}
    `}
      >
        Answered
      </div>
    </li>
  );
}

export default DiscussionItem;
