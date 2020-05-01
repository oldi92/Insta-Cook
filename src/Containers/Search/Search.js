import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "../../assets/style/Search.module.scss";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Layout from "../../Hoc/Layout/Layout";

class Search extends Component {
  state = {
    width: "mobile",
    vegetablesCollapseToggle: true,
    meatCollapseToggle: true,
    otherCollapseToggle: true,
  };

  componentDidMount() {
    console.log("SEARCH COMPONENT DID MOUNT");
    // this.props.onfetchRecipes(this.props.ingredientSelected);
    this.widthHanlder(window.screen.availWidth);
  }

  widthHanlder = (screenWidth) => {
    if (screenWidth > 992) {
      this.setState({ width: "desktop" });
    }
  };

  render() {
    // console.log("[RECIPE FETCHED]", this.props.recipes);
    // console.log("[INGREDIENTS CHOOSEN]", this.props.ingredientSelected);
    // console.log("[FILTERED RECIPES]", this.props.recipesFiltered);

    // console.log("-------------------------------");
    // console.log(this.state.width);
    // console.log(this.state.toggle);

    return (
      <Layout {...this.props}>
        <div
          style={{
            height: this.props.recipesFiltered.length < 2 ? "100vh" : "100%",
            maxHeight:
              this.props.toggle && this.state.width === "mobile"
                ? "100vh"
                : "100%",
            overflowY:
              this.props.toggle && this.state.width === "mobile"
                ? "hidden"
                : "auto",
          }}
          className={classes.containcer}
        >
          <div className={classes.dashboardContainer}>
            <Dashboard props={this.props} />
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recipesFiltered: state.recipesFiltered,
  };
};

export default connect(mapStateToProps, null)(Search);
