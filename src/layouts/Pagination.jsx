import React from "react";
import PageButton from "../components/PageButton";

function Pagination({ pages, page, setQueryObj }) {
  const pageList = Array(pages)
    .fill()
    .map((_, i) => i);

  const onPageClick = (e) => {
    setQueryObj((prev) =>
      prev.page === +e.target.textContent
        ? prev
        : { ...prev, page: +e.target.textContent }
    );
  };

  return (
    <div className="pagination">
      <ul className="pageList">
        {pageList.map((_, i) => (
          <PageButton key={i} i={i} page={page} onClick={onPageClick} />
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
