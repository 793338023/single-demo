import React from "react";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { RouterViewProps } from "./type";
import Home from "../pages/home";
import HookTest from "../pages/hookTest";
import ErrCounter from "../pages/buggyCounter";
import Tabs from "../pages/tabs";

interface Props extends RouteComponentProps, RouterViewProps {}

const RouteView: React.FC<Props> = () => {
  return (
    <Switch>
      <Route path="/" component={Home} exact></Route>
      <Route path="/h" component={HookTest}></Route>
      <Route path="/e" component={ErrCounter}></Route>
      <Route path="/b" component={Tabs}></Route>
    </Switch>
  );
};

export default withRouter(RouteView);
