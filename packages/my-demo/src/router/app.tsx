import React from "react";
import {
  RouteComponentProps,
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import RouteView from "./routeView";
import configureStore from "common/dist/configureStore";
import reducer from "../reducer";
import sagas from "../sagas";

interface Props extends RouteComponentProps {}

export default class App extends React.Component<Props> {
  state = {
    // 权限
    isAuthenticated: false
  };
  constructor(props: Props) {
    super(props);
    configureStore.replace(reducer, [sagas]);
  }

  homeRender = () => {
    return <RouteView />;
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" render={this.homeRender} />
        </Switch>
      </Router>
    );
  }
}
