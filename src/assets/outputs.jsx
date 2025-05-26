import { useState, useEffect, useRef } from "react";
import React from "react";
import "./outputs.css";

const Outputs = ({ ives, boyd, maxIves, maxBoyd }) => {
    const ivesBarRef = useRef(null);
    const boydBarRef = useRef(null);

    function renderProgress(element, stat, attr, max) {
        const newVal = function (stat) {
            if (stat >= max) { return 100 }
            else return stat / max * 100
        }
        element.style[attr] = (newVal(stat) || 0) + '%'
    }

    function renderBars() {
        renderProgress(boydBarRef.current, boyd, "height", maxBoyd);
        renderProgress(ivesBarRef.current, ives, "height", maxIves);
    }

    useEffect(() => {
        // Render progress bars when ives or boyd changes
        renderBars();
    }, [ives, boyd]);

    return (
        <div id="progressBarsDiv">
            <div id="ivesBarWrap" className="barWrap gridElement">
                <div id="ivesBar" ref={ivesBarRef} className="progressBar"></div>
            </div>
            <div id="boydBarWrap" className="barWrap gridElement">
                <div id="boydBar" ref={boydBarRef} className="progressBar"></div>
            </div>
        </div>
    );
};

export default Outputs;