import gsap from "gsap"

export const browRaise = ({ browLeft, browRight, duration }) => {

    console.log("browRaise args", { browLeft, browRight, duration })

    gsap.timeline()
        .to(browLeft, {
            x: 10,
            rotation: -5,
            duration: (duration / 700),
            transformOrigin: "bottom left"
        })
        .to(browLeft, {
            x: 0,
            rotation: 0,
            duration: (duration / 250),
            transformOrigin: "bottom left"
        })

    gsap.timeline()
        .to(browRight, {
            x: -10,
            rotation: 5,
            duration: (duration / 700),
            transformOrigin: "bottom right"
        })
        .to(browRight, {
            x: 0,
            rotation: 0,
            duration: (duration / 250),
            transformOrigin: "bottom right"
        })

}

