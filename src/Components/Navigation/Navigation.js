import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Auxiliary from "../../Hoc/Auxiliary/Auxiliary";
import classes from "../../assets/style/Navigation.module.scss";
import IngredientGen from "../../Components/ingredientsGen/IngredientGen";
import recipe from "../../assets/recipe.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faTimes,
  faBars,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router";

class Navigation extends Component {
  state = {
    toggle: false,
    width: "mobile",
    vegetablesCollapseToggle: true,
    meatCollapseToggle: true,
    otherCollapseToggle: true,
    redirect: "",
    location: "",
  };

  componentDidMount() {
    console.log("NAVIGATION COMPONENT DID MOUNT", this.props);

    //fetch the recipes from the server
    this.props.onfetchRecipes(this.props.ingredientSelected);

    // add event listener on navigation and the the window width
    this.widthHanlder(window.screen.availWidth);
  }

  // screen event listener hanlder set the width state mobile or desktop
  widthHanlder = (screenWidth) => {
    if (screenWidth > 992) {
      this.setState({ width: "desktop" });
      this.props.onToggleMenuOpen();
    }
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
      this.props.onToggleMenu();
    }
    if (this.props.history.location.pathname === "/search") {
      return;
    } else {
      this.props.history.push("/search");
    }
    console.log("INGREDIENTS SELECTED", ingredientsSelected);
    console.log("recipes FETCH", recipes);
  };

  backHandler = () => {
    const redirectDiv = <Redirect to="/search" />;
    this.setState({ redirect: redirectDiv });
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

    return (
      <Auxiliary>
        {this.state.redirect}
        <div
          className={classes.menu}
          style={{
            transition: "all 0.5s",
            transform: this.props.toggle
              ? "translateX(0%)"
              : "translateX(-100%)",
            overflow:
              this.props.toggle && this.state.width === "mobile"
                ? "hidden"
                : "unset",
          }}
        >
          {/* close times div that close the navigation menu */}
          <div
            className={classes.close}
            style={{
              display: this.state.width === "desktop" ? "none" : "block",
            }}
            onClick={this.props.onToggleMenu}
          >
            <FontAwesomeIcon icon={faTimes} size="1x" />
          </div>

          {/* menu toggle div that open the navigation menu  */}
          <div
            className={classes.menuToggle}
            onClick={this.props.onToggleMenu}
            style={{
              display: this.state.width === "mobile" ? "block" : "none",
            }}
          >
            <FontAwesomeIcon icon={faBars} size="1x" />
          </div>

          {/*  Modal navigation menu  */}
          <div
            className={classes.menuModal}
            style={{
              display: this.state.width === "mobile" ? "block" : "none",
            }}
          ></div>

          {/*  Back button navigation menu  */}
          {this.props.history.location.pathname === "/search" ? null : (
            <div onClick={this.backHandler} className={classes.back}>
              <FontAwesomeIcon icon={faAngleLeft} size="1x" />
            </div>
          )}

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
      </Auxiliary>
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
    toggle: state.toggle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onfetchRecipes: (ingredientsSelected) =>
      dispatch(actions.fetchRecipes(ingredientsSelected)),
    onRecipeFilter: (ingredientsSelected, recipes) =>
      dispatch(actions.recipeFilter(ingredientsSelected, recipes)),
    onToggleMenu: () => dispatch(actions.toggleMenu()),
    onToggleMenuOpen: () => dispatch(actions.toggleMenuOpen()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
