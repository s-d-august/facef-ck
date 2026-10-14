
import React, { useEffect } from "react"
import "./age-check.css"
import Eyecatch from "../eyecatch/eyecatch";
import cover from "../../fonts-etc/cover.png"
import coverAlt from "../../fonts-etc/coverAlt.png"
import gsap from "gsap";

var ravenousModeOn

const AgeCheck = ({ setAgeChecked, JP, setJP }) => {

    useEffect(() => {
        const div = document.getElementById("ageCheckDiv");
        if (div) div.classList.add("ready");

        ravenousModeOn = localStorage.getItem("ravenousModeOn") === "true"

        if (ravenousModeOn) {
            document.getElementById("ageCheckDiv").classList.add("ravenousModeOn")
            document.getElementById("faceTitle").classList.add("ravenousModeOn")
            document.getElementById("fuckTitle").classList.add("ravenousModeOn")
        }

        const btn = document.getElementById("ageCheckButton");
        if (!btn) return;
        const handler = () => {
            setAgeChecked(true);
        }
        btn.addEventListener("click", handler);

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
    }, [setAgeChecked]);

    useEffect(() => {

        const langButton = document.getElementById("langButton")
        langButton.addEventListener("click", changeLang)

        function changeLang() {
            setJP(!JP)
            localStorage.setItem("JP", String(!JP))
        }

        return () => {
            langButton.removeEventListener("click", changeLang)
        }
    }, [JP])

    return (
        <div id="ageCheckDiv">
            <button id="langButton">{JP ? "ENG" : "日本語"}</button>
            <div id="facefuckTitleDiv">
                <Eyecatch mode={"linear"} size={"small"} />
                <div id="titleOnly">
                    <h1 id="faceTitle">FACE</h1>
                    <h1 id="fuckTitle">F*CK</h1>
                </div>

            </div>
            <div id="ageCheckImgDiv">
                <img src={ravenousModeOn ? coverAlt : cover} />
            </div>
            <div id="ageCheckTextButtonDiv">
                <p className="ageCheckText">{JP ? "このゲームを始めたら、すぐ成人向けのコンテンツが現れます。"
                    : "Past this point, things get very sexually explicit, very quickly."}</p>
                <p className="ageCheckText">{JP ? "お客様の地域において成人向けコンテンツを閲覧できる法定年齢に達していますか？"
                    : "Are you a legal adult with interests of that kind?"}</p>
                <button type="button" id="ageCheckButton">{JP ? "はい" : "Oh yes."}</button>
            </div>
        </div>
    );
}

export default AgeCheck