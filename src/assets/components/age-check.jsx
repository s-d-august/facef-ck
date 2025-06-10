import React, { useEffect } from "react"
import "./age-check.css"

const AgeCheck = ({ ageChecked, setAgeChecked }) => {
    useEffect(() => {
        const btn = document.getElementById("ageCheckButton");
        if (!btn) return;
        const handler = () => setAgeChecked(true);
        btn.addEventListener("click", handler);
        return () => btn.removeEventListener("click", handler);
    }, [setAgeChecked]);

    return (
        <div id="ageCheckDiv">
            <h3>This page has sexual content! Are you over 18 and okay with seeing it?</h3>
            <button type="button" id="ageCheckButton">Sure am!</button>
        </div>
    );
}

export default AgeCheck