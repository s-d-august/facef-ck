import gsap from "gsap"

export const tearsAnimation = ({ tearRight, tearLeft }) => {
    const tears = [tearRight, tearLeft]
    var tear1, tear2

    if (Math.random() > 0.5) {
        tear1 = tearRight
        tear2 = tearLeft
    } else {
        tear1 = tearLeft
        tear2 = tearRight
    }

    return (
        gsap.timeline()
            .set(tears, { opacity: 0.8, y: 0, scale: 0 })
            .to(tears, {
                scale: 1,
                duration: 2,
                ease: "power1.out"
            })
            .to(tears, {
                scaleY: 2,
                scaleX: 0.3,
                duration: 1,
                ease: "power1.in"
            })
            .to(tear1, {
                y: 1000,
                duration: "random(3, 5)",
                ease: "power4.in"
            }, "<-1.2")
            .to(tear2, {
                y: 1000,
                duration: "random(3, 5)",
                ease: "power4.in"
            }, "<0.4")
    )

}