import React from "react";
import { connect } from "react-redux";

const style = {
  float: "left",
  border: "1px solid black",
  //padding: 15,
  width: "20%",
  height: "70%",
  listStyle: "none",
  backgroundColor: "orange",
  color: "white"
};
const navItmStyle = {
  padding: 15,
  border: "1px solid gray",
  fontSize: 25
};

const mapStateToProps = state => {
  return state.app.nav;
};

const Nav = ({ loading, data }) => {
  return (
    <nav style={style}>
      {loading ? (
        <span>loading...</span>
      ) : (
        data.map((itm, idx) => (
          <li style={navItmStyle} key={idx}>
            {itm.moduleName}
          </li>
        ))
      )}
    </nav>
  );
};
export default connect(mapStateToProps)(Nav);
