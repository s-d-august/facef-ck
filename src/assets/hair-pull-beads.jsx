import React from "react";

const beadPaths = [
    "M1069.647 423.153v19.08h-19.08v16.958h19.08v49.026h16.96v-49.025h19.08v-16.96h-19.08v-19.079z",
    "M1078.449 398.029c-5.523 0-10 4.476-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.524-4.477-10-10-10",
    "M1078.449 372.583c-5.523 0-10 4.477-10 10s4.477 10.001 10 10.001 10-4.478 10-10.001-4.477-10-10-10",
    "M1078.449 347.138c-5.523 0-10 4.476-10 10 0 5.522 4.477 10.002 10 10.002s10-4.48 10-10.002c0-5.524-4.477-10-10-10",
    "M1078.449 321.692c-5.523 0-10 4.478-10 10.001 0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10.001-10-10.001",
    "M1078.449 296.247c-5.523 0-10 4.478-10 10 0 5.524 4.477 10.002 10 10.002s10-4.478 10-10.002c0-5.522-4.477-10-10-10"
];

const transform = "matrix(.89647 0 0 .89647 -211.852 -153.4)";

const HairPullBeads = () => (
    <div className="noInteract hideHand" id="hairPullBeads">
        {beadPaths.map((d, i) => (
            <svg
                key={i}
                viewBox="0 0 987.679 1234.713"
                className="hairPullBeads"
            >
                <path
                    fill="#2b1100"
                    fillOpacity="1"
                    fillRule="nonzero"
                    stroke="none"
                    strokeWidth="0.016"
                    d={d}
                    transform={transform}
                />
            </svg>
        ))}
    </div>
);

export default HairPullBeads;