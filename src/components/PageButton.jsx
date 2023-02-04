import React from "react";

function PageButton(i, page) {
  return <li className={i + 1 === page ? "now" : ""}>{i + 1}</li>;
}

export default PageButton;
