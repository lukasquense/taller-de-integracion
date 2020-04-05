import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Episodes from "components/Episodes";
import Episode from "components/Episode";
import Character from "components/Character";
import Location from "components/Location";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={() => <Episodes />} />
          <Route
            path="/episode/:id"
            exact
            render={props => <Episode props={props} />}
          />
          <Route
            path="/character/:id"
            exact
            render={props => <Character props={props} />}
          />
          <Route
            path="/location/:id"
            exact
            render={props => <Location props={props} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
