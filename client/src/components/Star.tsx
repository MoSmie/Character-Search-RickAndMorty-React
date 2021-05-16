import React from "react";
import {ReactComponent as Icon} from '../img/star.svg';

interface StarProps {
  nrOfStars: number,
  isSelected?: boolean,
  selectNumber?(nrOfStars:number):void;
}

function Star(props: StarProps) {

  const handleSelectNr = () => {
    if (props.selectNumber !== undefined) {
        props.selectNumber(props.nrOfStars)
    }
  }

  const bgColor = (props.isSelected  || props.selectNumber === undefined) ? "#8F1100" : "";
  const fontColor = (props.isSelected  || props.selectNumber === undefined)? "#8F1100" : "";

  let starClassName = "star"
  if (props.isSelected || props.selectNumber === undefined) {
    starClassName +="-selected"
  }

  return (
    <div onClick={handleSelectNr} style={{backgroundColor: bgColor, color: fontColor}}>
      <span>{props.nrOfStars}</span>
        <Icon className={starClassName}/>
    </div>
  );
}
export default Star;
