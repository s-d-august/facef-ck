import gsap from "gsap"
import { isFaceClean } from "../animation-functions/call-cumshot"

export const lowerArms = (args) => {
    const { elements, setter } = args
    const targets = [...elements]
    gsap.timeline().to(targets, {
        y: 1000,
        duration: 3,
        ease: "power1.in",
        onComplete: () => setter(false)
    })

}

export const faceWipe = ({ elements, cloth, setter }) => {
    console.log("faceWipe called", { elements, cloth, setter })
    if (cloth.style.opacity !== "1") cloth.style.opacity = 1;

    const targets = [...elements, cloth];
    gsap.set(targets, { y: 1000, scaleY: 1 }); // Start at y: 1000

    var loopDuration = 1
    var wipeDistance = 200

    return gsap.timeline()
        .to(targets, { y: wipeDistance, duration: 0.5, ease: "power1.inOut" })
        .to(targets, { y: 0, duration: loopDuration, ease: "power1.inOut" })
        .to(targets, {
            y: wipeDistance, duration: loopDuration, ease: "power1.inOut"
        })
        .to(targets, {
            y: 0, duration: loopDuration, ease: "power1.inOut",
            onComplete: () => {
                isFaceClean("yes")
            }
        })
        .to(targets, {
            y: wipeDistance, duration: 1.5, ease: "power1.inOut"
        })
        .to(targets, {
            y: 1000,
            duration: 1,
            ease: "power1.out",
            onComplete: () => {
                setter(false)
            }
        })

}