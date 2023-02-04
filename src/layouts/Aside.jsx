import React, { useEffect, useState } from "react";
import FilterContainer from "../components/FilterContainer";
import { filterBy } from "../data/filterBy";

const tags = filterBy.filter((a) => a.name !== "unanswered");
const unanswered = filterBy.filter((a) => a.name === "unanswered");

function Aside({ disabled, query, setQueryObj }) {
  console.log(query);
  return (
    <aside className="filter__container">
      <button className="newDiscussion-btn btn can-disable" disabled={disabled}>
        NEW DISCUSSION
      </button>
      <FilterContainer
        title="TAGS"
        list={tags}
        filterBy={"tag"}
        target={query.tag || ""}
        onFilterClick={setQueryObj}
      />
      <FilterContainer
        title="FILTER BY"
        list={unanswered}
        filterBy={"unanswered"}
        target={query.unanswered || ""}
        onFilterClick={setQueryObj}
      />
    </aside>
  );
}

export default Aside;
