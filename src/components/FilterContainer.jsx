import React from "react";
import FilterItem from "./FilterItem";
function FilterContainer({ title, list }) {
  return (
    <ul className="filter__filterContainer">
      <span>{title}</span>
      {list.map((a) => (
        <FilterItem key={a.name} filterBy={a.name} img={a.url} />
      ))}
    </ul>
  );
}

export default FilterContainer;
