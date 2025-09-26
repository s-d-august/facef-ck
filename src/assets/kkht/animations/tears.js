import gsap from "gsap"

export const tearsVisible = (arousalTier, areTears, setAreTears) => {
    if (!areTears) {
        if (arousalTier <= 2) {
            setAreTears(true)
            gsap.set("#tearLeft", {
                morphSVG: "#tearLeft"
            })
            gsap.set("#tearRight", {
                morphSVG: "#tearRight"
            })
            gsap.set(["#tearLeft", "#tearRight"], {
                clearProps: "all"
            })
            gsap.to(["#tearLeft", "#tearRight"], {
                opacity: 0.8,
                scale: 1,
                duration: 0.5
            })
        }
    }
}

export const tearsAnimation = ({ secondary, areTears, setAreTears }) => {

    var tear1, tear2, tearDown1, tearDown2, t1, t2, num

    if (Math.random() > 0.5) {
        t1 = "Right"
        t2 = "Left"
    } else {
        t1 = "Left"
        t2 = "Right"
    }

    num = secondary ? "2" : ""

    tear1 = "#tear" + t1 + num
    tearDown1 = "#tearDown" + t1 + num
    tear2 = "#tear" + t2 + num
    tearDown2 = "#tearDown" + t2 + num

    var interval = 1

    function tearAppear() {
        if (!areTears) {
            return (
                gsap.timeline()
                    .set(tear1, { opacity: 0.8, y: 0, scale: 0, morphSVG: tear1 })
                    .set(tear2, { opacity: 0.8, y: 0, scale: 0, morphSVG: tear2 })
                    .to([tear1, tear2], {
                        scale: 1,
                        duration: 2,
                        ease: "power1.out"
                    })

            )
        }
    }

    function setFalse() {
        console.log("tears set to false")
        setAreTears(false)
    }

    return (
        gsap.timeline()
            .add(tearAppear())
            .to(tear1, {
                duration: 1,
                ease: "power1.in",
                morphSVG: tearDown1
            }, interval)
            .to(tear2, {
                duration: 1,
                ease: "power1.in",
                morphSVG: tearDown2
            }, interval)
            .to(tear1, {
                y: 3000,
                duration: "random(2, 3)",
                ease: "power4.in"
            }, "<0")
            .to(tear2, {
                y: 3000,
                duration: "random(2, 3)",
                ease: "power4.in",
                onComplete: setFalse
            }, "<0.2")
            .set(tear1, { opacity: 0, y: 0, scale: 0, morphSVG: tear1 })
            .set(tear2, { opacity: 0, y: 0, scale: 0, morphSVG: tear2 })

    )

}