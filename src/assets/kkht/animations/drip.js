import gsap from "gsap";

/* Makes an element move slowly down the page until it hits the bounds */
export const drip = (element, animArgs) => {



    console.log("drip called")

    return new Promise((resolve) => {
        gsap.set(element, { opacity: 1 });
        var initials = {
            transformOrigin: "top center",
            y: animArgs,
            scaleY: (Math.random() + 1),
            duration: animArgs / (4 + (2 * Math.random())) // Divided by a random number between 4 and 6
        };
        if (Math.random() < 0.5) {
            gsap.set(element, { transformOrigin: "center", scaleX: -1 });
        }
        let tl = gsap.timeline({
            onComplete: resolve // resolve the promise when timeline is done
        });
        tl.to(element, initials)
            .to(element, { opacity: 0, duration: 0.3 })
            .set(element, { y: 0, opacity: 0 });
    });
};