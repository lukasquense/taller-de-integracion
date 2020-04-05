import React from "react";
import EpisodesView from "./EpisodesView";
import { useFetch } from "utils/hooks";

const Episodes = () => {
  const resp = useFetch("https://rickandmortyapi.com/api/episode");
  if (!resp.response) {
    return <div>Loading...</div>;
  }
  return (
    <EpisodesView info={resp.response.info} results={resp.response.results} />
  );
};

export default Episodes;
