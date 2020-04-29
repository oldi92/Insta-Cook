import React from "react";
import { Route } from "react-router-dom";

import Main from "./Containers/Main/Main";
import Vegetables from "./Containers/Main/Vegetables/Vegetables";
import Meat from "./Containers/Main/Meat/Meat";
import Other from "./Containers/Main/Other/Other";
import Search from "./Containers/Search/Search";
import Test from "./test/test";
import Auxiliary from "./Hoc/Auxiliary/Auxiliary";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Auxiliary>
      <Route exact path="/" component={Main} />
      <Route path="/vegetables" component={Vegetables} />
      <Route path="/meat" component={Meat} />
      <Route path="/other" component={Other} />
      <Route path="/search" component={Search} />
      <Route path="/test" component={Test} />
    </Auxiliary>
  );
}

export default App;
