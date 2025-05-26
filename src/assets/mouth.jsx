import * as React from "react";

const Mouth = () => (
    <svg
        id="mouth"
        className="headParts"
        viewBox="0 0 987.679 1234.713"
    >
        <defs>
            <linearGradient id="mouth-a">
                <stop offset="0" stopColor="#ff8989" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#ff6464" stopOpacity="1"></stop>
            </linearGradient>
            <linearGradient
                xlinkHref="#mouth-a"
                id="mouth-b"
                x1="464.145"
                x2="462.921"
                y1="688.214"
                y2="661.721"
                gradientTransform="translate(-6.775 -62.962)"
                gradientUnits="userSpaceOnUse"
            ></linearGradient>
        </defs>
        <g
            strokeLinecap="round"
            display="inline"
            transform="translate(-16.217 -15.665)"
        >
            <path
                fill="#ffe6d5"
                stroke="none"
                strokeDasharray="none"
                strokeWidth="3"
                d="m245.072 594.319 147.839 122.989s138.545 13.688 155.05-.152l137.836-115.587L453.762 525.6z"
            ></path>
            <path
                fill="#a05a2c"
                stroke="none"
                strokeDasharray="none"
                strokeWidth="4.389"
                d="m442.32 663.514 39.348-1.261 11.815 2.684 3.962 6.464-34.026-1.534-33.57 2.998 2.588-6.172z"
            ></path>
            <path
                fill="#fc0"
                fillOpacity="1"
                stroke="none"
                strokeWidth="6.417"
                d="m364.084 707.508 83.352 53.99 42.569-2.577 67.74-46.304-.966-61.066-27.783 10.04-1.774 45.056-37.427 13.742-17.385-7.947-15.437.035-17.919 7.983-38.065-19.516.946-41.332-36.544.28z"
            ></path>
            <path
                fill="none"
                stroke="#deaa87"
                strokeDasharray="none"
                strokeWidth="2.02"
                d="m442.981 694.53 13.37 3.068h12.763l16.408-4.091"
            ></path>
            <path
                fill="url(#mouth-b)"
                fillOpacity="1"
                stroke="none"
                strokeWidth="7.43"
                d="m459.355 582.488-49.175.491-.627 86.158 29.271 34.295h48.004l28.1-35.614.142-85.975z"
                display="inline"
            ></path>
        </g>
    </svg>
);

export default Mouth;
