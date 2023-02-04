import React from "react";
import FilterItem from "./FilterItem";
function FilterContainer({ title, list, filterBy, target, onFilterClick }) {
  return (
    <ul className="filter__filterContainer">
      <span>{title}</span>
      {list.map((a) => (
        <FilterItem
          key={a.name}
          filterBy={filterBy}
          name={a.name}
          img={a.url}
          onFilterClick={onFilterClick}
          selected={target === a.name ? "selected" : ""}
        />
      ))}
    </ul>
  );
}

export default FilterContainer;
