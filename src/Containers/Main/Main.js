import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "../../assets/style/Main.module.scss";
import recipe from "../../assets/recipe.png";
import meat from "../../assets/meat.png";
import other from "../../assets/other.png";
import vegetables from "../../assets/vegetables.png";
import * as actions from "../../store/actions";

class Main extends Component {
  search = (data) => {
    this.props.history.push("/search");
  };

  render() {
    let ingredientsSelectedDiv = [];
    ingredientsSelectedDiv = this.props.ingredientSelected.map((element) => (
      <div>{element}</div>
    ));

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
              {this.props.vegetablesSum > 0 ? (
                <span style={{ paddingLeft: "0.4rem" }}>
                  ({this.props.vegetablesSum})
                </span>
              ) : null}
            </button>
            <button onClick={() => this.props.history.push("/meat")}>
              <img src={meat} alt="vegetables" />
              <br />
              Meat or Fish
              {this.props.meatSum > 0 ? (
                <span style={{ paddingLeft: "0.4rem" }}>
                  ({this.props.meatSum})
                </span>
              ) : null}
            </button>
            <button onClick={() => this.props.history.push("/other")}>
              <img src={other} alt="vegetables" />
              <br />
              Other ingredients
              {this.props.otherSum > 0 ? (
                <span style={{ paddingLeft: "0.4rem" }}>
                  ({this.props.otherSum})
                </span>
              ) : null}
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
            {ingredientsSelectedDiv}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredientSelected: state.ingredientSelected,
    vegetablesSum: state.vegetablesSum,
    meatSum: state.meatSum,
    otherSum: state.otherSum,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    oningredientRemove: (element) =>
      dispatch(actions.ingredientRemove(element)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
