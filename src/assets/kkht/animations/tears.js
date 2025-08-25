import gsap from "gsap"

export const tearsAnimation = ({ tearRight, tearLeft }) => {
    const tears = [tearRight, tearLeft]
    var tear1, tear2

    if (Math.random() > 0.5) {
        tear1 = "#tearRight"
        tear2 = "#tearLeft"
    } else {
        tear1 = "#tearLeft"
        tear2 = "#tearRight"
    }

    return (
        gsap.timeline()
            .set("#tearRight", { opacity: 0.8, y: 0, scale: 0, morphSVG: "#tearRight" })
            .set("#tearLeft", { opacity: 0.8, y: 0, scale: 0, morphSVG: "#tearLeft" })
            .to(["#tearRight", "#tearLeft"], {
                scale: 1,
                duration: 2,
                ease: "power1.out"
            })
            .to("#tearRight", {
                duration: 1,
                ease: "power1.in",
                morphSVG: "#tearDownRight"
            }, 1)
            .to("#tearLeft", {
                duration: 1,
                ease: "power1.in",
                morphSVG: "#tearDownLeft"
            }, 1)
            .to(tear1, {
                y: 1500,
                duration: "random(2, 3)",
                ease: "power4.in"
            }, "<0")
            .to(tear2, {
                y: 1500,
                duration: "random(2, 3)",
                ease: "power4.in"
            }, "<0.2")
    )

}