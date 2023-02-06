import React, { useEffect, useState } from "react";
import DiscussionItem from "./DiscussionItem";
import Pagination from "../layouts/Pagination";
import Modal from "../ui/Modal";
import ModalContent from "./ModalContent";
const DiscussionModal = ({ user, discussion, setShow, initFetch }) => {
  const [answering, setAnswering] = useState(false);
  const [answer, setAnswer] = useState("");
  const [submit, setSubmit] = useState(false);
  const [remove, setRemove] = useState(false);
  const onAnswerClick = () => {
    setAnswering(true);
  };
  const onSubmitClick = () => {
    setSubmit(true);
  };
  const onRemoveClick = () => {
    setRemove(true);
  };
  const onAnswerChange = (e) => {
    setAnswer(e.target.value);
  };
  useEffect(() => {
    console.log(submit);
    submit &&
      (async () => {
        console.log("patch");
        await fetch(`http://localhost:4000/discussions/${discussion.id}`, {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Date.now(),
            createdAt: new Date().toISOString(),
            author: discussion.author,
            bodyHTML: answer,
          }),
        });
        initFetch();
        setShow((prev) => !prev);
      })();
  }, [submit]);
  useEffect(() => {
    remove &&
      (async () => {
        console.log("delete");
        await fetch(`http://localhost:4000/discussions/${discussion.id}`, {
          method: "DELETE",
          mode: "cors",
        });
        initFetch();
        setShow((prev) => !prev);
      })();
  }, [remove]);
  return (
    <Modal title="Discussion" setShow={setShow}>
      <ModalContent text="TITLE">
        <div className="modal__body">{discussion.title}</div>
      </ModalContent>
      <ModalContent text="CONTENT">
        <div
          className="modal__body"
          dangerouslySetInnerHTML={{ __html: discussion.bodyHTML }}
        ></div>
      </ModalContent>
      {discussion.answer && (
        <ModalContent text="ANSWER">
          <div
            className="modal__body"
            dangerouslySetInnerHTML={{ __html: discussion.answer.bodyHTML }}
          ></div>
        </ModalContent>
      )}
      {answering && (
        <>
          <ModalContent text="ANSWER">
            <textarea
              className="modal__body new-discussion-content"
              onChange={onAnswerChange}
            />
          </ModalContent>
          <button className="modal__btnList--btn btn" onClick={onSubmitClick}>
            Submit
          </button>
        </>
      )}
      {user === discussion.author ? (
        <button
          className="modal__btnList--btn btn btn-remove"
          onClick={onRemoveClick}
        >
          Remove
        </button>
      ) : (
        user &&
        !discussion.answer &&
        !answering && (
          <button className="modal__btnList--btn btn" onClick={onAnswerClick}>
            Answer
          </button>
        )
      )}
    </Modal>
  );
};

function DiscussionsSection({
  discussions = [],
  user,
  pages,
  page,
  initFetch,
  setQueryObj,
}) {
  // TODO: 이벤트 핸들러 구현
  // 궁금한 것: 이벤트 핸들러를 props로 넘겨줘도 메모리 효율이 안 좋나? 이벤트 위임으로 구현을 해야 하나?
  // TODO: dataset 이용?
  const [show, setShow] = useState(false);
  const [discussion, setDiscussion] = useState({});
  const onListClick = (discussion) => {
    return (e) => {
      setShow(true);
      setDiscussion(discussion);
    };
  };

  // e.target으로 li만 찾기 어려움 => div박스가 눌리면 문제가 생김
  // const onClick = (e) => {
  //   console.log(e.target);
  // };
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
            onListClick={onListClick(a)}
          />
        ))}
      </ul>
      <Pagination pages={pages} page={page} setQueryObj={setQueryObj} />
      {show && (
        <DiscussionModal
          user={user}
          discussion={discussion}
          setShow={setShow}
          initFetch={initFetch}
        />
      )}
    </section>
  );
}

export default DiscussionsSection;
