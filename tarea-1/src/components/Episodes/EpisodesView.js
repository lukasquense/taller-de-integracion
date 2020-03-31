import React from "react";
import { Link } from "react-router-dom";

const Episodes = ({ info, results }) => (
  <div className="container">
    <div className="section columns">
      <div className="column is-8 is-offset-2">
        <h2 className="title has-text-centered">{info.count}</h2>

        <table className="table is-bordered is-striped is-narrow">
          <thead>
            <tr>
              <th>Episode name</th>
              <th>Air Date</th>
              <th>Episode Code</th>
            </tr>
          </thead>
          <tbody>
            {results.map(episode => (
              <tr key={episode.id}>
                <td>
                  <Link to={"/episode/" + episode.id}>{episode.name}</Link>
                </td>
                <td>{episode.air_date}</td>
                <td>{episode.episode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Episodes;
