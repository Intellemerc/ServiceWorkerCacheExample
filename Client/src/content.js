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
const clearServerCacheAction = () => {
  return {
    type: "nav/clearServerCache"
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      reload: reloadAction,
      clear: clearCacheAction,
      clearServer: clearServerCacheAction
    },
    dispatch
  );
};

const Content = ({ reload, clear, clearServer }) => {
  return (
    <div>
      <button onClick={reload}>Reload</button>
      <br />
      <br />
      <button onClick={clear}>clear nav cache</button>
      <br />
      <br />
      <button onClick={clearServer}>clear server nav cache and reload</button>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Content);
