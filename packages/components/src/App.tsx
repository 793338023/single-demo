import React, { Component, lazy, Suspense } from "react";
import { List } from "antd";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./App.css";

const Item = List.Item;

const Index = () => {
  return (
    <nav>
      <List>
        <Item>
          <Link to="antd">蚂蚁金服</Link>
        </Item>
      </List>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/antd" component={lazy(() => import("./demo"))} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
