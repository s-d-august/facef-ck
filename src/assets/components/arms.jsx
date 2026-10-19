import * as React from "react";
import svgDefs from "./svgDefs";
import { insertGroup } from "../kkht/utils/svg";

const Arms = () => (
    <svg
        id="armsGroup"
        viewBox="0 0 1133.265 1179.254"
        preserveAspectRatio="xMinYMax meet"

    >
        {svgDefs()}

        <g id="armsGroup" strokeLinecap="round" display="inline">
            {insertGroup("armsGroup")}
        </g>
    </svg>
);

export default Arms;
