import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Auxiliary from "../../Hoc/Auxiliary/Auxiliary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

/*
 PROPS RECEIVED ONLY 1
 props.ingredients and we need to chose one of this 3 options
   
 1)let vegeterianProps = {
      imagePath: "vegetables",
      name: "vegetablesIngredients",
      value: this.props.vegetablesIngredients,
    };

 2)let meatProps = {
      imagePath: "meatAndFish",
      name: "meatIngredients",
      value: this.props.meatIngredients,
    };
 3)let otherProps = {
      imagePath: "otherIngredients",
      name: "otherIngredients",
      value: this.props.otherIngredients,
       };
 */

class IngredientGen extends Component {
  componentDidMount() {
    if (
      this.props.ingredients.name === "vegetablesIngredients" &&
      this.props.ingredients.value.length === 0
    ) {
      this.props.onFetchVegetables();
    } else if (
      this.props.ingredients.name === "meatIngredients" &&
      this.props.ingredients.value.length === 0
    ) {
      this.props.onFetchMeat();
    } else if (
      this.props.ingredients.name === "otherIngredients" &&
      this.props.ingredients.value.length === 0
    ) {
      this.props.onFetchOther();
    }
  }
  render() {
    let ingredientsDiv = [];
    let filtered = [];
    ingredientsDiv = this.props.ingredients.value.map((element) => {
      filtered = this.props.ingredientSelected.filter(
        (ingredient) => ingredient === element
      );
      let imageDiv = "";
      if (this.props.ingredients.imagePath) {
        const image = require(`../../assets/ingredients/${this.props.ingredients.imagePath}/${element}.png`);
        imageDiv = (
          <Auxiliary>
            <img src={image} alt="vegetables" />
            <br />
          </Auxiliary>
        );
      } else {
        imageDiv = null;
      }

      return filtered.length === 0 ? (
        <button
          onClick={() => this.props.onIngredientAdd(element)}
          key={element}
        >
          {imageDiv}
          {element}
        </button>
      ) : (
        <button
          onClick={() => this.props.oningredientRemove(element)}
          style={{ backgroundColor: "rgb(54, 54, 54)" }}
          key={element}
        >
          {imageDiv}
          {element}
          <FontAwesomeIcon
            style={{ marginLeft: "0.4rem" }}
            icon={faCheck}
            size="1x"
          />
        </button>
      );
    });

    return <Auxiliary>{ingredientsDiv}</Auxiliary>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredientSelected: state.ingredientSelected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchVegetables: () => dispatch(actions.fetchVegetables()),
    onFetchMeat: () => dispatch(actions.fetchMeat()),
    onFetchOther: () => dispatch(actions.fetchOther()),
    onIngredientAdd: (element) => dispatch(actions.ingredientAdd(element)),
    oningredientRemove: (element) =>
      dispatch(actions.ingredientRemove(element)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IngredientGen);
