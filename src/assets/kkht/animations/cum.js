import gsap from "gsap"
import { DrawSVGPlugin } from "gsap/all"
gsap.registerPlugin(DrawSVGPlugin)

export const cumAnimation = (cumID, cumshotID, shotDuration, moveDuration, axis, origin) => {

    if (!axis) scaleAxis = "scale"

    return (
        gsap.timeline().set(cumshotID, { opacity: 0.9 })
            .fromTo(
                cumshotID,
                { drawSVG: "0 0" },
                {
                    duration: (shotDuration / 2 || 0.125),
                    drawSVG: "0 100%"
                }).to(cumshotID, { drawSVG: "100% 100%", duration: (shotDuration / 2 || 0.125) })
            .set(cumshotID, { opacity: 0 })
            .set(cumID, { opacity: .8, [scaleAxis]: 0.3, transformOrigin: (cumID.transformOrigin || origin || "center") })
            .to(cumID, {
                [scaleAxis]: 1, duration: (moveDuration || 1), ease: "power1.out"
            })
    )
}