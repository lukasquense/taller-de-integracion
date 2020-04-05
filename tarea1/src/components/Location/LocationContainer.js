import React from "react";
import { useFetch } from "utils/hooks";
import LocationView from "./LocationView";

const Location = ({ props }) => {
  const { response } = useFetch(
    `https://rickandmortyapi.com/api/location/${props.match.params.id}`
  );
  if (!response) {
    return <div>Loading...</div>;
  }
  console.log(response);
  return <LocationView result={response} />;
};

export default Location;
