import React from "react";
import Status from "./Status";

interface CardProps {
  characters: any;
}

function CharactersReviewCard(props: CardProps) {
  const characterPhoto = {
    backgroundImage: `url(${props.characters.image})`,
  };

  return (
    <div className="flex-card radius-box" style={characterPhoto}>
      <div className="card-description radius-box">
        <div className="flex-row">
          <h3 className="clear-margin uppercase">{props.characters.name}</h3>
          <Status statusName={props.characters.status} />
        </div>
        <p>
           species: <span>{props.characters.species}</span>
          <br />
          gender: <span>{props.characters.gender}</span>
          <br />
          how many episode: <span>{props.characters.episode.length}</span>
          <br />
          Last known location: <span>{props.characters.location.name}</span>
          <br />
          Origin: <span>{props.characters.origin.name}</span>

        </p>
      </div>
    </div>
  );
}

export default CharactersReviewCard;
