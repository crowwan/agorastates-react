import React, { useState } from "react";
import PageButton from "../components/PageButton";

function Pagination({ pages, page }) {
  const pageList = Array(pages)
    .fill()
    .map((_, i) => i);

  return (
    <div className="pagination">
      <ul className="pageList">
        {pageList.map((_, i) => (
          <PageButton i={i} page={page} />
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
