import gsap from "gsap"
import { isFaceClean } from "../animation-functions/call-cumshot"

export const lowerArms = (args) => {
    const { elements, setter, container } = args
    container.classList.add("customCursor")
    const targets = [...elements]
    gsap.timeline().to(targets, {
        y: 1000,
        duration: 0.5,
        ease: "power1.in",
        onComplete: () => {
            container.classList.remove("customCursor")
            setter(false)
        }
    })

}

export const faceWipe = ({ elements, cloth, setter, hide, animationSetter }) => {

    console.log("faceWipe called internal")
    if (cloth.style.opacity !== "1") cloth.style.opacity = 1;

    const targets = [...elements, cloth];
    gsap.set(targets, { y: 1000, scaleY: 1 }); // Start at y: 1000

    var loopDuration = 0.75
    var wipeDistance = 200

    if (hide) {
        hide.forEach((el) => {
            el.classList.remove("interact")
        })
    }

    animationSetter(true)

    return gsap.timeline()
        .to(targets, { y: wipeDistance, duration: 0.5, ease: "power1.inOut" })
        .to(targets, { y: -50, duration: loopDuration, ease: "power1.inOut" })
        .to(targets, {
            y: wipeDistance, duration: loopDuration, ease: "power1.inOut"
        })
        .to(targets, {
            y: -100, duration: loopDuration, ease: "power1.inOut",
            onComplete: () => {
                isFaceClean("yes")
            }
        })
        .to(targets, {
            y: wipeDistance, duration: 1, ease: "power1.inOut"
        })
        .to(targets, {
            y: 1000,
            duration: 1,
            ease: "power1.out",
            onComplete: () => {
                setter(false)
                animationSetter(false)
                if (hide) {
                    hide.forEach((el) => {
                        el.classList.add("interact")
                    })
                }
            }
        })

}