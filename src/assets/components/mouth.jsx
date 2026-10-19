import svgDefs from "./svgDefs"
import { insertGroup } from "../kkht/utils/svg"
const Mouth = () => (
    <svg
        id="mouthFull"
        viewBox="0 0 1133.265 1179.254"
        preserveAspectRatio="xMinYMax meet"

    >
        {svgDefs()}
        <g id="mouthGroup" strokeLinecap="round" display="inline">
            {insertGroup("mouthGroup")}
        </g>

    </svg>
)

export default Mouth