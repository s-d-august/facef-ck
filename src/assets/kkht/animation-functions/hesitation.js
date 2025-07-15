import gsap from "gsap"
import { callState } from "../utils/dom";

export const hesitation = async ({ duration, playDuring, playAfter, animationSetter, deepBreath }) => {

    if (duration === 0) {
        console.log("duration is 0")
        if (typeof playAfter === "function") playAfter();
        return
    }

    var eyeLeft = document.getElementById("eyeLeft")
    var eyeRight = document.getElementById("eyeRight")
    var topLineLeft = document.getElementById("topLineLeftGroup")
    var topLineRight = document.getElementById("topLineRightGroup")
    var eyes = [eyeLeft, eyeRight, topLineLeft, topLineRight]

    if (playDuring) {
        if (!Array.isArray(playDuring)) playDuring = [playDuring]

        playDuring.forEach((anim) => {
            anim.name({ ...anim.args, duration: duration })
        })
    }

    if (deepBreath === "true") {
        gsap.timeline()
            .to("#body", {
                transformOrigin: "bottom center",
                scale: 1.05,
                duration: (duration * 0.4),
                ease: "power1.in"
            })
            .to("#body", {
                delay: 0.1,
                transformOrigin: "bottom center",
                scale: 1,
                duration: (duration * 0.6),
                ease: "power1.out"
            })
    }


    if (Array.isArray(animationSetter)) {
        animationSetter.forEach((set) => {
            callState(set, duration)

        })
    } else {
        callState(animationSetter, duration)
    }

    function toggleBlink(el) {
        var prevDisplay = window.getComputedStyle(el).display
        el.style.display = (prevDisplay === "none") ? "block" : "none"
    }

    eyes.forEach(toggleBlink)
    await new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, (duration * 1000));
    });

    eyes.forEach(toggleBlink)

    console.log(typeof playAfter === "function")
    if (typeof playAfter === "function") playAfter();
};