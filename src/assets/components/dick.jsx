const censored = true
import { svgDefs } from "../kkht/utils/svg";
import { insertGroup } from "../kkht/utils/svg";

const Dick = (props) => (
    <div id="dickHandTopmost">
        <svg
            id="dickHandFingersGroup"
            viewBox="0 0 1133.265 1179.254"
            preserveAspectRatio="xMinYMax meet"
        >
            {svgDefs()}
            <g strokeWidth="4.816" id="dickHandFingersGroup">
                {insertGroup("dickHandFingersGroup")}
            </g>
        </svg>

        <svg viewBox="0 0 1133.265 1179.254" id="cumshotSvg" preserveAspectRatio="xMinYMax meet">
            <g id="cumshotGroup">
                {insertGroup("cumshotGroup")}
            </g>
        </svg>

        <svg
            viewBox="0 0 1133.265 1179.254"
            id="dick"
            preserveAspectRatio="xMinYMax meet"
        >
            {svgDefs()}
            <g
                id="dickGroup"
                fillOpacity="1"
                stroke="none"
                strokeLinecap="round"
            >
                {insertGroup("dickGroup")}
            </g>
        </svg>

        <svg id="dickHandTopmost"
            viewBox="0 0 1133.265 1179.254"
            preserveAspectRatio="xMinYMax meet"
        >
            {svgDefs()}

            <g id="dickHandGroup">
                {insertGroup("dickHandGroup")}
            </g>

        </svg>
    </div >

);

export default Dick;

