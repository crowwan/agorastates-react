import React, { useEffect, useState, useRef } from "react";
import FilterContainer from "../components/FilterContainer";
import { filterBy } from "../data/filterBy";
import Modal from "../ui/Modal";
import ModalContent from "../components/ModalContent";
import { fetchDataWithBody } from "../utils/fetchData";
import { useSelector } from "react-redux";
const tags = filterBy.filter((a) => a.name !== "unanswered");
const unanswered = filterBy.filter((a) => a.name === "unanswered");

const NewDiscussionModal = ({ setShow, initFetch }) => {
  const user = useSelector((state) => state.user);
  const titleRef = useRef();
  const tagRef = useRef();
  const contentRef = useRef();
  const [submit, setSubmit] = useState(false);

  const onSubmitClick = () => {
    setSubmit((prev) => !prev);
  };
  // TODO: 현재 post요청 시 404 에러 수정 완료 : 경로 오류
  //TODO: fetch 요청 에러 처리
  useEffect(() => {
    submit &&
      (async () => {
        await fetchDataWithBody("discussions", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Date.now(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            title: titleRef.current.value,
            author: user,
            bodyHTML: contentRef.current.value,
            tag: tagRef.current.value,
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
          ref={titleRef}
          className="modal__body new-discussion-title"
          // onChange={onTitleChange}
        />
      </ModalContent>
      <ModalContent text="TAG">
        <input
          ref={tagRef}
          className="modal__body new-discussion-tag"
          // onChange={onTagChange}
        />
      </ModalContent>
      <ModalContent text="CONTENT">
        <textarea
          ref={contentRef}
          className="modal__body new-discussion-content"
          // onChange={onContentChange}
        />
      </ModalContent>
      <button className="modal__btnList--btn btn" onClick={onSubmitClick}>
        SUBMIT
      </button>
    </Modal>
  );
};

function Aside({ query, setQueryObj, initFetch }) {
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const onBtnClick = () => {
    setShow((prev) => !prev);
  };
  return (
    <aside className="filter__container">
      <button
        className="newDiscussion-btn btn can-disable"
        onClick={onBtnClick}
        disabled={!user}
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
      {show && <NewDiscussionModal setShow={setShow} initFetch={initFetch} />}
    </aside>
  );
}

export default Aside;
