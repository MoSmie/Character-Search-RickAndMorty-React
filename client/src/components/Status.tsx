import React from "react";

interface StatusProps {
  statusName: string;
  idx?: number;
  isSelected?: boolean;
  selectStatusById?(idx: number): void;
}

function Status(props: StatusProps) {
  const handleSelectNr = () => {
    if (props.selectStatusById !== undefined && props.idx !== undefined) {
      props.selectStatusById(props.idx);
    }
  };
  let statusBgColor;
  if (props.statusName === "Alive") {
    statusBgColor = "#32CD32";
  } else if (props.statusName === "Dead") {
    statusBgColor = "#FF0000";
  } else {
    statusBgColor = "#0000FF";
  }

  const bgColorOfSelected = props.isSelected ? "#93254a" : "";
  const fontColorOfSelected = props.isSelected ? "#ece6e6" : "";

  return (
    <div
      className="radius-box border-color"
      onClick={handleSelectNr}
      style={{ backgroundColor: bgColorOfSelected, color: fontColorOfSelected }}
    >
      <div className="flex-row">
        <div
          className="radius-box status-icon"
          style={{ backgroundColor: statusBgColor }}
        ></div>
        <div>{props.statusName}</div>
      </div>
    </div>
  );
}
export default Status;
