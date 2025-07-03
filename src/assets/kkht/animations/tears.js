import gsap from "gsap"

export const tearsAnimation = (tearRight, tearLeft) => {
    console.log("tears called")
    const tearTop = tearRight.getBoundingClientRect().top * 2
    const tears = [tearRight, tearLeft]

    return (
        gsap.timeline()
            .set(tears, { opacity: 1, y: 0, scale: 0 })
            .to(tears, {
                scale: 1,
                duration: 3,
                ease: "power1.out"
            })
            .to(tears, {
                scaleY: 2,
                scaleX: 0.3,
                duration: 1,
                ease: "power1.in"
            })
            .to(tearRight, {
                y: tearTop,
                duration: 4,
                ease: "power4.in"
            }, "<-1")
            .to(tearLeft, {
                y: tearTop,
                duration: 4,
                ease: "power4.in"
            }, "<0.4")
    )

}