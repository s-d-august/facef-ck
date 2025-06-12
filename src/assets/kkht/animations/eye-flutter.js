export const eyeFlutterAnimation = (el, startString, endString) => {
    const fullTransition = gsap.to(el, {
        duration: 0.2,
        morphSVG: matchID(startString, endString),
        y: 0,
        x: 0,
        paused: true
    })

    let obj = { p: 0 }
    return (
        gsap.timeline()
            .to(obj, {
                p: 0.75,
                duration: 0.2,
                onUpdate: () => fullTransition.progress(obj.p)
            })
            .to(obj, {
                p: 0,
                duration: 0.1,
                repeat: 2,
                yoyo: true,
                onUpdate: () => fullTransition.progress(obj.p)
            })
            .to(obj, {
                p: 1,
                duration: 0.2,
                onUpdate: () => fullTransition.progress(obj.p)
            })
            .to(el, {
                delay: 1.5,
                duration: 0.75,
                morphSVG: el,
                y: 0,
                x: 0,
            })
    )

}