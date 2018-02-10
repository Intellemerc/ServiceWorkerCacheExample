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
const bustCacheAction = () => {
  return {
    type: "nav/bustCache"
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      reload: reloadAction,
      clear: clearCacheAction,
      clearServer: clearServerCacheAction,
      bustCache: bustCacheAction
    },
    dispatch
  );
};

const Content = ({ reload, clear, clearServer, bustCache }) => {
  return (
    <div>
      <button onClick={reload}>Reload</button>
      <br />
      <br />
      <button onClick={clear}>clear nav cache</button>
      <br />
      <br />
      <button onClick={clearServer}>clear server nav cache and reload</button>
      <br />
      <br />
      <button onClick={bustCache}>bust cache example</button>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(Content);
