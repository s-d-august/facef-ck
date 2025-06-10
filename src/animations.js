import gsap from "gsap"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.registerPlugin(MorphSVGPlugin);

export const tearsAnimation = () => {
    const tearTop = document.getElementById("tearRight").getBoundingClientRect().top * 2

    return (
        gsap.timeline()
            .set(".tear", { opacity: 1, y: 0, scale: 0 })
            .to(".tear", {
                scale: 1,
                duration: 3,
                ease: "power1.out"
            })
            .to(".tear", {
                scaleY: 2,
                scaleX: 0.3,
                duration: 1,
                ease: "power1.in"
            })
            .to("#tearRight", {
                y: tearTop,
                duration: 4,
                ease: "power4.in"
            }, "<-1")
            .to("#tearLeft", {
                y: tearTop,
                duration: 4,
                ease: "power4.in"
            }, "<0.4")
    )

}

export const eyeFlutterWideAnimation = (el, match) => {
    const eyesWide = gsap.to(el, {
        duration: 0.2,
        morphSVG: match,
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
                onUpdate: () => eyesWide.progress(obj.p)
            })
            .to(obj, {
                p: 0,
                duration: 0.1,
                repeat: 2,
                yoyo: true,
                onUpdate: () => eyesWide.progress(obj.p)
            })
            .to(obj, {
                p: 1,
                duration: 0.2,
                onUpdate: () => eyesWide.progress(obj.p)
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

export const test = (el, match) => {
    const eyesWide = gsap.to(el, {
        duration: 0.2,
        morphSVG: match,
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
                onUpdate: () => eyesWide.progress(obj.p)
            })
            .to(obj, {
                p: 0,
                duration: 0.1,
                repeat: 2,
                yoyo: true,
                onUpdate: () => eyesWide.progress(obj.p)
            })
            .to(obj, {
                p: 1,
                duration: 0.2,
                onUpdate: () => eyesWide.progress(obj.p)
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

export const pantingAnimation = (isInterrupted) => {
    const container = document.getElementById("container");
    if (!container) {
        console.warn('pantingAnimation: #container not found');
        return gsap.timeline();
    }
    const containerSize = container.getBoundingClientRect().height;
    const headParts = gsap.utils.toArray(".headParts");
    const hairPullBeads = gsap.utils.toArray(".hairPullBeads").reverse()
    const body = document.getElementById("bodyGroup");
    const toMove = [headParts, body, hairPullBeads, "#hairPullHand"];

    let obj = { p: 0 };

    const pantGroup = gsap.timeline({ paused: true })
        .fromTo("#mouthGroup", { y: containerSize * 0.045 }, { y: 0, duration: 1 })
        .fromTo("#bodyMain", { scale: 1 }, { scale: 0.97, duration: 1, }, 0)
        .fromTo("#tongueGroup", { scaleY: 1 }, { y: 0, scaleY: 0, duration: 1 }, 0)

    const pantDrool = gsap.timeline({ paused: true })
        .fromTo("#tongueDrool", { scaleY: 0 }, { scaleY: 1, duration: 2, transformOrigin: "top center" })
        .to("#tongueDrool", { scaleX: 0, duration: 1, ease: "power1.in", transformOrigin: "top center" })
        .set("#tongueDrool", { scaleX: 1, scaleY: 0 });

    const master = gsap.timeline()
        .to(toMove, {
            y: 0,
            duration: 1.5,
            ease: "power3.in"
        })
        .to(obj, {
            p: 0.7,
            duration: 2,
            ease: "power2.in",
            onUpdate: () => {
                pantGroup.progress(obj.p);
            }
        }, "<")
        .to(obj, {
            p: 0.3,
            duration: 0.6,
            repeat: 5,
            yoyoEase: "power2.out",
            onUpdate: () => {
                pantGroup.progress(obj.p);
            }
        })
        .to(obj, {
            p: 0.3,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
                pantGroup.progress(obj.p);
            }
        })
        .to(obj, {
            p: 1,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
                pantGroup.progress(obj.p);
            },
            onComplete: () => {
                console.log("complete")
            }
        });

    // Animate pantDrool's progress in sync with the master timeline
    let objDrool = { p: 0 };
    master.to(objDrool, {
        p: 1,
        duration: master.duration(),
        ease: "none",
        onUpdate: () => {
            pantDrool.progress(objDrool.p);
        },

    }, 0); // Start at the beginning of master

    return master;
};


