import gsap from "gsap"
import { DrawSVGPlugin } from "gsap/all"
gsap.registerPlugin(DrawSVGPlugin)

export const cumAnimation = (args) => {
    const {
        cumID,
        origin
    } = args;

    var transformOrigin

    console.log(cumID.getAttribute("transform-origin"))

    if (cumID.getAttribute("transform-origin")) {
        transformOrigin = (cumID.getAttribute("transform-origin"))
    } else if (origin) {
        transformOrigin = origin
    } else transformOrigin = "center"

    return (
        gsap.timeline().set(("#cumshot"), { opacity: 0.9 })
            .fromTo(
                ("#cumshot"),
                { drawSVG: "0 0" },
                {
                    duration: 0.125,
                    drawSVG: "0 100%"
                }).to(("#cumshot"), { drawSVG: "100% 100%", duration: 0.125 })
            .set(("#cumshot"), { opacity: 0 })
            .set(cumID, { opacity: .8, scale: 0.3, transformOrigin: transformOrigin })
            .to(cumID, {
                scale: 1, duration: 1, ease: "power1.out"
            })
    )
}