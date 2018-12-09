import React from "react";
import ReactDOM from "react-dom";

const placeholder = document.getElementById("root");

import(/* webpackChunkName: "adman-video-analytics" */'./containers/Root')
  .then(({ default: App }) => ReactDOM.render(<App />, placeholder));