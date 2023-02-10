import React, { useState, useEffect, useRef } from "react";
import ModalContent from "../components/ModalContent";
import Modal from "../ui/Modal";
import { userAPI } from "../user/userAPI";
const userModal =
  (api) =>
  ({ setShow, setUser, title }) => {
    const idRef = useRef();
    const pwRef = useRef();
    // const [id, setId] = useState("");
    // const [pw, setPw] = useState("");
    // const onIdChange = (e) => {
    //   setId(e.target.value);
    // };
    // const onPwChange = (e) => {
    //   setPw(e.target.value);
    // };
    const onSubmitClick = () => {
      if (api(idRef.current.value, pwRef.current.value)) {
        setUser(idRef.current.value);
        setShow("");
      }
    };
    return (
      <Modal title={title} setShow={setShow}>
        <ModalContent text="id">
          <input className="modal__body" ref={idRef} />
        </ModalContent>
        <ModalContent text="password">
          <input className="modal__body" ref={pwRef} />
        </ModalContent>
        <button className="modal__btnList--btn btn" onClick={onSubmitClick}>
          SUBMIT
        </button>
      </Modal>
    );
  };
const SignUpModal = userModal(userAPI.signUp);
const SignInModal = userModal(userAPI.signIn);

export default function Header({ user, setUser }) {
  const [show, setShow] = useState("");
  const onSignupClick = () => {
    setShow("SIGN UP");
  };
  const onSigninClick = () => {
    setShow("SIGN IN");
  };
  const onLogoutClick = () => {
    setUser("");
  };
  return (
    <header className="header">
      <h1 className="header__title">
        <a href="/"> AGORASTATES</a>
      </h1>
      <section className="btnList">
        {!user ? (
          <>
            <button className="btnList__signIn" onClick={onSigninClick}>
              SIGN IN
            </button>
            <button className="btnList__signIn" onClick={onSignupClick}>
              SIGN UP
            </button>
          </>
        ) : (
          <button className="btnList__signIn" onClick={onLogoutClick}>
            LOG OUT
          </button>
        )}
      </section>
      {show === "SIGN UP" && (
        <SignUpModal title={show} setUser={setUser} setShow={setShow} />
      )}
      {show === "SIGN IN" && (
        <SignInModal title={show} setUser={setUser} setShow={setShow} />
      )}
    </header>
  );
}
