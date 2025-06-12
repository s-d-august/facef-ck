import gsap from "gsap"

export const tearsAnimation = (tearRightID, tearLeftID) => {
    const tearTop = document.getElementById(tearRightID).getBoundingClientRect().top * 2
    const tears = [tearRightID, tearLeftID]

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
            .to(tearRightID, {
                y: tearTop,
                duration: 4,
                ease: "power4.in"
            }, "<-1")
            .to(tearLeftID, {
                y: tearTop,
                duration: 4,
                ease: "power4.in"
            }, "<0.4")
    )

}