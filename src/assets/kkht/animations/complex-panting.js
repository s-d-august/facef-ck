import gsap from "gsap";
import { tearsAnimation } from "./tears";
import { updateFollowers } from "../utils/gsap";

export const pantingAnimation = (args) => {

    const { containerSize, toMove, mouthGroup, bodyMain, tongueGroup, tongueDrool, tearLeft, tearRight, setMouthOpen, setMouthOn, setApproach, draggable, origin, alsoMove } = args

    let obj = { p: 0 };

    const pantGroup = gsap.timeline({ paused: true })
        .fromTo(mouthGroup, { y: containerSize * 0.045 }, { y: 0, duration: 1 })
        .fromTo(bodyMain, { scale: 0.97 }, { scale: 1, duration: 1, transformOrigin: "bottom center" }, 0)
        .fromTo(tongueGroup, { scaleY: 0.5 }, { y: 0, scaleY: 0, duration: 1 }, 0)

    const pantDrool = gsap.timeline({ paused: true })
        .fromTo(tongueDrool, { scaleY: 0 }, { scaleY: 1, duration: 2, transformOrigin: "top center" })
        .to(tongueDrool, { scaleX: 0, duration: 1, ease: "power1.in", transformOrigin: "top center" })
        .set(tongueDrool, { scaleX: 1, scaleY: 0 });

    tearsAnimation(tearLeft, tearRight)

    gsap.to(draggable.target, {
        x: 0, y: 0, duration: 0.01
    });

    draggable.update(); // Let Draggable know it moved


    const master = gsap.timeline()
        .to([".hairPullBeads"], {
            y: 0
        })
        .to(["#bodyGroup", ".headParts"], {
            delay: 2,
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
            },
            onComplete: () => {
                setApproach(false)
                setMouthOn(false)
                setMouthOpen(false)
            }
        })
        .to(obj, {
            p: 1,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: () => {
                pantGroup.progress(obj.p);
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
        }

    }, 0); // Start at the beginning of master

    return master;

};