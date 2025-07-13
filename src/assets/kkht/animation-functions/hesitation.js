import gsap from "gsap"
import { callState } from "../utils/dom";

export const hesitation = async ({ duration, callback, setter }) => {

    if (duration === 0) {
        console.log("duration is 0")
        return
    }

    console.log("hesitation called")

    var eyeLeft = document.getElementById("eyeLeft")
    var eyeRight = document.getElementById("eyeRight")
    var topLineLeft = document.getElementById("topLineLeftGroup")
    var topLineRight = document.getElementById("topLineRightGroup")
    var eyes = [eyeLeft, eyeRight, topLineLeft, topLineRight]

    var browLeft = document.getElementById("browLeftGroup")
    var browRight = document.getElementById("browRightGroup")

    gsap.timeline()
        .to(browLeft, {
            x: 10,
            rotation: -5,
            duration: (duration / 700),
            transformOrigin: "bottom left"
        })
        .to(browLeft, {
            x: 0,
            rotation: 0,
            duration: (duration / 500),
            transformOrigin: "bottom left"
        })

    gsap.timeline()
        .to(browRight, {
            x: -10,
            rotation: 5,
            duration: (duration / 700),
            transformOrigin: "bottom right"
        })
        .to(browRight, {
            x: 0,
            rotation: 0,
            duration: (duration / 500),
            transformOrigin: "bottom right"
        })

    gsap.timeline()
        .to("#body", {
            transformOrigin: "bottom center",
            scale: 1.04,
            yoyoEase: true,
            repeat: 1,
            duration: duration / 3000
        })

    function toggleBlink(el) {
        var prevDisplay = window.getComputedStyle(el).display
        el.style.display = (prevDisplay === "none") ? "block" : "none"
    }

    callState(setter, duration / 1000)

    eyes.forEach(toggleBlink)
    await new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, duration);
    });

    eyes.forEach(toggleBlink)
    if (typeof callback === "function") callback();
};