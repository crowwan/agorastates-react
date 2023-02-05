import React from "react";

function PageButton({ i, page, onClick }) {
  return (
    <li className={i + 1 === page ? "now" : ""} onClick={onClick}>
      {i + 1}
    </li>
  );
}

export default PageButton;
