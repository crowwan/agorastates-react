import React, { useEffect, useRef, useState } from "react";
import DiscussionItem from "./DiscussionItem";
import Pagination from "../layouts/Pagination";
import Modal from "../ui/Modal";
import ModalContent from "./ModalContent";
import { fetchDataWithBody } from "../utils/fetchData";

const DiscussionModal = ({ user, discussion, setShow, initFetch }) => {
  const [answering, setAnswering] = useState(false);
  // ref 오류가 남 왜지?  모달이 뜰 때 값을 참조해서?
  const answerRef = useRef();
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

  // const fetchDataWithMethod = (flag, method) => {
  //   console.log("...");
  //   flag &&
  //     (async () => {
  //       await fetchDataWithBody(, method);
  //       initFetch();
  //       setShow((prev) => !prev);
  //     })();
  // };

  //TODO: fetch 요청 에러 처리
  useEffect(() => {
    // console.log("test");
    // flag도 같이 함수로 빼면 {} 내부도 평가되어서 ref.current를 찾지 못하게 됨.
    submit &&
      (async () => {
        fetchDataWithBody(`discussions/${discussion.id}`, {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: Date.now(),
            createdAt: new Date().toISOString(),
            author: discussion.author,
            bodyHTML: answerRef.current.value,
          }),
        });
        initFetch();
        setShow((prev) => !prev);
      })();
  }, [submit]);

  useEffect(() => {
    remove &&
      (async () => {
        fetchDataWithBody(`discussions/${discussion.id}`, {
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
              ref={answerRef}
              className="modal__body new-discussion-content"
              // onChange={onAnswerChange}
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
