import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const reloadAction = () => {
  return {
    type: "nav/reload"
  };
};
const clearCacheAction = () => {
  return {
    type: "nav/clearCache"
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      reload: reloadAction,
      clear: clearCacheAction
    },
    dispatch
  );
};

const Content = ({ reload, clear }) => {
  return (
    <div>
      <button onClick={reload}>Reload</button>
      <br />
      <br />
      <button onClick={clear}>clear nav cache</button>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Content);
