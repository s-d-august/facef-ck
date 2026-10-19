import svgPath from "svgpath"
import svgDefs from "./svgDefs"
import { insertGroup, getPath } from "../kkht/utils/svg"

const beadPaths = [
    {
        id: "moveBead6",
        d: "M1013.71 246.008v21.021h-21.025v18.686h21.025v54.017h18.68v-54.017h21.03v-18.686h-21.03v-21.021z"
    },
    {
        id: "moveBead5",
        d: "M1023.41 218.326c-6.09 0-11.02 4.932-11.02 11.018 0 6.084 4.93 11.017 11.02 11.017 6.08 0 11.01-4.933 11.01-11.017 0-6.086-4.93-11.018-11.01-11.018"
    },
    {
        id: "moveBead4",
        d: "M1023.41 190.289c-6.09 0-11.02 4.934-11.02 11.017 0 6.086 4.93 11.021 11.02 11.021 6.08 0 11.01-4.935 11.01-11.021 0-6.083-4.93-11.017-11.01-11.017"
    },
    {
        id: "moveBead3",
        d: "M1023.41 162.253c-6.09 0-11.02 4.932-11.02 11.018 0 6.085 4.93 11.019 11.02 11.019 6.08 0 11.01-4.934 11.01-11.019 0-6.086-4.93-11.018-11.01-11.018"
    },
    {
        id: "moveBead2",
        d: "M1023.41 134.217c-6.09 0-11.02 4.934-11.02 11.019 0 6.087 4.93 11.018 11.02 11.018 6.08 0 11.01-4.931 11.01-11.018 0-6.085-4.93-11.019-11.01-11.019"
    },
    {
        id: "moveBead1",
        d: "M1023.41 106.18c-6.09 0-11.02 4.934-11.02 11.019 0 6.087 4.93 11.02 11.02 11.02 6.08 0 11.01-4.933 11.01-11.02 0-6.085-4.93-11.019-11.01-11.019"
    }]

const HairPullHand = ({ }) => (
    <div id="hairPullDiv">
        <svg
            preserveAspectRatio="xMinYMax meet"
            id="hairPullHandTopmost"
            viewBox="0 0 1133.265 1179.254"
        >
            {svgDefs()}
            <g id="hairPullGroup">
                {insertGroup("hairPullGroup")}
            </g>
        </svg>
        <div id="hairPullBeadsTopmost" >
            {beadPaths.map((bead) => (
                <svg
                    key={bead.id}
                    viewBox="0 0 1133.265 1179.254"
                    className="hairPullBeads rosaryMode"
                    id={bead.id}
                    preserveAspectRatio="xMinYMax meet"
                >
                    <path
                        fill="#2b1100"
                        fillOpacity="1"
                        stroke="none"
                        d={getPath(bead.id)}
                    />
                </svg>
            ))}

        </div>
    </div>

)

export default HairPullHand