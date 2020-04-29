import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "../../assets/style/Search.module.scss";
import Auxiliary from "../../Hoc/Auxiliary/Auxiliary";
import noReceipe from "../../assets/noRecipe.png";

class Dashboard extends Component {
  render() {
    let dashboardDiv = [];
    dashboardDiv = this.props.recipesFiltered.map((element) => (
      <div className={classes.dashboard} key={element.title}>
        <img src={element.img} alt="recipes" />
        <div className={classes.dashboardTitle}>{element.title}</div>
      </div>
    ));
    return (
      <Auxiliary>
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
export default connect(mapStateToProps, null)(Dashboard);
