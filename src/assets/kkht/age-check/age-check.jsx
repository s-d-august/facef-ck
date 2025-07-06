
import React, { useEffect } from "react"
import "./age-check.css"
import Eyecatch from "../eyecatch/eyecatch";
import cover from "../../fonts-etc/cover.svg"
import gsap from "gsap";

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

        var faceWidth = document.getElementById("faceTitle").getBoundingClientRect().width
        var faceWidth = document.getElementById("fuckTitle").getBoundingClientRect().width

        gsap.timeline().fromTo("#faceTitle",
            { x: -1000 },
            { x: 0, duration: 1, ease: "power4.in" }, "-=0.3"
        ).fromTo("#fuckTitle",
            { x: 1000 },
            { x: 0, duration: 1, ease: "power4.in" }, "-=0.5"
        );


        return () => {
            btn.removeEventListener("click", handler);
        }
    }, []);



    return (
        <div id="ageCheckDiv">
            <div id="facefuckTitleDiv">
                <Eyecatch mode={"linear"} size={"small"}/>
                <h1 id="faceTitle">FACE</h1>
                <h1 id="fuckTitle">F*CK</h1>
            </div>
            <div id="ageCheckNoHeader">
                <div id="ageCheckImgDiv">
                    <img src={cover} />
                </div>
                <div id="ageCheckTextButtonDiv">
                    <p id="ageCheckWarningText">This page has sexual content! Are you over 18 and okay with seeing it?</p>
                    <button type="button" id="ageCheckButton">Sure am!</button>
                </div>
            </div>


        </div>
    );
}

export default AgeCheck