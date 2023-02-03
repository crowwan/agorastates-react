import React, { useState } from "react";

function FilterItem({ filterBy, img }) {
  const [selected, setSelected] = useState("");
  const onFilterClick = () => {
    selected === "selected" ? setSelected("") : setSelected("selected");
  };
  return (
    <li data-filtername={filterBy} onClick={onFilterClick} className={selected}>
      {img && (
        <img src={img} className="filter__tagImg" alt={`${filterBy}_img`} />
      )}
      {filterBy}
    </li>
  );
}

export default FilterItem;
