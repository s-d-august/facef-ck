import * as React from "react";
import { svgDefs } from "../kkht/utils/svg";
import { insertGroup } from "../kkht/utils/svg";

const Body = () => (
  <svg
    id="body"
    viewBox="0 0 1133.265 1179.254"
    preserveAspectRatio="xMinYMax meet"
  >
    {svgDefs()}
    <g id="bodyGroup">
      <g id="bodyScaleGroup" display="inline" transformOrigin="bottom">
        {insertGroup("bodyScaleGroup")}
      </g>
    </g>
  </svg>

);

export default Body;
