import React from "react";
import DiscussionItem from "./DiscussionItem";
import Pagination from "../layouts/Pagination";
function DiscussionsSection({ discussions = [], pages, page, setQueryObj }) {
  return (
    <section id="discussion__wrapper">
      <ul className="discussions__container">
        {discussions.map((a) => (
          <DiscussionItem
            key={a.id}
            title={a.title}
            author={a.author}
            avatarUrl={a.avatarUrl}
            createdAt={a.createdAt}
            answer={a.answer}
          />
        ))}
      </ul>
      <Pagination pages={pages} page={page} setQueryObj={setQueryObj} />
    </section>
  );
}

export default DiscussionsSection;
