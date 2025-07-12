import gsap from "gsap"
import { matchID } from "../utils/dom";
import { MorphSVGPlugin } from "gsap/all";
gsap.registerPlugin(MorphSVGPlugin)

export const callEyeFlutter = ({ fromState, toState }) => {

    const fromArray = Array.from(
        document.querySelectorAll(`[id*="${fromState}"]`)
    );
    fromArray.forEach(el => {
        eyeFlutterAnimation(el, fromState, toState)
    })
}

export const eyeFlutterAnimation = (el, startString, endString) => {

    const fullTransition = gsap.to(el, {
        duration: 0.2,
        morphSVG: matchID(el, startString, endString),
        y: 0,
        x: 0,
        paused: true
    })

    let obj = { p: 0 }
    return (
        gsap.timeline()
            .set(".eyeCenter", {
                x: 0,
                y: 0
            })
            .to(obj, {
                p: 0.75,
                duration: 0.2,
                onUpdate: () => fullTransition.progress(obj.p)
            })
            .to(obj, {
                p: 0,
                duration: 0.1,
                repeat: 2,
                yoyo: true,
                onUpdate: () => fullTransition.progress(obj.p)
            })
            .to(obj, {
                p: 1,
                duration: 0.2,
                onUpdate: () => fullTransition.progress(obj.p)
            })
            .to(el, {
                delay: 1,
                duration: 0.5,
                morphSVG: el,
                y: 0,
                x: 0,
            })
    )

}