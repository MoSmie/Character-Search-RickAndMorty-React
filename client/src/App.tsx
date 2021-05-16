import React, { useState, useEffect } from "react";
import CharactersReviewCard from "./components/Card";
import NavBar from "./components/NavBar";
import { FilterComponent, FilterCriteria } from "./components/Filter";
import { SortComponent, SortCriteria } from "./components/Sort";

function checkStatus(response: Response): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw Error("failed to execute request");
  }
}

export interface Character {
  created: string;
  episode: Array<string>;
  gender: string;
  id: 2;
  image: string;
  location: object;
  name: string;
  origin: object;
  species: string;
  status: string;
  type: string;
  url: string;
}

function App() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [upadedListOfCharacters, setUpadedListOfCharacters] = useState<Character[]>([]);
  const [isSortedChaged, setIsSortedChanged] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let requestOptions = {
      method: "GET",
    };

    fetch(`https://rickandmortyapi.com/api/character`, requestOptions)
      .then(checkStatus)
      .then((response: Response) => response.json())
      .then((data: any) => {
        let res = data.results as Character[];
        setAllCharacters(res);
        setUpadedListOfCharacters(res);
      })
      .catch((err: Error) => {
        setError("Error! Could not load characters");
      });
  }, []);

  useEffect(() => {
    setUpadedListOfCharacters(upadedListOfCharacters);
    setIsSortedChanged(false);
  }, [isSortedChaged]);

  const handleOnFilterUpdate = (filter: FilterCriteria): void => {
    let filteredListOfCharacters: Character[] = allCharacters.filter(
      (character) => {
        if (
          filter.gender !== null &&
          character.gender !== filter.gender &&
          filter.statusOfExistence !== null
        ) {
          return false;
        }

        const existenceToShow = [];
        for (const status of filter.statusOfExistence) {
          if (status.isSelected) {
            existenceToShow.push(status.name);
          }
        }

        if (existenceToShow.length > 0) {
          if (!existenceToShow.includes(character.status)) {
            return false;
          }
        }

        const nrOfAppearances = character.episode.length;
        if (
          (filter.nrOfEpisodeFrom &&
            nrOfAppearances < filter.nrOfEpisodeFrom) ||
          (filter.nrOfEpisodeTo && nrOfAppearances > filter.nrOfEpisodeTo)
        ) {
          return false;
        }
        return true;
      }
    );
    setUpadedListOfCharacters(filteredListOfCharacters);
  };

  const handleOnSortUpdate = (sort: SortCriteria): void => {
    if (sort.name === "name") {
      let newSort = upadedListOfCharacters.sort(function (a, b) {
        let nameA = a.name;
        let nameB = b.name;

        if (sort.descOrAsc === "ASC") {
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        } else {
          if (nameA < nameB) {
            return 1;
          }
          if (nameA > nameB) {
            return -1;
          }
          return 0;
        }
      });
      setUpadedListOfCharacters(newSort);
      setIsSortedChanged(true);

    } else if (sort.name === "episodes") {
      let newSort = upadedListOfCharacters.sort(function (a, b) {
        let episodesA = a.episode.length;
        let episodesB = b.episode.length;

        if (sort.descOrAsc === "ASC") {
          return episodesA - episodesB;
        } else {
          return episodesB - episodesA;
        }
      });
      setUpadedListOfCharacters(newSort);
      setIsSortedChanged(true);
    }
  };

  return (
    <div>
      <NavBar />
      {error !== null && (
        <div className="main-content">
          <h2>{error}</h2>
        </div>
      )}

      <div className="main-content">
        <div className="aside radius-box">
          <FilterComponent onFilterUpdate={handleOnFilterUpdate} />
          <SortComponent onSortUpdate={handleOnSortUpdate} />
        </div>

        <div className="gallery">
          {upadedListOfCharacters.map((characters) => (
            <CharactersReviewCard characters={characters} key={characters.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
