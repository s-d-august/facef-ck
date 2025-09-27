import gsap from "gsap"

export const tearsAnimation = ({ index, areTears, setAreTears, type, arousalTier, isCrying, setNone }) => {

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

    var interval = 1

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
        } else setFalse()
    }

    function isRenew() {
        if (type === "renew") {
            gsap.timeline({
                onStart: setTrue,
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
                }, interval)
                .to(tear2, {
                    duration: 1,
                    ease: "power1.in",
                    morphSVG: tearDown2
                }, interval)
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
            }, interval)
            .to(tear2, {
                duration: 1,
                ease: "power1.in",
                morphSVG: tearDown2
            }, interval)
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

    if (type === "once") {
        console.log(tear1, tear2, index)
    }

    if (isCrying.current === false) {
        console.log("not crying")
        return
    } else if (type === "inEyes") {
        console.log("inEyes called")
        tearFadeIn()
    } else if (type === "renew") {
        console.log("renew called")
        isRenew()
    } else if (type === "constant" || type === "once") {
        console.log("other called. type: ", type)
        tearsTweens()
    } else console.log("nothing recognized")
}