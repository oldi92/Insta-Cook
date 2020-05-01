import React from "react";
import { Route } from "react-router-dom";

import Main from "./Containers/Main/Main";
import Vegetables from "./Containers/Main/Vegetables/Vegetables";
import Meat from "./Containers/Main/Meat/Meat";
import Other from "./Containers/Main/Other/Other";
import Search from "./Containers/Search/Search";
import RecipePreview from "./Components/RecipePreview/RecipePreview";
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
      <Route exact path="/search" component={Search} />
      <Route path="/search/recipepreview" component={RecipePreview} />
    </Auxiliary>
  );
}

export default App;
