import * as React from "react";
import svgPath from "svgpath";

function fix(el) {
    return svgPath(el).translate(-16.217, -15.665).toString()
}

const Head = () => (
    <svg
        id="head"
        className="headParts"
        version="1.1"
        viewBox="0 0 987.679 1234.713"
    >
        <defs id="defs1">
            <pattern
                xlinkHref="#pattern70"
                id="pattern33"
                x="0"
                y="0"
                patternTransform="matrix(6.6322 -3.15488 .74771 1.57184 -747.143 497.657)"
                preserveAspectRatio="xMidYMid"
            ></pattern>
            <pattern
                xlinkHref="#pattern71"
                id="pattern72"
                x="0"
                y="0"
                patternTransform="scale(-10.14258 -2.74232)"
                preserveAspectRatio="xMidYMid"
            ></pattern>
            <pattern
                xlinkHref="#pattern70"
                id="pattern71"
                x="0"
                y="0"
                patternTransform="matrix(9.90305 0 0 2.76103 -979.979 -289.193)"
                preserveAspectRatio="xMidYMid"
            ></pattern>
            <pattern
                id="pattern70"
                width="2"
                height="10"
                fill="#e79600"
                patternTransform="scale(2)"
                patternUnits="userSpaceOnUse"
                preserveAspectRatio="xMidYMid"
            >
                <path id="rect70" stroke="none" d="M0-.5h1v11H0z"></path>
            </pattern>
            <pattern
                xlinkHref="#pattern40"
                id="pattern41"
                x="0"
                y="0"
                patternTransform="matrix(7.16594 .34743 -.04674 .964 0 0)"
                preserveAspectRatio="xMidYMid"
            ></pattern>
            <pattern
                xlinkHref="#pattern38"
                id="pattern40"
                patternTransform="matrix(7.17435 0 0 .96513 256.648 330.33)"
                preserveAspectRatio="xMidYMid"
            ></pattern>
            <pattern
                xlinkHref="#Strips1_1"
                id="pattern38"
                x="0"
                y="0"
                patternTransform="scale(11.31384 1.75163)"
                preserveAspectRatio="xMidYMid"
            ></pattern>
            <pattern
                id="Strips1_1"
                width="2"
                height="10"
                fill="#e79600"
                patternTransform="scale(2)"
                patternUnits="userSpaceOnUse"
                preserveAspectRatio="xMidYMid"
            >
                <path id="rect134" stroke="none" d="M0-.5h1v11H0z"></path>
            </pattern>
            <pattern
                xlinkHref="#Strips1_2"
                id="pattern30"
                x="0"
                y="0"
                patternTransform="rotate(-57.668)scale(2)"
                preserveAspectRatio="xMidYMid"
            ></pattern>
            <pattern
                xlinkHref="#Strips1_2"
                id="pattern29"
                x="0"
                y="0"
                patternTransform="rotate(4.087)scale(2)"
                preserveAspectRatio="xMidYMid"
            ></pattern>
            <pattern
                id="Strips1_2"
                width="3"
                height="1"
                fill="#e79600"
                patternTransform="scale(2)"
                patternUnits="userSpaceOnUse"
                preserveAspectRatio="xMidYMid"
            >
                <path id="rect146" stroke="none" d="M0-.5h1v2H0z"></path>
            </pattern>
            <radialGradient
                xlinkHref="#linearGradient57"
                id="radialGradient58"
                cx="588.294"
                cy="549.659"
                r="65.404"
                fx="588.294"
                fy="549.659"
                gradientTransform="matrix(1 0 0 .44304 79.242 206.603)"
                gradientUnits="userSpaceOnUse"
            ></radialGradient>
            <radialGradient
                xlinkHref="#linearGradient57"
                id="radialGradient59"
                cx="588.294"
                cy="549.659"
                r="65.404"
                fx="588.294"
                fy="549.659"
                gradientTransform="matrix(1 0 0 .44304 -362.453 364.082)"
                gradientUnits="userSpaceOnUse"
            ></radialGradient>
            <radialGradient
                xlinkHref="#linearGradient57"
                id="radialGradient60"
                cx="588.294"
                cy="549.659"
                r="65.404"
                fx="588.294"
                fy="549.659"
                gradientTransform="matrix(1.59494 0 0 .51266 -475.4 256.269)"
                gradientUnits="userSpaceOnUse"
            ></radialGradient>
            <linearGradient id="linearGradient57">
                <stop id="stop57" offset="0" stopColor="#ffb8b8" stopOpacity="1"></stop>
                <stop id="stop58" offset="1" stopColor="#ff8080" stopOpacity="0"></stop>
            </linearGradient>
        </defs>
        <g id="headArea" opacity="1" transform="translate(-16.217 -15.665)">
            <path
                id="faceArea"
                opacity="0"
                fill="#fff"
                stroke="none"
                strokeWidth="2.835"
                d="m557.138 708.792-196.699-15.22-104.203-103.033-8.196-314.951 407.447-1.17 4.683 348.904z"
            ></path>
            <path
                id="eyesBack"
                fill="#e9c6af"
                fillOpacity="1"
                stroke="none"
                strokeDasharray="none"
                strokeLinecap="round"
                strokeWidth="3"
                d="M199.183 415.539h506.673v125.012H199.183z"
            ></path>
            <g
                id="eyeLeft"
                className="blink"
                stroke="none"
                strokeLinecap="round"
                display="inline"
            >
                <path
                    id="eyeFillLeft"
                    fill="#fff"
                    strokeWidth="3.623"
                    d={svgPath("m413.5 488.58 3.777-35.468c-21.817-17.968-30.07-26.932-56.712-33.841l-100.037 31.724 7.082 19.586 39.187 23.874z").translate(0, 18)}
                    opacity="1"
                ></path>
                <g id="eyeCenterLeft" className="eyeCenter">
                    <path id="irisLeft"
                        fill="#5f8dd3"
                        d={svgPath("M344.157,444.011a22,22 0 1,0 44,0a22,22 0 1,0 -44,0").translate(0, 35)}>

                    </path>
                    <path id="pupilLeft"
                        className="pupil"
                        fill="#000"
                        d={svgPath("M357.21099999999996,444.011a8.946,8.946 0 1,0 17.892,0a8.946,8.946 0 1,0 -17.892,0").translate(0, 35)}>

                    </path>
                </g></g>
            <g
                id="eyeRight"
                className="blink"
                stroke="none"
                strokeLinecap="round"
                display="inline"
            >
                <path
                    id="eyeFillRight"
                    fill="#fff"
                    strokeWidth="3.663"
                    d={svgPath("m506.317 483.16-10.473-35.906 34.685-28.894 20.953-8.572 40.584 13.27 58.912 21.074-15.056 21.856-32.074 18.733z").translate(0, 18)}
                    opacity="1"
                ></path>
                <g id="eyeCenterRight" className="eyeCenter">
                    <path
                        id="irisRight"
                        d={svgPath("M527.994,436.93a22,22 0 1,0 44,0a22,22 0 1,0 -44,0").translate(0, 35)}
                        fill="#5f8dd3">

                    </path>
                    <path
                        id="pupilRight"
                        className="pupil"
                        fill="#000"
                        d={svgPath("M541.048,436.93a8.946,8.946 0 1,0 17.892,0a8.946,8.946 0 1,0 -17.892,0").translate(0, 35)}>

                    </path>

                </g></g>
            <g id="faceGroup" fill="#ffe6d5" opacity="1">
                <path
                    id="faceWide"
                    d="M460.65 21.681 228.793 148.665l-29.79 143.843 33.278 280.464 120.145 74.778 60.597 2.18 36.626 4.281 32.137-.434 35.02-10.422-28.27-14.937 93.169 43.694L745.16 554.5l-14.05-175.718-10.537-284.51zm87.227 406.275 55.906 9.951 30.852 26.516-16.392 15.807-19.902 14.05-67.915 2.656-20.893-15.707-4.977-14.636 21.655-28.987zm-186.246 7.435c12.23 2.829 23.81 6.419 32.672 12.432 8.065 5.472 13.879 12.951 15.88 23.69l-3.452 14.045-20.933 17.202-65.713-2.644-30.552-21.01-7.965-7.999 27.72-27.16z"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="faceShut"
                    strokeLinecap="round"
                    strokeWidth="3"
                    d="M460.133 22.246 228.276 149.23l-29.79 143.843 33.278 280.464 120.145 74.778 50.53-8.655 41.541 13.36 42.262-1.705 39.22-12.542 53.884 35.763 84.244-67.385 26.61-45.647 40.394-182.157-10.537-284.51zM553.8 439.06l36.295 9.95 40.27 12.082-14.879 12.144-59.929-5.199-42.468 5.63-6.12.81-2.929-7.318 31.022-21.67zm-196.197 6.556c23.358 5.403 30.594 12.413 49.723 26.463l-3.018 6.952-10.569-1.398-38.785-5.13-57.6 4.192-13.819-6.828 38.305-12.541z"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="faceHalf"
                    strokeLinecap="round"
                    strokeWidth="3"
                    d="M460.133 22.246 228.276 149.23l-29.79 143.843 33.278 280.464 111.038 83.056 61.914-15.691 39.645 18.106 39.811-5.002 33.88-15.027 64.336 32.998 103.448-85.9.267-33.94 44.491-172.79-10.537-284.51zM553.8 439.06l36.295 9.95 40.27 12.082-11.367 20.047-59.343-5.199-50.345 7.612-3.123-9.716-2.147-6.677 31.022-21.67zm-196.197 6.556c11.558 2.674 19.169 5.74 26.226 9.86 7.205 4.204 13.833 9.505 23.497 16.603l-2.147 8.829-1.75 7.197-49.06-5.943-58.77 4.485-10.893-20 36.867-10.636z"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="faceOpen"
                    strokeLinecap="round"
                    strokeWidth="3"
                    d="M460.133 22.246 228.276 149.23l-29.79 143.843 33.278 280.464 120.145 74.778 60.597 2.179 36.626 4.282 32.137-.434 35.02-10.422-28.27-14.937 75.783 37.899 180.842-111.817-14.05-175.718-10.537-284.51ZM553.8 439.06l36.295 9.95 41.097 15.394-13.465 16.392-28.683 14.049-57.866-.578-17.77-.178-9.368-26.93 31.022-21.67zm-196.197 6.556c11.76 2.72 19.434 5.848 26.596 10.077 7.063 4.17 13.629 9.41 23.127 16.386l-3.311 27.735-18.537.19-65.909.678-34.357-18.668-6.21-15.317 48.729-13.069z"
                    display="inline"
                    opacity="1"
                ></path>
            </g>
            <path
                id="crease"
                fill="#502d16"
                stroke="#deaa87"
                strokeLinecap="round"
                strokeWidth="2.835"
                d="m501.365 515.715 14.074 14.074"
            ></path>
            <path
                id="path6"
                fill="#fc0"
                fillOpacity="1"
                stroke="none"
                strokeLinecap="round"
                strokeWidth="2.751"
                d="m401.799 611.713-43.704 34.581.527 21.347 35.666 6.46.761-8.457 18.344-9.618 26.047 9.949 43.615.435 28.397-10.545 19.673 15.416 26.034-3.63.296-16.18-44.35-39.603-35.205 34.61-33.182-.03z"
                opacity="1"
            ></path>
            <path
                id="path2"
                fill="#deaa87"
                strokeLinecap="round"
                strokeWidth="3"
                d="m446.368 498.428-.811 149.248-46.85-33.195z"
            ></path>
            <path
                id="path3"
                fill="none"
                stroke="#deaa87"
                strokeLinecap="round"
                strokeOpacity="1"
                strokeWidth="3"
                d="m478.766 645.91 34.598-33.001-9.366-19.904"
            ></path>
            <g
                id="bottomLineLeftGroup"
                fill="none"
                stroke="#deaa87"
                strokeLinecap="round"
                strokeOpacity="1"
                strokeWidth="3"
            >
                <path
                    id="bottomLineLeftOpen"
                    d="m285.421 482.994 34.368 17.905 84.145-.958"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="bottomLineLeftHalf"
                    d="m402.864 488.15-49.327-6.221-58.167 4.493"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="bottomLineLeftWide"
                    d="m405.075 486.98-20.641 16.024-68.815-2.57-19.327-14.597"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="bottomLineLeftShut"
                    d="m404.034 478.491-49.326-6.221-58.168 4.493"
                    display="inline"
                    opacity="1"
                ></path>
            </g>
            <g
                id="bottomLineRightGroup"
                fill="none"
                stroke="#deaa87"
                strokeLinecap="round"
                strokeOpacity="1"
                strokeWidth="3"
            >
                <path
                    id="bottomLineRightOpen"
                    d="m512.737 494.004 80.373.426 28.928-16.048"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="bottomLineRightHalf"
                    d="m509.012 481.71 49.326-6.22 59.457 5.078"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="bottomLineRightWide"
                    d="m509.012 481.71 20.641 16.025 68.815-2.57 19.327-14.597"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="bottomLineRightShut"
                    d="m506.963 474.1 49.326-6.221 59.457 5.079"
                    display="inline"
                    opacity="1"
                ></path>
            </g>
            <g
                id="eyelinesRightGroup"
                fill="none"
                stroke="#deaa87"
                strokeLinecap="round"
                strokeOpacity="1"
                strokeWidth="3"
            >
                <path
                    id="eyelinesRightOpen"
                    d="m516.193 498.57 84.447 1.656zm3.698 4.938 79.122 1.715zm3.693 4.937 74.01 1.776z"
                    display="inline"
                ></path>
                <path
                    id="eyelinesRightShut"
                    d="m509.23 478.77 84.422-2.635zm3.944 4.743 79.107-2.305zm3.939 4.744 74.005-1.986z"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="eyelinesRightWide"
                    d="m524.593 505.54 84.422-2.635zm3.943 4.743 79.107-2.306zm3.94 4.743 74.005-1.985z"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="eyelinesRightHalf"
                    d="m511.714 486.22 84.422-2.634zm3.943 4.744 79.107-2.305zm3.94 4.744 74.005-1.986z"
                    display="inline"
                    opacity="1"
                ></path>
            </g>
            <g
                id="eyelinesLeftGroup"
                fill="none"
                stroke="#deaa87"
                strokeLinecap="round"
                strokeOpacity="1"
                strokeWidth="3"
            >
                <path
                    id="eyelinesLeftOpen"
                    d="m402.833 504.939-87.74 1.731zm-3.666 4.96-82.417 1.757zm-3.663 4.96-77.305 1.787z"
                    display="inline"
                ></path>
                <path
                    id="eyelinesLeftHalf"
                    d="m400.564 492.555-87.73-2.192zm-3.885 4.791-82.413-1.928zm-3.88 4.792-77.308-1.67z"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="eyelinesLeftWide"
                    d="m389.494 510.808-84.422-2.634zm-3.943 4.743-79.107-2.305zm-3.94 4.744-74.005-1.985z"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="eyelinesLeftShut"
                    d="m400.978 482.62-87.73-2.191Zm-3.885 4.792-82.413-1.928zm-3.88 4.791-77.308-1.67z"
                    display="inline"
                    opacity="1"
                ></path>
            </g>
            <g
                id="faceShadowGroup"
                fill="#c8b7b7"
                fillOpacity="1"
                stroke="none"
                strokeLinecap="round"
                strokeWidth="3"
            >
                <path
                    id="faceShadowOpen"
                    d="m233.889 261.652-10.135 207.637 52.344-.262 41.786-11.819 38.062-10.765c10.251 2.371 18.081 3.955 24.588 7.479 6.528 3.535 17.939 13.982 25.275 19.453l96.707-5.483 30.889-21.576 18.738-6.429 36.295 9.951 51.404 17.369 51.873-.26 34.153-202.189z"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="faceShadowWide"
                    d="M235.545 260.824 225.41 468.461l55.857 2.373c14.111-13.298 21.204-14.002 35.186-22.872 13.69-2.137 35.613-6.101 47.301-7.41 10.224 4.544 14.529 4.925 21.07 8.444 6.538 3.517 17.647 17.202 24.983 22.673l94.365-4.604 25.035-24.211 21.372-8.186 47.418 7.317 37.062 23.223 58.312.911 34.153-202.189Z"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="faceShadowShut"
                    d="M235.545 260.824 225.41 468.461l56.484 1.394 29.796-8.952 36.805-5.353c10.251 1.129 22.491 3.207 29.555 5.409 7.357 2.293 20.423 5.289 27.76 10.761l98.362-4.655 31.303-12.884 27.017-3.946 36.709 4.984 42.297 11.16 51.873-.26 34.153-202.189Z"
                    display="inline"
                    opacity="1"
                ></path>
            </g>
            <g
                id="topLineRightGroup"
                fill="none"
                stroke="#d38d5f"
                strokeLinecap="round"
                strokeOpacity="1"
                strokeWidth="3"
            >
                <path
                    id="topLineRightOpen"
                    d="m503.454 467.158 31.924-22.864 19.885-6.114 37.759 12.001 40.653 15.05"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="topLineRightWide"
                    d="m503.454 467.158 25.485-23.45 22.226-9.04 47.126 7.318 35.384 23.245"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="topLineRightShut"
                    d="m503.454 467.158 31.924-11.688 26.922-4.457 36.103 4.964 30.305 6.77"
                    display="inline"
                    opacity="1"
                ></path>
            </g>
            <g
                id="topLineLeftGroup"
                fill="none"
                stroke="#d38d5f"
                strokeLinecap="round"
                strokeOpacity="1"
                strokeWidth="3"
            >
                <path
                    id="topLineLeftOpen"
                    d="m407.718 472.753-25.617-19.494-25.409-7.193-35.615 10.295-41.037 11.966"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="topLineLeftWide"
                    d="m410.633 472.427-25.485-23.45-22.226-9.04-47.125 7.317-35.385 23.245"
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="topLineLeftShut"
                    d="m406.831 471.712-31.924-11.688-26.922-4.458-36.103 4.964-28.649 9.254"
                    display="inline"
                    opacity="1"
                ></path>
            </g>
            <path
                id="path23"
                fill="none"
                stroke="#deaa87"
                strokeLinecap="round"
                strokeOpacity="1"
                strokeWidth="3"
                d="m675.564 531.686-8.28 25.665-19.869 13.246"
                display="inline"
                opacity="1"
            ></path>
            <path
                id="path24"
                fill="none"
                stroke="#deaa87"
                strokeLinecap="round"
                strokeOpacity="1"
                strokeWidth="3"
                d="m262.218 556.24 9.107 15.73 23.181 9.106"
                display="inline"
                opacity="1"
            ></path>

            <g
                id="sweatGroup"
                fill="#fff"
                fillOpacity="0.5"
            >
                <path
                    id="sweat1"
                    className="sweat"
                    d="M437.341 225.82c-.578 30.383-6.714 38.234-3.517 43.44 1.57 2.555 4.567 2.218 6.048.504 4.452-5.153-3.615-12.895-2.531-43.944z"
                    opacity="1"
                ></path>
                <path
                    id="sweat2"
                    className="sweat"
                    d="M296.185 262.661c-.578 30.383-6.714 38.234-3.517 43.44 1.57 2.556 4.566 2.218 6.047.504 4.452-5.152-3.614-12.895-2.53-43.944z"
                    opacity="1"
                ></path>
                <path
                    id="sweat3"
                    className="sweat"
                    d="M270.934 274.666c-.578 30.383-6.714 38.234-3.517 43.44 1.57 2.555 4.566 2.218 6.047.504 4.452-5.153-3.614-12.895-2.53-43.944z"
                    opacity="1"
                ></path>
                <path
                    id="sweat4"
                    className="sweat"
                    d="M323.92 257.28c-.578 30.383-6.714 38.234-3.517 43.44 1.569 2.555 4.566 2.218 6.047.504 4.452-5.153-3.615-12.895-2.53-43.944z"
                    opacity="1"
                ></path>
                <path
                    id="sweat6"
                    className="sweat"
                    d="M378.56 242.378c-.577 30.383-6.713 38.234-3.516 43.44 1.57 2.555 4.566 2.218 6.047.504 4.452-5.153-3.615-12.895-2.53-43.944z"
                    opacity="1"
                ></path>
                <path
                    id="sweat7"
                    className="sweat"
                    d="M350.412 249.001c-.578 30.383-6.714 38.234-3.517 43.44 1.57 2.555 4.567 2.218 6.047.504 4.453-5.153-3.614-12.895-2.53-43.944z"
                    opacity="1"
                ></path>
                <path
                    id="sweat5"
                    className="sweat"
                    d="M406.709 230.787c-.578 30.383-6.714 38.234-3.517 43.44 1.57 2.555 4.566 2.218 6.047.504 4.452-5.152-3.614-12.895-2.53-43.944z"
                    opacity="1"
                ></path>
                <path
                    id="sweat8"
                    className="sweat"
                    d="M465.49 228.304c-.578 30.383-6.714 38.234-3.517 43.44 1.57 2.555 4.566 2.218 6.047.504 4.452-5.153-3.614-12.895-2.53-43.944z"
                    opacity="1"
                ></path>
                <path
                    id="sweat9"
                    className="sweat"
                    d="M493.638 229.132c-.578 30.382-6.714 38.234-3.517 43.44 1.57 2.555 4.567 2.218 6.048.504 4.452-5.153-3.615-12.895-2.531-43.945z"
                    opacity="1"
                ></path>
                <path
                    id="sweat10"
                    className="sweat"
                    d="M523.442 231.615c-.577 30.383-6.713 38.234-3.516 43.44 1.569 2.555 4.566 2.218 6.047.504 4.452-5.152-3.615-12.895-2.53-43.944z"
                    opacity="1"
                ></path>
                <path
                    id="sweat11"
                    className="sweat"
                    d="M551.59 233.271c-.577 30.383-6.713 38.234-3.516 43.44 1.57 2.555 4.566 2.218 6.047.504 4.452-5.153-3.614-12.895-2.53-43.944z"
                    opacity="1"
                ></path>
                <path
                    id="sweat12"
                    className="sweat"
                    d="M581.395 236.583c-.577 30.382-6.714 38.234-3.517 43.44 1.57 2.555 4.567 2.218 6.048.504 4.452-5.153-3.615-12.895-2.53-43.944z"
                    opacity="1"
                ></path>
                <path
                    id="sweat14"
                    className="sweat"
                    d="M610.371 240.722c-.577 30.383-6.713 38.234-3.516 43.44 1.57 2.555 4.566 2.218 6.047.504 4.452-5.153-3.614-12.895-2.53-43.944z"
                    opacity="1"
                ></path>
                <path
                    id="sweat13"
                    className="sweat"
                    d="M636.036 244.034c-.577 30.383-6.713 38.234-3.516 43.44 1.569 2.555 4.566 2.218 6.047.504 4.452-5.153-3.615-12.895-2.53-43.944z"
                    opacity="1"
                ></path>
            </g>
            <path
                id="path7"
                fill="#fc0"
                fillOpacity="1"
                stroke="none"
                strokeLinecap="round"
                strokeWidth="3"
                d="m312.113 306.478-49.849 19.01 9.367 217.774 34.46 191.48 24.081 97.713-181.477-49.174 10.537-93.666 8.196-453.109 38.637-142.84 52.687 33.954z"
                opacity="1"
            ></path>
            <path
                id="path8"
                fill="#fc0"
                fillOpacity="1"
                stroke="none"
                strokeLinecap="round"
                strokeWidth="3"
                d="m311.439 306.756 120.595-33.954 119.424 7.025 95.498 13.99 15.22 138.158s-9.721 119.282-9.721 123.965c0 2.61-2.425 97.415-5.94 162.382-1.859 45.511-11.505 47.773-11.42 95.003 29.476-12.792 160.082-65.299 160.082-65.299l-1.97-94.925-23.976-207.017-45.662-364.126-125.278-57.37-196.699-9.367-155.72 59.712-4.758 72.281Z"
                opacity="1"
            ></path>

            <g id="layer2" fillOpacity="1" stroke="none" strokeLinecap="round">
                <path
                    id="path26"
                    fill="url(#pattern33)"
                    strokeWidth="3"
                    d="m262.383 326.226-12.586-52.394 59.419 33.954z"
                    opacity="1"
                ></path>
                <path
                    id="path25"
                    fill="url(#pattern30)"
                    strokeWidth="3"
                    d="m311.29 307.15-68.716-190.417-36.428-22.146 44.707 180.275Z"
                    opacity="1"
                ></path>
                <path
                    id="path27"
                    fill="url(#pattern29)"
                    strokeWidth="3"
                    d="m311.703 305.7-68.715-186.69 3.518-43.671 70.165 203.87Z"
                    opacity="1"
                ></path>
                <path
                    id="path38"
                    fill="url(#pattern71)"
                    strokeWidth="3"
                    d="m326.317 831.94-18.457-94.756-150.112-48.468-9.296 94.565z"
                    opacity="1"
                ></path>
                <path
                    id="path40"
                    fill="url(#pattern41)"
                    strokeWidth="3"
                    d="m309.865 308.116.193-44.956 108.983-88.336 227.942 29.482-.071 89.296-96.07-14.298-120.325-5.77z"
                    opacity="1"
                ></path>
                <path
                    id="path71"
                    fill="url(#pattern72)"
                    strokeWidth="3.026"
                    d="m631.522 814.597 14.152-102.028 147.562-63.661 4.84 96.9z"
                    opacity="1"
                ></path>
            </g>

            <g
                id="blush"
                fillOpacity="1"
                stroke="none"
                strokeDasharray="none"
                strokeLinecap="round"
                display="inline"
                opacity="1"
            >
                <ellipse
                    id="blushMiddle"
                    className="blush"
                    cx="462.892"
                    cy="538.056"
                    fill="url(#radialGradient60)"
                    strokeWidth="5.606"
                    rx="104.315"
                    ry="33.53"
                ></ellipse>
                <ellipse
                    id="blushLeft"
                    className="blush"
                    cx="225.841"
                    cy="607.602"
                    fill="url(#radialGradient59)"
                    strokeWidth="4.126"
                    opacity="1"
                    rx="65.404"
                    ry="28.976"
                    transform="rotate(-10.855)"
                ></ellipse>
                <ellipse
                    id="blushRight"
                    className="blush"
                    cx="667.536"
                    cy="450.123"
                    fill="url(#radialGradient58)"
                    strokeWidth="4.126"
                    opacity="1"
                    rx="65.404"
                    ry="28.976"
                    transform="rotate(9.063)"
                ></ellipse>
            </g>
            <path
                id="tearRight"
                className="tear"
                fill="#acf"
                fillOpacity="1"
                display="inline"
                opacity="1"
                d="M599.057,493.776a16.972,7.037 0 1,0 33.944,0a16.972,7.037 0 1,0 -33.944,0"
            ></path>
            <path
                id="tearLeft"
                className="tear"
                fill="#acf"
                fillOpacity="1"
                display="inline"
                opacity="1"
                d="M283.62800000000004,502.9a16.972,7.037 0 1,0 33.944,0a16.972,7.037 0 1,0 -33.944,0"
            ></path>
            <g id="face-CumGroup" fill="#fff" display="inline" opacity="0.782">
                <path
                    id="faceCum6"
                    strokeWidth="0.617"
                    d="M562.677 539.838c8.867-10.694 24.848-11.493 28.968 10.548 2.854 15.27 3.09 24.97.868 35.61-1.493 7.15-1.594 9.62-.787 19.286.82 9.815.555 12.959-1.204 14.295-2.353 1.789-7.79-22.658-2.672 5.27-.07 1.619.021 3.096.577 9.276 1.31 14.587 6.484 44.546 3.307 44.972-4.254.572-11.518-48.915-13.702-36.329-.524 6.276-1.729 7.627-3.284 3.683-1.465-3.714-6.534-39.236-7.104-55.227-.49-13.742-.761-15.768-3.04-22.745-2.794-8.553-3.637-13.882-3.816-24.134"
                ></path>
                <path
                    id="faceCum5"
                    transformOrigin="top left"
                    strokeWidth="0.972"
                    d="M471.757 470.106c.186 6.07 2.159 15.658 6.944 33.755 4.64 17.548 5.218 20.579 5.347 28.028.12 6.862 1.072 11.574 4.636 22.936 4.992 15.909 8.758 24.327 14.542 32.504 5.388 7.617 7.172 11.456 12.177 26.219 7.73 22.794 9.787 28.264 16.552 43.997 8.474 19.712 11.402 21.47 7.229 4.345-2.9-11.9-2.684-13.898 1.151-10.579 5.931 5.13 4.153-6.877-3.821-25.799-7.106-16.86-6.83-21.085.747-11.448 6.6 8.396 8.766 7.735 6.907-2.107-2.278-12.052-8.577-25.196-14.028-29.27-9.333-6.977-14.66-18.413-18.988-40.756-3.568-18.42-4.878-23.842-7.853-32.501-3.507-10.207-6.242-15.113-9.216-16.529-2.147-1.023-2.943-2.263-6.404-9.97-2.988-6.654-4.615-9.37-6.406-10.692-.68-.504-2.585-2.318-4.234-4.033-4.187-4.355-5.46-3.899-5.282 1.9"
                ></path>
                <path
                    id="faceCum4"
                    strokeWidth="0.827"
                    d="M455.483 375.37c3.124-6.047 5.409-8.112 8.047-7.277 7.172-6.895 11.909-6.565 10.465 2.797-2.413 15.645-10.648 18.41-6.62 36.592-1.53 9.811-6.397 18.644-8.212 30.98-1.49 16.52 13.07 52.952 14.949 60.58 13.455 35.4 3.162 30.595-4.985 4.77-15.665-62.486-26.884-19.699-33.411 3.164-5.686 19.915-12.006 27.688-14.613 30.546-3.192 3.497-.653-9.699 5.653-29.386 10.795-33.704 12.762-44.504 7.012-38.491-4.74 4.957-4.642 22.822-11.33 22-.213-4.073 6.762-30.906 10.656-42.559 2.811-8.413 3.37-10.56 4.491-17.26.968-5.784 2.006-9.962 4.087-16.448.789-2.461 2.773-8.9 4.41-14.309 4.153-13.734 6.417-19.923 9.4-25.699"
                ></path>
                <path
                    id="faceCum3"
                    transformOrigin="top right"
                    strokeWidth="0.973"
                    d="M424.54 517.637c2.259.941 3.648 10.765 3.84 14.314.625 17.862-3.758 26.364-7.993 35.304-6.847 20.3-11.037 29.637-17.626 43.902-4.006 9.406-3.243 21.144-9.252 34.512-3.506 27.094-12.114 29.412-11.64 6.73 8.319-28.181-1.587-25.722-11.13 13.242-8.337 34.035-10.792 38.581-13.652 37.393-4.358-1.81 2.773-45.431 19.75-81.496 1.58-3.357 5.657-11.958 9.056-19.112 7.731-16.27 8.148-17.277 5.71-13.778-11.727 16.823-8.126-3.357 6.158-34.518 8.834-19.27 13.505-27.156 16.455-30.648 2.86-4.795 7.088-7.189 10.323-5.845"
                ></path>
                <path
                    id="faceCum2"
                    strokeWidth="0.723"
                    d="M478.426 430.184c-.17-33.777 8.139-142.119 19.017-53.691.403 3.28 1.059 7.676 1.456 9.768 2.71 14.258 2.689 34.788-.05 50.201-1.529 8.61-1.67 11.154-1.239 22.217.335 8.565.324 11.154-.09 22.677-.554 15.426-.455 19.4.829 33.317 1.24 13.445 1.365 25.73.315 31.119-.738 3.788-1.599.846-3.032-10.366-1.528-11.95-1.919-10.797-2.08 6.14-.155 16.25-.554 18.09-3.638 16.78-1.779-.758-2.928-15.06-2.898-36.06.02-14.654-.107-17.933-1.062-27.4-1.243-12.302-1.35-17.215-.784-35.892.808-26.667-.06-32.58-2.927-19.936-2.32 10.233-3.738 6.936-3.817-8.874"
                ></path>
                <path
                    id="faceCum1"
                    strokeWidth="0.566"
                    d="M308.722 503.95c-8.47 0-13.365 7.934-13.366 22.287 1.153 6.223 3.77 16.543 5.675 25.31 1.358 6.25.961 23.902 1.62 32.339.668 8.567 1.384 11.24 3.253 12.157 2.502 1.226 4.067-20.565 3.32 4.184.306 1.385.436 2.67.82 8.07.904 12.744.402 39.249 3.486 39.192 4.13-.076 3.74-43.688 7.674-33.135 1.424 5.338 2.768 6.342 3.666 2.735.845-3.396.425-34.682-1.391-48.538-1.561-11.907-5.075-18.567-4.197-24.917.864-6.25 1.74-9.78 2.383-16.376-.002-10.4-6.395-23.43-12.943-23.308"
                ></path>
            </g>
        </g>
        <g id="browsGroup" strokeLinecap="round" display="inline" opacity="1">

            <g id="browLeftGroup">
                <path
                    id="browLeftOpen"
                    fill="#cf8700"
                    fillOpacity="1"
                    stroke="none"
                    strokeWidth="2.566"
                    d={fix("m412.653 386.376 18.894 10.662-2.613 20.77-49.725 18.317-77.918 7.624-39.71 12.51L292.414 422l72.159-12.042z")}
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="browLeftWide"
                    fill="#cf8700"
                    fillOpacity="1"
                    stroke="none"
                    strokeWidth="2.566"
                    d={fix("m412.653 379.352 18.894 10.661-2.613 20.77-55.579 9.536-69.137 22.259-40.881 16.022 32.005-37.771 63.378-26.677Z")}
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="browLeftCrease"
                    fill="none"
                    stroke="#c87137"
                    strokeOpacity="1"
                    strokeWidth="3"
                    d={svgPath(fix("m435.284 375.552 9.5 15.092 1.21 15.77")).translate(-3, 3).toString()}
                    opacity="1"
                ></path>
            </g>

            <g id="browRightGroup">
                <path
                    id="browRightOpen"
                    fill="#cf8700"
                    fillOpacity="1"
                    stroke="none"
                    strokeWidth="2.521"
                    d={fix("m495.862 383.237-16.39 10-2.444 20.672 58.72 16.224 71.515 5.525 50.768 15.239-42.792-39.058-70.313-10.173z")}
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="browRightWide"
                    fill="#cf8700"
                    fillOpacity="1"
                    stroke="none"
                    strokeWidth="2.521"
                    d={fix("m495.862 376.212-16.39 9.999-2.444 20.673 58.72 9.785 69.173 20.16 52.524 14.068-44.547-37.887-67.972-24.808Z")}
                    display="inline"
                    opacity="1"
                ></path>
                <path
                    id="browRightCrease"
                    fill="none"
                    stroke="#c87137"
                    strokeOpacity="1"
                    strokeWidth="3"
                    d={svgPath(fix("m470.394 372.581-10.482 16.92 1.193 14.877")).translate(3, 3).toString()}
                    display="inline"
                    opacity="1"
                ></path>
            </g>
        </g>
    </svg >
);

export default Head;
