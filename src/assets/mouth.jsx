import * as React from "react";

const Mouth = () => (
    <svg
        version="1.1"
        viewBox="0 0 1482.262 1233.252"
        id="mouth"
        className="headParts"
    >
        <defs>
            <linearGradient id="tongueGradientA">
                <stop offset="0" stopColor="#faa" stopOpacity="1"></stop>
                <stop offset="1" stopColor="#ff8080" stopOpacity="1"></stop>
            </linearGradient>
            <linearGradient
                xlinkHref="#tongueGradientA"
                id="tongueGradientB"
                x1="464.145"
                x2="462.921"
                y1="688.214"
                y2="664.205"
                gradientTransform="translate(-4.683 -59.712)"
                gradientUnits="userSpaceOnUse"
            ></linearGradient>
        </defs>
        <g
            fillOpacity="1"
            stroke="none"
            strokeLinecap="round"
            transform="translate(280.17 93.617)"
        >
            <rect
                width="195.919"
                height="122.853"
                x="365.841"
                y="612.898"
                fill="#ffe6d5"
                strokeWidth="7"
                ry="52.985"
            ></rect>
            <path
                fill="#fd5"
                strokeWidth="6.417"
                d="m369.465 717.029 98.254 44.055 78.583-31.14 14.755-23.95-6.616-19.985-68.029 35.267-21.645-12.88-21.644 11.709-74.74-33.54z"
            ></path>
            <path
                id="tongue"
                fill="url(#tongueGradientB)"
                strokeWidth="7.43"
                d="m456.479 587.394-49.175 1.32 4.34 83.673 29.271 34.295h48.004l28.1-35.614-3.17-87.63z"
            ></path>
        </g>
    </svg>
);

export default Mouth;
