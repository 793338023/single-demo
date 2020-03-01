import React from "react";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import { RouterViewProps } from "./type";
// import Home from "../pages/home";
// import HomeR from "../pages/home-redux";
import ErrCounter from "../pages/buggyCounter";

interface Props extends RouteComponentProps, RouterViewProps {}

const RouteView: React.FC<Props> = () => {
  return (
    <Switch>
      {/* <Route path="/" component={Home} exact></Route> */}
      {/* <Route path="/r" component={HomeR}></Route> */}
      <Route path="/e" component={ErrCounter}></Route>
    </Switch>
  );
};

export default withRouter(RouteView);