import React from "react";
import FilterContainer from "../components/FilterContainer";
import { filterBy } from "../data/filterBy";
const tags = filterBy.filter((a) => a.name !== "unanswered");
const unanswered = filterBy.filter((a) => a.name === "unanswered");

function Aside({ disabled }) {
  return (
    <aside className="filter__container">
      <button className="newDiscussion-btn btn can-disable" disabled={disabled}>
        NEW DISCUSSION
      </button>
      <FilterContainer title="TAGS" list={tags} />
      <FilterContainer title="FILTER BY" list={unanswered} />
    </aside>
  );
}

export default Aside;
