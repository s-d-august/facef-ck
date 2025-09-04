import gsap from "gsap"

export const browRaise = ({ browLeft, browRight, duration }) => {

    console.log("browRaise duration", duration)

    var xBy, rotate

    if (duration > 1) {
        xBy = duration * 4
        rotate = 2.5 + duration
    } else {
        xBy = 5
        rotate = 2.5
    }

    console.log("browRaise duration", duration, "xBy: ", xBy, "rotate: ", rotate)

    gsap.timeline()
        .to(browLeft, {
            x: xBy,
            rotation: (rotate * -1),
            duration: (duration / 0.7),
            transformOrigin: "bottom left"
        })
        .to(browLeft, {
            x: 0,
            rotation: 0,
            duration: (duration / 0.25),
            transformOrigin: "bottom left"
        })

    gsap.timeline()
        .to(browRight, {
            x: (xBy * -1),
            rotation: rotate,
            duration: (duration / 0.7),
            transformOrigin: "bottom right"
        })
        .to(browRight, {
            x: 0,
            rotation: 0,
            duration: (duration / 0.25),
            transformOrigin: "bottom right"
        })

}

