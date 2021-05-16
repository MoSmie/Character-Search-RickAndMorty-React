import React, { useState, useEffect, ChangeEvent } from "react";
import Status from "./Status";

interface StatusSelection {
  name: string;
  isSelected: boolean;
}

export interface FilterCriteria {
  gender: string | null;
  statusOfExistence: Array<StatusSelection>;
  nrOfEpisodeFrom: Number | null;
  nrOfEpisodeTo: Number | null;
}

export interface FilterProps {
  onFilterUpdate(filter: FilterCriteria): void;
}

export function FilterComponent(props: FilterProps) {
  const [status, setStatus] = useState<Array<StatusSelection>>([
    { name: "Alive", isSelected: false },
    { name: "Dead", isSelected: false },
    { name: "unknown", isSelected: false },
  ]);
  const [gender, setGender] = useState<string | null>(null);
  const [nrOfEpisodeFrom, setNrOfEpisodeFrom] = useState<number>(0);
  const [nrOfEpisodeTo, setNrOfEpisodeTo] = useState<number>(50);

  const handlerFilterGender = (newGender: string) => {
    if (gender === newGender) {
      setGender(null);
    } else {
      setGender(newGender);
    }
  };

  const handleSelectStatus = (statusId: number) => {
    const newStars = [...status];
    newStars[statusId].isSelected = !newStars[statusId].isSelected;
    setStatus(newStars);
  };

  const handleSelectEpisodeFrom = (event: ChangeEvent<HTMLSelectElement>) => {
    setNrOfEpisodeFrom(parseInt(event.target.value));
  };

  const handleSelectEpisodeTo = (event: ChangeEvent<HTMLSelectElement>) => {
    setNrOfEpisodeTo(parseInt(event.target.value));
  };

  useEffect(() => {
    props.onFilterUpdate({
      gender: gender,
      statusOfExistence: status,
      nrOfEpisodeFrom: nrOfEpisodeFrom,
      nrOfEpisodeTo: nrOfEpisodeTo,
    });
  }, [gender, nrOfEpisodeFrom, nrOfEpisodeTo, status]);

  return (
    <div className="flex-column radius-box">
      <h3 className="uppercase">search characteres by:</h3>
      <div className="filter-box radius-box">
        <h3>Gender:</h3>
        <div className="flex-row">
          <div
            className={gender === "Male" ? "selected-gender" : "gender-option"}
            onClick={() => handlerFilterGender("Male")}
          >
            <div className="male-icon"></div>
            Male
          </div>
          <div
            className={
              gender === "Female"
                ? "selected-gender border-color"
                : "gender-option"
            }
            onClick={() => handlerFilterGender("Female")}
          >
            <div className="female-icon"></div>
            Female
          </div>
          <div
            className={
              gender === "unknown"
                ? "selected-gender"
                : "gender-option border-color"
            }
            onClick={() => handlerFilterGender("unknown")}
          >
            <div className="unknown-gender-icon"></div>
            Unknown
          </div>
        </div>
      </div>
      <div className="filter-box radius-box">
        <h3>Status:</h3>

        <div className="flex-row">
          {status.map((status, idx) => (
            <Status
              statusName={status.name}
              selectStatusById={handleSelectStatus}
              isSelected={status.isSelected}
              idx={idx}
              key={idx}
            />
          ))}
        </div>
      </div>
      <div className="filter-box radius-box">
        <h3>Appearance in episodes:</h3>
        <div className="flex-row" style={{ justifyContent: "end" }}>
          <div>
            From
            <select
              className="radius-box border-color"
              onChange={handleSelectEpisodeFrom}
              value={nrOfEpisodeFrom}
            >
              <option value="0">1</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
          <div>
            To
            <select
              className="radius-box border-color"
              onChange={handleSelectEpisodeTo}
              value={nrOfEpisodeTo}
            >
              <option value="0">all</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FilterComponent;
