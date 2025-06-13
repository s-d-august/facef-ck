
import React, { useEffect } from "react"
import "./age-check.css"
import gsap from "gsap";
import { ScrambleTextPlugin, SplitText, CustomEase, CustomBounce } from "gsap/all";


gsap.registerPlugin(ScrambleTextPlugin, SplitText, CustomBounce, CustomEase)

const AgeCheck = ({ ageChecked, setAgeChecked }) => {
    useEffect(() => {
        const btn = document.getElementById("ageCheckButton");
        if (!btn) return;
        const handler = () => setAgeChecked(true);
        btn.addEventListener("click", handler);

        gsap.to("#kikai", {
            duration: 3.5,
            scrambleText: "KIKAI"
        });

        SplitText.create("#hentai", {
            type: "chars",
            onSplit(self) {
                gsap.timeline().fromTo(self.chars, { scale: 0, rotation: "random([-30, 30])" }, {
                    duration: 3,
                    scale: 1,
                    stagger: 0.05,
                    rotation: 0,
                    ease: "hentaiBounce"
                });
            }
        });

        CustomBounce.create("hentaiBounce", {
            strength: 0.7,
            squash: 0,
            squashID: "myBounce-squash",
        });

        gsap.registerPlugin(CustomEase, CustomBounce)

        return () => btn.removeEventListener("click", handler);
    }, [setAgeChecked]);

    return (
        <div id="ageCheckDiv">
            <h3>This page has sexual content! Are you over 18 and okay with seeing it?</h3>

            <div id="kkhtLogoDiv">
                <span id="kikai"></span>
                <span id="hentai">HENTAI</span>
            </div>
            <button type="button" id="ageCheckButton">Sure am!</button>

        </div>
    );
}

export default AgeCheck