import React from "react";
import { useFetch } from "utils/hooks";
import CharacterView from "./CharacterView";

const Character = ({ props }) => {
  const { response } = useFetch(
    `https://rickandmortyapi.com/api/character/${props.match.params.id}`
  );
  if (!response) {
    return <div>Loading...</div>;
  }
  console.log(response);
  return <CharacterView result={response} />;
};

export default Character;
