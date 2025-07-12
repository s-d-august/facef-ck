import gsap from "gsap";

/* Makes an element move slowly down the page until it hits the bounds */
export const drip = (element, areaHeight) => {

    gsap.killTweensOf(element);

    let scaleXInit = 0.8
    let scaleXFinal = 1

    if (Math.random() < 0.5) {
        scaleXInit = -0.8
        scaleXFinal = -1
    }

    return new Promise((resolve) => {
        gsap.set(element, { opacity: 1, scaleX: scaleXInit, transformOrigin: "center top" });
        var initials = {
            transformOrigin: "center top",
            y: areaHeight,
            scaleY: (Math.random() + 1),
            ease: "none",
            duration: areaHeight / (4 + (2 * Math.random())) // Divided by a random number between 4 and 6
        };

        let tl = gsap.timeline({
            ease: "none",
            onComplete:
                resolve
        });
        tl.to(element, initials)
            .to(element, {
                scaleX: scaleXFinal,
                transformOrigin: "center top",
                duration: areaHeight / 10
            }, 0)
            .to(element, { opacity: 0, duration: 0.3 })
            .set(element, { y: 0 });
    });
};