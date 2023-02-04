import React, { useState } from "react";

function FilterItem({ filterBy, name, img, onFilterClick, selected }) {
  const onClick = () => {
    onFilterClick((prev) =>
      prev[filterBy] !== name
        ? { ...prev, [filterBy]: name }
        : (delete prev[filterBy], { ...prev })
    );
  };
  return (
    <li data-filtername={name} onClick={onClick} className={selected}>
      {img && <img src={img} className="filter__tagImg" alt={`${name}_img`} />}
      {name}
    </li>
  );
}

export default FilterItem;
