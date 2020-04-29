import React, { Component } from "react";

class Test extends Component {
  componentDidMount() {
    const test = require("./test.json");
    const dataJsonToArray = Object.keys(test).map((key, value) => {
      return test[key];
    });

    let ingredients = "lamb porn bacon";
    let recipes = [];

    recipes = dataJsonToArray.filter(
      (element) =>
        element.ingredients.split(" ").sort().join() ===
        ingredients.split(" ").sort().join()
    );

    console.log(recipes);

    // console.log(
    //   ingredients.split(" ").sort().join() ===
    //     ingredients1.split(" ").sort().join()
    // );
  }
  render() {
    return <div>test</div>;
  }
}

export default Test;
