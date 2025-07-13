import gsap from "gsap"

export const mouthOpenFunction = ({ moveBy, mouthGroup, tongueGroup, tongueDrool, mouthOpenSetter, arousalTier }) => {

    var duration = (9 - arousalTier) / 4
    console.log("mouthOpen duration: ", duration, "arousalTier: ", arousalTier)

    gsap.to(mouthGroup, { y: moveBy, duration: duration, ease: "power1.out" })
    gsap.to(tongueGroup, { y: 0, scaleY: 1, duration: duration, ease: "power1.out" })
    gsap.to(tongueDrool, { scaleY: 1, duration: duration, transformOrigin: "top center" })
    mouthOpenSetter(true)
}

export const clearVisible = (array) => {
    const visible = (Array.from(array)).filter(el => getComputedStyle(el).opacity !== "0");
    gsap.set(visible, { opacity: 0 })
}

export const mouthCloseFunction = ({ tongueCum, mouthGroup, tongueGroup, tongueDrool, mouthOpenSetter, duration }) => {

    console.log("mouthClose duration: ", duration)
    const visible = (tongueCum).filter(el => getComputedStyle(el).opacity !== "0");

    gsap.to(mouthGroup, { y: 0, duration: (duration || 1), ease: "power1.out" })
    gsap.to(tongueGroup, { y: 0, scaleY: 0, duration: (duration || 1), ease: "power1.out" })
    gsap.timeline()
        .to(tongueDrool, { scaleX: 0, duration: (duration || 1), ease: "power1.in", transformOrigin: "top center" })
        .set(tongueDrool, { scaleX: 1, scaleY: 0 })
        .set(visible, { opacity: 0 })
    mouthOpenSetter(false)
}