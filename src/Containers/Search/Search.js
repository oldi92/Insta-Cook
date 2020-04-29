import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "../../assets/style/Search.module.scss";
import IngredientGen from "../../Components/ingredientsGen/IngredientGen";
import recipe from "../../assets/recipe.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import Dashboard from "../../Components/Dashboard/Dashboard";
import * as actions from "../../store/actions";

class Search extends Component {
  constructor() {
    super();

    this.state = {
      toggle: false,
      width: "mobile",
      vegetablesCollapseToggle: true,
      meatCollapseToggle: true,
      otherCollapseToggle: true,
    };
  }

  componentDidMount() {
    console.log("SEARCH COMPONENT DID MOUNT");
    this.props.onfetchRecipes(this.props.ingredientSelected);
    this.widthHanlder(window.screen.availWidth);
  }
  widthHanlder = (screenWidth) => {
    if (screenWidth > 992) {
      this.setState({ width: "desktop", toggle: true });
    }
  };

  toggleHandler = () => {
    console.log("CLICKED");
    this.setState({ toggle: !this.state.toggle });
  };

  vegetablesCollapseHanlder = () => {
    this.setState({
      vegetablesCollapseToggle: !this.state.vegetablesCollapseToggle,
      meatCollapseToggle: true,
      otherCollapseToggle: true,
    });
  };

  meatCollapseHanlder = () => {
    this.setState({
      meatCollapseToggle: !this.state.meatCollapseToggle,
      otherCollapseToggle: true,
      vegetablesCollapseToggle: true,
    });
  };

  otherCollapseHanlder = () => {
    this.setState({
      otherCollapseToggle: !this.state.otherCollapseToggle,
      vegetablesCollapseToggle: true,
      meatCollapseToggle: true,
    });
  };

  searchHanlder = (ingredientsSelected, recipes) => {
    this.props.onRecipeFilter(ingredientsSelected, recipes);
    if (this.state.width === "mobile") {
      this.setState({ toggle: false });
    }
    console.log("INGREDIENTS SELECTED", ingredientsSelected);
    console.log("recipes FETCH", recipes);
  };

  render() {
    let vegeterianProps = {
      name: "vegetablesIngredients",
      value: this.props.vegetablesIngredients,
    };

    let meatProps = {
      name: "meatIngredients",
      value: this.props.meatIngredients,
    };

    let otherProps = {
      name: "otherIngredients",
      value: this.props.otherIngredients,
    };

    console.log("[RECIPE FETCHED]", this.props.recipes);
    console.log("[INGREDIENTS CHOOSEN]", this.props.ingredientSelected);
    console.log("[FILTERED RECIPES]", this.props.recipesFiltered);

    console.log("-------------------------------");
    console.log(this.state.width);

    return (
      <div
        style={{
          height: this.props.recipesFiltered.length < 2 ? "100vh" : "100%",
          maxHeight:
            this.state.toggle && this.state.width === "mobile"
              ? "100vh"
              : "100%",
          overflowY:
            this.state.toggle && this.state.width === "mobile"
              ? "hidden"
              : "auto",
        }}
        className={classes.containcer}
      >
        <div
          className={classes.menu}
          style={{
            transition: "all 0.5s",
            transform: this.state.toggle
              ? "translateX(0%)"
              : "translateX(-100%)",
            overflow:
              this.state.toggle && this.state.width === "mobile"
                ? "hidden"
                : "unset",
          }}
        >
          <div
            className={classes.close}
            style={{
              display: this.state.width === "desktop" ? "none" : "block",
            }}
            onClick={this.toggleHandler}
          >
            <FontAwesomeIcon icon={faTimes} size="1x" />
          </div>

          <div
            className={classes.menuToggle}
            style={{
              display: this.state.width === "mobile" ? "block" : "none",
            }}
            onClick={this.toggleHandler}
          >
            M<br />e<br />n<br />u
          </div>
          <div className={classes.menuContainer}>
            {/* Vegetables collapse START here */}
            <div className={classes.collapse}>
              <h2 style={{ display: "flex" }}>
                Vegetables
                <div
                  className={classes.arrowDown}
                  onClick={this.vegetablesCollapseHanlder}
                >
                  <FontAwesomeIcon icon={faAngleDoubleDown} size="1x" />
                </div>
              </h2>
              <div
                className={classes.card}
                style={{
                  height: this.state.vegetablesCollapseToggle ? "0" : "100%",
                  overflow: this.state.vegetablesCollapseToggle
                    ? "hidden"
                    : "unset",
                }}
              >
                <IngredientGen ingredients={vegeterianProps} />
              </div>
            </div>
            {/* Vegetables collapse END here */}

            {/* Meatn And Fish collapse START here */}
            <div className={classes.collapse}>
              <h2 style={{ display: "flex" }}>
                Meat and Fish
                <div
                  className={classes.arrowDown}
                  onClick={this.meatCollapseHanlder}
                >
                  <FontAwesomeIcon icon={faAngleDoubleDown} size="1x" />
                </div>
              </h2>
              <div
                className={classes.card}
                style={{
                  height: this.state.meatCollapseToggle ? "0" : "100%",
                  overflow: this.state.meatCollapseToggle ? "hidden" : "unset",
                }}
              >
                <IngredientGen ingredients={meatProps} />
              </div>
            </div>
            {/* Meatn And Fish collapse End here */}

            {/* Other ingredients  collapse START here */}
            <div className={classes.collapse}>
              <h2 style={{ display: "flex" }}>
                Meat and Fish
                <div
                  className={classes.arrowDown}
                  onClick={this.otherCollapseHanlder}
                >
                  <FontAwesomeIcon icon={faAngleDoubleDown} size="1x" />
                </div>
              </h2>
              <div
                className={classes.card}
                style={{
                  height: this.state.otherCollapseToggle ? "0" : "100%",
                  overflow: this.state.otherCollapseToggle ? "hidden" : "unset",
                }}
              >
                <IngredientGen ingredients={otherProps} />
              </div>
            </div>
            {/* Other ingredients  collapse End here */}

            {/* seatch button take the chosen ingredients from user and fetch the machting recipes */}
            <button
              onClick={() =>
                this.searchHanlder(
                  this.props.ingredientSelected,
                  this.props.recipes
                )
              }
              className={classes.searchButton}
            >
              <img src={recipe} alt="recipe" />
              Go Search
            </button>
          </div>
        </div>
        <div className={classes.dashboardContainer}>
          <Dashboard />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vegetablesIngredients: state.vegetablesIngredients,
    meatIngredients: state.meatIngredients,
    otherIngredients: state.otherIngredients,
    ingredientSelected: state.ingredientSelected,
    recipes: state.recipes,
    recipesFiltered: state.recipesFiltered,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onfetchRecipes: (ingredientsSelected) =>
      dispatch(actions.fetchRecipes(ingredientsSelected)),
    onRecipeFilter: (ingredientsSelected, recipes) =>
      dispatch(actions.recipeFilter(ingredientsSelected, recipes)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
