import gsap from "gsap"
import { DrawSVGPlugin } from "gsap/all"
gsap.registerPlugin(DrawSVGPlugin)

export const cumAnimation = (args) => {
    const {
        cumID,
        origin,
        shotDuration,
        moveDuration
    } = args;

    var transformOrigin
    var shot
    var move

    if (cumID.getAttribute("transform-origin")) {
        transformOrigin = (cumID.getAttribute("transform-origin"))
    } else if (origin) {
        transformOrigin = origin
    } else transformOrigin = "center"

    if (shotDuration) {
        shot = shotDuration / 2
    } else shot = 0.125

    if (moveDuration) {
        move = moveDuration
    } else move = 1

    return (
        gsap.timeline().set(("#cumshot"), { opacity: 0.9 })
            .fromTo(
                ("#cumshot"),
                { drawSVG: "0 0" },
                {
                    duration: shot,
                    drawSVG: "0 100%"
                }).to(("#cumshot"), { drawSVG: "100% 100%", duration: shot })
            .set(("#cumshot"), { opacity: 0 })
            .set(cumID, { opacity: .8, scale: 0.2, transformOrigin: transformOrigin })
            .to(cumID, {
                scale: 1, duration: move, ease: "power1.out"
            })
    )
}