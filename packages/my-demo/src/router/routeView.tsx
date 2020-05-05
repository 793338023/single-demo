import React from "react";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { RouterViewProps } from "./type";
import KeepAlive from "react-activation";
import Home from "../pages/home";
import HomeRedux from "../pages/home-redux";
import HookTest from "../pages/hookTest";
import ErrCounter from "../pages/buggyCounter";
import Tabs from "../pages/tabs";

interface Props extends RouteComponentProps, RouterViewProps {}

function AliveItem(Comp: React.ComponentType<any>) {
  return () => {
    return (
      <KeepAlive>
        <Comp />
      </KeepAlive>
    );
  };
}

const HomeCom = AliveItem(Home);
const HookTestCom = AliveItem(HookTest);
const TabsCom = AliveItem(Tabs);
const HomeReduxCom = AliveItem(HomeRedux);

const RouteView: React.FC<Props> = () => {
  return (
    <Switch>
      <Route path="/" component={HomeCom} exact></Route>
      <Route path="/hr" component={HomeReduxCom}></Route>
      <Route path="/h" component={HookTestCom}></Route>
      <Route path="/e" component={ErrCounter}></Route>
      <Route path="/b" component={TabsCom}></Route>
    </Switch>
  );
};

export default withRouter(RouteView);
