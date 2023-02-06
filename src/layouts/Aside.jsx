import React, { useEffect, useState } from "react";
import FilterContainer from "../components/FilterContainer";
import { filterBy } from "../data/filterBy";
import Modal from "../ui/Modal";
import ModalContent from "../components/ModalContent";
const tags = filterBy.filter((a) => a.name !== "unanswered");
const unanswered = filterBy.filter((a) => a.name === "unanswered");

const NewDiscussionModal = ({ user, setShow, initFetch }) => {
  const [discussionTitle, setDiscussionTitle] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [submit, setSubmit] = useState(false);

  const onTitleChange = (e) => {
    setDiscussionTitle(e.target.value);
  };
  const onTagChange = (e) => {
    setTag(e.target.value);
  };
  const onContentChange = (e) => {
    setContent(e.target.value);
  };
  const onSubmitClick = () => {
    setSubmit((prev) => !prev);
  };
  useEffect(() => {
    submit &&
      (async () => {
        await fetch("http://localhost:4000/discussions?page=1", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Date.now(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            title: discussionTitle,
            author: user,
            bodyHTML: content,
            tag: tag,
            avatarUrl: "./asset/user.png",
            answer: null,
          }),
        });

        initFetch();
        setShow((prev) => !prev);
      })();
  }, [submit]);
  return (
    <Modal title="NEW DISCUSSION" setShow={setShow}>
      <ModalContent text="TITLE">
        <input
          className="modal__body new-discussion-title"
          onChange={onTitleChange}
        />
      </ModalContent>
      <ModalContent text="TAG">
        <input
          className="modal__body new-discussion-tag"
          onChange={onTagChange}
        />
      </ModalContent>
      <ModalContent text="CONTENT">
        <textarea
          className="modal__body new-discussion-content"
          onChange={onContentChange}
        />
      </ModalContent>
      <button className="modal__btnList--btn btn" onClick={onSubmitClick}>
        SUBMIT
      </button>
    </Modal>
  );
};

function Aside({ disabled, query, user, setQueryObj, initFetch }) {
  const [show, setShow] = useState(false);
  const onBtnClick = () => {
    setShow((prev) => !prev);
  };
  return (
    <aside className="filter__container">
      <button
        className="newDiscussion-btn btn can-disable"
        onClick={onBtnClick}
        disabled={disabled}
      >
        NEW DISCUSSION
      </button>
      <FilterContainer
        title="TAGS"
        list={tags}
        filterBy={"tag"}
        target={query.tag || ""}
        onFilterClick={setQueryObj}
      />
      <FilterContainer
        title="FILTER BY"
        list={unanswered}
        filterBy={"unanswered"}
        target={query.unanswered || ""}
        onFilterClick={setQueryObj}
      />
      {show && (
        <NewDiscussionModal
          user={user}
          setShow={setShow}
          initFetch={initFetch}
        />
      )}
    </aside>
  );
}

export default Aside;
