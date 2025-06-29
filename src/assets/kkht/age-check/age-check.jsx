
import React, { useEffect } from "react"
import "./age-check.css"
import Eyecatch from "../eyecatch/eyecatch";
import cover from "../../fonts-etc/cover.svg"

const AgeCheck = ({ ageChecked, setAgeChecked }) => {
    if (localStorage.getItem("ageChecked")) {
        console.log("age previously verified!")
        setAgeChecked(true);
    }

    useEffect(() => {

        const btn = document.getElementById("ageCheckButton");
        if (!btn) return;
        const handler = () => {
            localStorage.setItem("ageChecked", true)
            setAgeChecked(true);
        }
        btn.addEventListener("click", handler);

        return () => {
            btn.removeEventListener("click", handler);
        }
    }, []);

    return (
        <div id="ageCheckDiv">
            <Eyecatch mode={"linear"} />
            <div id="ageCheckImgDiv">
                <img src={cover} />
            </div>
            <div id="ageCheckTextButtonDiv">
                <p id="ageCheckWarningText">This page has sexual content! Are you over 18 and okay with seeing it?</p>
                <button type="button" id="ageCheckButton">Sure am!</button>
            </div>

        </div>
    );
}

export default AgeCheck