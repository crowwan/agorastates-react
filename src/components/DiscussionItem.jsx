import React from "react";
import toStringByFormatting from "../utils/toStringFormat";
function DiscussionItem({
  avatarUrl,
  title,
  author,
  createdAt,
  answer,
  onListClick,
}) {
  //TODO: 디스커션 아이템 클릭 시 모달 등장 -> answer ? answerbtn x : answerbtn o / user === createduser ? removebtn o : x
  //TODO: Answer 버튼 및 삭제 버튼 구현 -> fetch patch, fetch delete

  return (
    <li className="discussions" onClick={onListClick}>
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
