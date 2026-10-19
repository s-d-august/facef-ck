import * as React from "react";
import svgDefs from "./svgDefs";
import { insertGroup, getPath } from "../kkht/utils/svg";


function getTears(num) {
    return (
        <g>
            <path
                id={"tearDownRight" + num}
                fill="#fff"
                fillOpacity="0.75"
                stroke="#fff"
                strokeDasharray="none"
                strokeOpacity="0.9"
                strokeWidth="2.488"
                d={getPath("tearDownRight")}
                display="inline"
            ></path>
            <path
                id={"tearRight" + num}
                fill="#fcfdff"
                fillOpacity="0.75"
                stroke="#fff"
                strokeOpacity="0.9"
                strokeWidth="3"
                d={getPath("tearRight")}
                display="inline"
                opacity="1"
            ></path>
            <path
                id={"tearDownLeft" + num}
                fill="#fff"
                fillOpacity="0.75"
                stroke="#fff"
                strokeDasharray="none"
                strokeOpacity="0.9"
                strokeWidth="2.488"
                d={getPath("tearDownLeft")}
                display="inline"
            ></path>
            <path
                id={"tearLeft" + num}
                fill="#fcfdff"
                fillOpacity="0.75"
                stroke="#fff"
                strokeOpacity="0.9"
                strokeWidth="3"
                d={getPath("tearLeft")}
                display="inline"
                opacity="1"
            ></path>
        </g>
    )
}

const Head = () => (
    <svg
        id="head"
        viewBox="0 0 1133.265 1179.254"
        preserveAspectRatio="xMinYMax meet"

    >
        {svgDefs()}
        <g id="headGroup" display="inline" opacity="1">
            {insertGroup("headGroup")}
        </g>
        <g id="tearsGroup">
            {getTears("")}
            {getTears("2")}
            {getTears("3")}
        </g>

    </svg >
);

export default Head;
