import React, { memo } from "react";

function FilterItem({ filterBy, name, img, onFilterClick, selected }) {
  const onClick = () => {
    onFilterClick((prev) =>
      prev[filterBy] !== name
        ? { ...prev, [filterBy]: name, page: 1 }
        : (delete prev[filterBy], { ...prev, page: 1 })
    );
  };
  return (
    <li data-filtername={name} onClick={onClick} className={selected}>
      {img && <img src={img} className="filter__tagImg" alt={`${name}_img`} />}
      {name}
    </li>
  );
}

export default memo(FilterItem);
