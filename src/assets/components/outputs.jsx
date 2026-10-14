import { useState, useEffect, useRef } from "react";
import React from "react";
import "./outputs.css";

const Outputs = ({ man, boy, maxman, maxboy }) => {
    const manBarRef = useRef(null);
    const boyBarRef = useRef(null);

    function renderProgress(element, stat, attr, max) {
        const newVal = function (stat) {
            if (stat >= max) { return 100 }
            else return stat / max * 100
        }
        element.style[attr] = (newVal(stat) || 0) + '%'
    }

    function renderProgressBars(element, stat, max) {
        const newVal = stat >= max ? 1 : stat / max;
        element.style.transform = `scaleY(${newVal || 0})`;
    }

    function renderBars() {
        renderProgressBars(boyBarRef.current, boy, maxboy);
        renderProgressBars(manBarRef.current, man, maxman);
    }

    useEffect(() => {
        // Render progress bars when man or boy changes
        renderBars();
    }, [man, boy]);

    return (
        <div id="progressBarsDiv">
            <div id="manBarWrap" className="barWrap gridElement">
                <div id="manBar" ref={manBarRef} className="progressBar"></div>
            </div>
            <div id="boyBarWrap" className="barWrap gridElement">
                <div id="boyBar" ref={boyBarRef} className="progressBar"></div>
            </div>
        </div>
    );
};

export default Outputs;