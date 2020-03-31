import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "utils/hooks";

const Character = ({ result }) => (
  <div className="container">
    <div className="section columns">
      <div className="column is-8 is-offset-2">
        <h2 className="title has-text-centered">{result.name}</h2>

        <div className="box">
          <article className="media">
            <div className="media-left">
            </div>
            <div className="media-content">
              <div className="content">
                <aside className="menu">
                  <p className="menu-label">Basic Information</p>

                  <ul className="menu-list">
                    <li>
                      <strong>Status:</strong> {result.status}
                    </li>
                    <li>
                      <strong>Species:</strong> {result.species}
                    </li>
                    <li>
                      <strong>Type:</strong> {result.type}
                    </li>
                    <li>
                      <strong>Gender:</strong> {result.gender}
                    </li>
                    <li>
                      <strong>Origin:</strong> <LocationDetail url={result.origin.url} />
                    </li>
                    <li>
                    <strong>Location:</strong> <LocationDetail url={result.location.url} />
                    </li>
                    
                    <li>
                      <img src= {result.image} />
                    </li>
                    
                  </ul>
                </aside>
              </div>
            </div>
            <div className="media-right">
              <Link to="/" className="button">
                Home
              </Link>
            </div>
          </article>
        </div>

        <div className="box">
          <h2 className="title has-text-centered">Episodes where appears</h2>

          <div className="content has-text-centered">
            <ul>
              {result.episode.map(epi => (
                <EpisodeDetail url={epi} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const EpisodeDetail = ({ url }) => {
  const { response } = useFetch(url);
  if (!response) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Link to={"/episode/" + response.id}>{response.name}</Link>
    </div>
  );
};

const LocationDetail = ({ url }) => {
    const { response } = useFetch(url);
    if (!response) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link to={"/location/" + response.id}>{response.name}</Link>
      </div>
    );
  };

export default Character;