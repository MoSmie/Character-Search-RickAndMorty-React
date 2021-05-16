import React, { useState, useEffect, ChangeEvent } from "react";

export interface SortCriteria {
  name: string;
  descOrAsc: string | null;
}

export interface SortProps {
  onSortUpdate(filter: SortCriteria): void;
}

export function SortComponent(props: SortProps) {
  const [sortValue, setSortValue] = useState<string | null>(null);
  const [descOrAsc, setDescOrAsc] = useState<string | null>("DESC");

  useEffect(() => {
    if (sortValue !== null && descOrAsc !== null) {
      props.onSortUpdate({
        name: sortValue,
        descOrAsc: descOrAsc,
      });
    }
  }, [sortValue, descOrAsc]);

  const handleSelectSortValue = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortValue(event.target.value);
  };

  const handleSelectOrder = (event: ChangeEvent<HTMLSelectElement>) => {
    setDescOrAsc(event.target.value);
  };

  return (
    <div className="flex-column radius-box">
      <h3 className="uppercase">Sort:</h3>
      <div className="filter-box radius-box">
        <div className="sort-select">
          <span>Sort By:</span>
          <select
            className="radius-box border-color"
            onChange={handleSelectSortValue}
            value={sortValue !== null ? sortValue : ""}
          >
            <option value="all">none</option>
            <option value="name">name</option>
            <option value="episodes">episodes</option>
          </select>

          <select
            className="radius-box border-color"
            onChange={handleSelectOrder}
            value={descOrAsc !== null ? descOrAsc : ""}
          >
            <option value="ASC">ASC</option>
            <option value="DESC">DESC</option>
          </select>
        </div>
      </div>
    </div>
  );
}
export default SortComponent;
