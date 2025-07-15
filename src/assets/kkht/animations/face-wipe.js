import gsap from "gsap"
import { isFaceClean } from "../animation-functions/call-cumshot"

export const lowerArms = (args) => {
    const { elements, setter } = args
    gsap.timeline().to(elements, {
        y: 1000,
        duration: 0.5,
        ease: "power1.in",
        onComplete: () => {
            // sets armsUp to false
            setter(false)
        }
    })

}

export const faceWipe = ({ elements, cloth, animationSetter }) => {
    if (cloth.style.opacity !== "1") cloth.style.opacity = 1;

    const targets = [...elements, cloth];
    gsap.set(targets, { y: 1000, scaleY: 1 }); // Start at y: 1000

    var loopDuration = 0.75
    var wipeDistance = 200

    animationSetter(true)

    return gsap.timeline()
        .to(targets, { y: wipeDistance, duration: 0.75, ease: "power2.in" })
        .to(targets, { y: -50, duration: 0.5, ease: "power2.out" })
        .to(targets, {
            y: (wipeDistance), duration: 0.5, ease: "power2.inOut"
        })
        .to(targets, {
            y: 0, duration: 0.5, ease: "power1.inOut",
            onComplete: () => {
                isFaceClean("yes")
            }
        })
        .to(targets, {
            y: wipeDistance, duration: 0.75, ease: "power1.in"
        })
        .to(targets, {
            y: 1000,
            duration: 0.75,
            ease: "power1.out",
            onComplete: () => {
                animationSetter(false)
            }
        })

}