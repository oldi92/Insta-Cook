import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import classes from "../../assets/style/Search.module.scss";
import Auxiliary from "../../Hoc/Auxiliary/Auxiliary";
import noReceipe from "../../assets/noRecipe.png";
import { Redirect } from "react-router";

class Dashboard extends Component {
  state = {
    redirect: "",
  };
  async recipePreviewHandler(recipe) {
    await this.dataPassHandler(recipe);
    await this.redirectHandler();
  }

  dataPassHandler = (recipe) => {
    this.props.onRecipePreviewDataPass(recipe);
  };

  redirectHandler = () => {
    const redirectPath = <Redirect to="/search/recipepreview" />;
    this.setState({ redirect: redirectPath });
  };

  render() {
    let dashboardDiv = [];
    dashboardDiv = this.props.recipesFiltered.map((element) => (
      <div
        onClick={() => this.recipePreviewHandler(element)}
        className={classes.dashboard}
        key={element.title}
      >
        <img src={element.img} alt="recipes" />
        <div className={classes.dashboardTitle}>{element.title}</div>
      </div>
    ));
    return (
      <Auxiliary>
        {this.state.redirect}
        {this.props.recipesFiltered.length === 0 ? (
          <div className={classes.noRecipe}>
            <img src={noReceipe} alt="no recipe found " />
            <div className={classes.noRecipeTitle}>
              <span style={{ fontWeight: "bold" }}>No Recipe</span> Found ...
            </div>
          </div>
        ) : (
          dashboardDiv
        )}
      </Auxiliary>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipesFiltered: state.recipesFiltered,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRecipePreviewDataPass: (title) =>
      dispatch(actions.recipePreviewDataPass(title)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
