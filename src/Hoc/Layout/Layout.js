import React from "react";

import Auxiliary from "../Auxiliary/Auxiliary";
import Navigation from "../../Components/Navigation/Navigation";

const layout = (props) => (
  <Auxiliary>
    <Navigation {...props} />
    <main>{props.children}</main>
  </Auxiliary>
);

export default layout;
