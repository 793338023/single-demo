import React from "react";
import {
  RouteComponentProps,
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { AliveScope } from "react-activation";
import RouteView from "./routeView";
import MenuTabs from "../pages/menu";
import configureStore from "common/dist/configureStore";
import reducer from "../reducer";
import sagas from "../sagas";

interface Props extends RouteComponentProps {}

export default class App extends React.Component<Props> {
  state = {
    // 权限
    isAuthenticated: false,
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
        <AliveScope>
          <MenuTabs />
          <Switch>
            <Route path="/" render={this.homeRender} />
          </Switch>
        </AliveScope>
      </Router>
    );
  }
}
