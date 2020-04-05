import React from "react";
import { Link } from "react-router-dom";
import { useFetch } from "utils/hooks";

const Episode = ({ result }) => (
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
                      <strong>Air date:</strong> {result.air_date}
                    </li>
                    <li>
                      <strong>Episode code:</strong> {result.episode}
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
          <h2 className="title has-text-centered">Characters</h2>

          <div className="content has-text-centered">
            <ul>
              {result.characters.map(char => (
                <CharacterDetail url={char} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CharacterDetail = ({ url }) => {
  const { response } = useFetch(url);
  if (!response) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Link to={"/character/" + response.id}>{response.name}</Link>
    </div>
  );
};

export default Episode;
