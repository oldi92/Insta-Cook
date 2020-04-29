import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "../../assets/style/Main.module.scss";
import recipe from "../../assets/recipe.png";
import meat from "../../assets/meat.png";
import other from "../../assets/other.png";
import vegetables from "../../assets/vegetables.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import * as actions from "../../store/actions";

class Main extends Component {
  search = (data) => {
    this.props.history.push("/search");
  };

  render() {
    let ingredientSelectedDiv = [];
    if (this.props.ingredientSelected) {
      ingredientSelectedDiv = this.props.ingredientSelected.map((element) => (
        <button
          key={element}
          onClick={() => this.props.oningredientRemove(element)}
        >
          {element}{" "}
          <FontAwesomeIcon
            style={{ color: "#007bff", marginLeft: "0.5rem" }}
            icon={faTimes}
            size="1x"
          />
        </button>
      ));
    }

    return (
      <div className={classes.Container}>
        <div className={classes.options}>
          <div className={classes.title}>
            <span className={classes.titleHello}>Hello</span>, Lets Cook.
          </div>
          <div>Choose your ingredients</div>
          <div className={classes.category}>
            <button onClick={() => this.props.history.push("/vegetables")}>
              <img src={vegetables} alt="vegetables" />
              <br />
              Vegetables
            </button>
            <button onClick={() => this.props.history.push("/meat")}>
              <img src={meat} alt="vegetables" />
              <br />
              Meat or Fish
            </button>
            <button onClick={() => this.props.history.push("/other")}>
              <img src={other} alt="vegetables" />
              <br />
              Other ingredients
            </button>
          </div>
          {this.props.ingredientSelected.length === 0 ? null : (
            <button
              onClick={() => this.search(this.props.ingredientSelected)}
              className={classes.SearchButton}
            >
              <img src={recipe} alt="recipe" />
              Search your Recipes
            </button>
          )}
          <div className={classes.ingredientsSelected}>
            {ingredientSelectedDiv}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredientSelected: state.ingredientSelected,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    oningredientRemove: (element) =>
      dispatch(actions.ingredientRemove(element)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
