import gsap from "gsap"

export const tearsAnimation = ({ index, areTears, setAreTears, type, arousalTier, isCrying }) => {

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

    function tearFadeInHandler() {
        if (!areTears.current || index !== "" || type === "constant") {
            tearFadeIn()
        } else {
            gsap.timeline()
                .set(tear1, { opacity: 0.8, y: 0, scale: 0, morphSVG: tear1 })
                .set(tear2, { opacity: 0.8, y: 0, scale: 0, morphSVG: tear2 })
        }
    }

    function tearFadeIn() {
        console.log("tear fade in")
        gsap.timeline()
            .set(tear1, { opacity: 0.8, y: 0, scale: 0, morphSVG: tear1 })
            .set(tear2, { opacity: 0.8, y: 0, scale: 0, morphSVG: tear2 })
            .to([tear1, tear2], {
                scale: 1,
                opacity: 0.8,
                duration: 1,
                ease: "power1.out",
                onComplete: setTrue
            })
    }

    function tearEndHandler() {
        console.log(type, arousalTier, isCrying)
        if (type === "constant" && arousalTier.current === 1 && isCrying.current === true) {
            tearsTweens()
        } else {
            setFalse()
        }
    }

    function isRenew() {
        if (type === "renew") {
            console.log("renew called")
            gsap.timeline({
                onStart: setTrue,
                onComplete: tearEndHandler
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
                .set(tear1, { opacity: 0.8, y: 0, scale: 0, morphSVG: tear1 })
                .set(tear2, { opacity: 0.8, y: 0, scale: 0, morphSVG: tear2 })
                .to([tear1, tear2], {
                    scale: 1,
                    opacity: 0.8,
                    duration: 1,
                    ease: "power1.out",
                    onComplete: setTrue
                })
        }
    }

    function setFalse() {
        setAreTears(false)
    }

    function setTrue() {
        console.log("tears set true")
        setAreTears(true)
    }

    function tearsTweens() {
        gsap.timeline({
            onStart: setTrue,
            onComplete: tearEndHandler
        })
            .add(tearFadeInHandler())
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

    console.log(type, areTears, tearsTweens)
    if (isCrying.current === false) {
        console.log("not crying")
        return
    } else if (type === "inEyes") {
        if (areTears.current === true) {
            return
        } else {
            tearFadeIn()
        }
    } else if (type === "renew") {
        isRenew()
    } else {
        tearsTweens()
    }
}