import gsap from "gsap"
import { isFaceClean } from "../animation-functions/call-cumshot"
import { callState } from "../utils/dom"

export const lowerArms = (args) => {
    const testMode = localStorage.getItem("testMode")
    const { elements, setter, container, animationSetter } = args
    animationSetter(true)
    const targets = [...elements]
    gsap.timeline().to(targets, {
        y: 900,
        duration: testMode ? 0.3 : 3,
        ease: "power1.in",
        onComplete: () => {
            animationSetter(false)
            setter(false)
        }
    })

}

export const faceWipe = ({ elements, cloth, setter, hide, animationSetter }) => {

    if (cloth.style.opacity !== "1") cloth.style.opacity = 1;

    const targets = [...elements, cloth];
    gsap.set(targets, { y: 900, scaleY: 1 }); // Start at y: 1000

    var loopDuration = 0.75
    var wipeDistance = 200

    if (hide) {
        hide.forEach((el) => {
            el.classList.remove("interact")
        })
    }

    animationSetter(true)

    return gsap.timeline()
        .to(targets, { y: -50, duration: (0.5 + loopDuration), ease: "power2.inOut" })
        //   .to(targets, { y: -50, duration: loopDuration, ease: "power2.inOut" })
        .to(targets, {
            y: wipeDistance, duration: loopDuration, ease: "power1.inOut"
        })
        .to(targets, {
            y: -100, duration: loopDuration, ease: "power1.out",
            onComplete: () => {
                isFaceClean("yes")
            }
        })
        .to(targets, {
            y: wipeDistance, duration: 1, ease: "power1.in"
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