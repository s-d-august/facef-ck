import gsap from "gsap"
import { callState } from "../utils/dom"

export const lowerArms = (args) => {

    const { elements, setter, container, animationSetter, devMode } = args

    animationSetter(true)
    const targets = [...elements]
    gsap.timeline().to(targets, {
        y: 900,
        duration: devMode ? 0.3 : 3,
        ease: "power1.in",
        onComplete: () => {
            animationSetter(false)
            setter(false)
        }
    })

}

export const cleanFace = () => {
    var cumArray = Array.from(document.querySelectorAll(`[id*="faceCum"]`));
    cumArray.forEach(el => {
        if (typeof el === "string") el = document.getElementById(el);
        if (el) gsap.set(el, { opacity: 0 })
    })

}

export const faceWipe = ({ elements, cloth, setter, hide, animationSetter, setIsFaceCum }) => {

    if (cloth.style.opacity !== "1") cloth.style.opacity = 1;

    const targets = [...elements, cloth];
    gsap.set(targets, { y: 900, scaleY: 0.75 }); // Start at y: 1000

    var loopDuration = 0.75
    var wipeDistance = 200

    if (hide) {
        hide.forEach((el) => {
            el.classList.remove("interact")
        })
    }

    animationSetter(true)

    return gsap.timeline()
        .to(targets, { y: -50, scaleY: 1, duration: (0.5 + loopDuration), ease: "power2.inOut" })
        //   .to(targets, { y: -50, duration: loopDuration, ease: "power2.inOut" })
        .to(targets, {
            y: wipeDistance, duration: loopDuration, ease: "power1.inOut"
        })
        .to(targets, {
            y: -100, duration: loopDuration, ease: "power1.out",
            onComplete: () => {
                gsap.set(["#tearLeft", "#tearRight"], {
                    opacity: 0,
                    scale: 0
                })
                cleanFace()
                setIsFaceCum(false)
            }
        })
        .to(targets, {
            y: wipeDistance, duration: 1, ease: "power1.in"
        })
        .to(targets, {
            y: 900,
            duration: 1,
            ease: "power1.out",
            scaleY: 0.75,
            onComplete: () => {
                cloth.style.opacity = 0
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