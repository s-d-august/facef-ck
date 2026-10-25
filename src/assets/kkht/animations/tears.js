import gsap from "gsap"

export const tearsAnimation = ({ index, setAreTears, type, arousalTier, isCrying }) => {

    var tear1, tear2, tearDown1, tearDown2, t1, t2, num

    if (Math.random() > 0.5) {
        t1 = "Right"
        t2 = "Left"
    } else {
        t1 = "Left"
        t2 = "Right"
    }

    num = index

    tear1 = "#tear" + t1 + num
    tearDown1 = "#tearDown" + t1 + num
    tear2 = "#tear" + t2 + num
    tearDown2 = "#tearDown" + t2 + num

    function tearFadeIn() {
        setTrue()
        gsap.timeline()
            .to([tear1, tear2], {
                scale: 1,
                opacity: 0.8,
                duration: 1,
                ease: "power1.out"
            })
    }

    function tearEndHandler() {
        if (type === "constant" && arousalTier.current === 1 && isCrying.current === true) {
            tearsTweens()
        }
        if (type === "once") setFalse()
    }

    function isRenew() {
        if (type === "renew") {
            gsap.timeline({
                onComplete: setTrue,
            })
                .to([tear1, tear2], {
                    scale: 1,
                    opacity: 0.8,
                    duration: 1,
                    ease: "power1.out"
                })
                .to(tear1, {
                    duration: 1,
                    ease: "power1.in",
                    morphSVG: tearDown1
                }, 1)
                .to(tear2, {
                    duration: 1,
                    ease: "power1.in",
                    morphSVG: tearDown2
                }, 1)
                .to(tear1, {
                    y: 1000,
                    duration: "random(1, 2)",
                    ease: "power4.in"
                }, "<0")
                .to(tear2, {
                    y: 1000,
                    duration: "random(1, 2)",
                    ease: "power4.in"
                }, "<0.2")
                .set(tear1, { opacity: 0.8, y: 0, scale: 0, morphSVG: tear1 })
                .set(tear2, {
                    opacity: 0.8, y: 0, scale: 0, morphSVG: tear2,
                })
                .to([tear1, tear2], {
                    scale: 1,
                    opacity: 0.8,
                    duration: 1,
                    ease: "power1.out"
                })
        }
    }

    function setFalse() {
        if (index === "") setAreTears(false)
    }

    function setTrue() {
        if (index === "") setAreTears(true)
    }

    function tearsTweens() {
        gsap.timeline({
            onStart: setTrue,
            onComplete: tearEndHandler
        })
            .to([tear1, tear2], {
                scale: 1,
                opacity: 0.8,
                duration: 1,
                ease: "power1.out"
            })
            .to(tear1, {
                duration: 1,
                ease: "power1.in",
                morphSVG: tearDown1
            }, 1)
            .to(tear2, {
                duration: 1,
                ease: "power1.in",
                morphSVG: tearDown2
            }, 1)
            .to(tear1, {
                y: 1000,
                duration: "random(1, 2)",
                ease: "power4.in"
            }, "<0")
            .to(tear2, {
                y: 1000,
                duration: "random(1, 2)",
                ease: "power4.in"
            }, "<0.2")
            .set(tear1, { opacity: 0.8, y: 0, scale: 0, morphSVG: tear1 })
            .set(tear2, {
                opacity: 0.8, y: 0, scale: 0, morphSVG: tear2,
            })
    }

    if (type === "inEyes") {
        tearFadeIn()
    } else if (type === "renew") {
        isRenew()
    } else if (type === "constant" || type === "once") {
        tearsTweens()
    } 
}