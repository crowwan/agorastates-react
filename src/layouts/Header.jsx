import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalContent from "../components/ModalContent";
import Modal from "../ui/Modal";
import { signIn, logOut } from "../features/userSlice";
import { userAPI } from "../user/userAPI";
const userModal =
  (api) =>
  ({ setShow, title }) => {
    const dispatch = useDispatch();
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
        dispatch(signIn(idRef.current.value));
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

export default function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState("");
  const onSignupClick = () => {
    setShow("SIGN UP");
  };
  const onSigninClick = () => {
    setShow("SIGN IN");
  };
  const onLogoutClick = () => {
    dispatch(logOut());
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
      {show === "SIGN UP" && <SignUpModal title={show} setShow={setShow} />}
      {show === "SIGN IN" && <SignInModal title={show} setShow={setShow} />}
    </header>
  );
}
