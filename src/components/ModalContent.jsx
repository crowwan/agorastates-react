import React from "react";

function ModalContent({ text, children }) {
  return (
    <div className="modal__contentBody">
      <div className="modal__topText modal__text">{text}</div>
      {children}
    </div>
  );
}

export default ModalContent;
