
import React, { useEffect } from "react"
import "./age-check.css"
import Eyecatch from "../eyecatch/eyecatch";
import cover from "../../fonts-etc/cover.svg"
import gsap from "gsap";

const AgeCheck = ({ setAgeChecked }) => {
    useEffect(() => {
        const div = document.getElementById("ageCheckDiv");
        if (div) div.classList.add("ready");

        const btn = document.getElementById("ageCheckButton");
        if (!btn) return;
        const handler = () => {
            localStorage.setItem("ageChecked", true)
            setAgeChecked(true);
        }
        btn.addEventListener("click", handler);

        gsap.timeline().fromTo("#faceTitle",
            { x: -1000 },
            { x: 0, duration: 1, ease: "power4.in" }, "-=0.3"
        ).fromTo("#fuckTitle",
            { x: 1000 },
            { x: 0, duration: 1, ease: "power4.in" }, "-=0.5"
        ).fromTo("#titleSubheader",
            { opacity: 0 },
            { opacity: 1, duration: 1 }
        )

        return () => {
            btn.removeEventListener("click", handler);
        }
    }, [setAgeChecked]);

    return (
        <div id="ageCheckDiv">
            <div id="facefuckTitleDiv">
                <Eyecatch mode={"linear"} size={"small"} />
                <h1 id="faceTitle">FACE</h1>
                <h1 id="fuckTitle">F*CK</h1>
            </div>
            <h2 id="titleSubheader">*Until He Likes It*</h2>
            <div id="ageCheckImgDiv">
                <img src={cover} />
            </div>
            <div id="ageCheckTextButtonDiv">
                <p id="ageCheckWarningText">This page has sexual content!</p>
                <p>Are you over 18 and okay with seeing it?</p>
                <button type="button" id="ageCheckButton">Sure am!</button>
            </div>
        </div>
    );
}

export default AgeCheck