import React from "react";
import { useFetch } from "utils/hooks";
import EpisodeView from "./EpisodeView";

const Episode = ({ props }) => {
  const { response } = useFetch(
    `https://rickandmortyapi.com/api/episode/${props.match.params.id}`
  );
  if (!response) {
    return <div>Loading...</div>;
  }
  console.log(response);
  return <EpisodeView result={response} />;
};

export default Episode;
