import React from "react";

export default function Modal({ title, children, setShow }) {
  const onModalClick = (e) => {
    if (e.target.classList.contains("modal")) setShow("");
  };
  return (
    <section className="modal" onClick={onModalClick}>
      <div className="modal__container">
        <header className="modal__title">{title}</header>
        {children}
      </div>
    </section>
  );
}
