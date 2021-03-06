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
      {/*are we waiting for nav to download?*/}
      {loading ? (
        <span>loading...</span>
      ) : data ? (
        data.map((itm, idx) => (
          <li style={navItmStyle} key={idx}>
            {itm.title}
          </li>
        ))
      ) : (
        <span>Error Downloading</span>
      )}
    </nav>
  );
};
export default connect(mapStateToProps)(Nav);
