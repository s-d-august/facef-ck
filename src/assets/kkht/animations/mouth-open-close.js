export const mouthOpenFunction = (moveBy, mouthGroup, tongueGroup, tongueDrool, mouthOpenRef) => {
    gsap.to(mouthGroup, { y: moveBy, duration: 1, ease: "power1.out" })
    gsap.to(tongueGroup, { y: 0, scaleY: 1, duration: 1, ease: "power1.out" })
    gsap.to(tongueDrool, { scaleY: 1, duration: 2, transformOrigin: "top center" })
    mouthOpenRef = true
}

export const mouthCloseFunction = (tongueCum, mouthGroup, tongueGroup, tongueDrool, mouthOpenRef) => {
    const all = document.querySelectorAll('[id*="tongueCum"]');
    const visible = (Array.from(all)).filter(el => getComputedStyle(el).opacity !== "0");

    gsap.to(mouthGroup, { y: 0, duration: 2, ease: "power1.out" })
    gsap.to(tongueGroup, { y: 0, scaleY: 0, duration: 2, ease: "power1.out" })
    gsap.timeline()
        .to(tongueDrool, { scaleX: 0, duration: 1, ease: "power1.in", transformOrigin: "top center" })
        .set(tongueDrool, { scaleX: 1, scaleY: 0 })
        .set(visible, { opacity: 0 })
    mouthOpenRef = false
}

export const mouthOpenClose = (mouthOpenRef, holdMouthOpenRef) => {
    if (mouthOpenRef !== true) { // if mouth is closed
        mouthOpenFunction();
        holdMouthOpenRef = true
    } else {
        mouthCloseFunction();
        holdMouthOpenRef = false
    }
}