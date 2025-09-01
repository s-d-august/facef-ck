import gsap from "gsap";
import { tearsAnimation } from "./tears";
import { renderMorph } from "../animation-functions/morph";

export const pantingAnimation = (args) => {

    const { expressionsArray, fastMorph, setSlowMorph, slowMorph, containerSize, toMove, mouthGroup, bodyMain, tongueGroup, tongueDrool, tearLeft, tearRight, setMouthOpen, setMouthOn, setApproach, draggable, alsoMove, setFastMorph, setHoldMouthOpen } = args
    console.log(setHoldMouthOpen)
    let obj = { p: 0 };

    const pantGroup = gsap.timeline({ paused: true })
        .fromTo(mouthGroup, { y: containerSize * 0.045 }, { y: 0, duration: 1 })
        .fromTo(bodyMain, { scale: 1 }, { scale: 1.03, duration: 1, transformOrigin: "bottom center" }, 0)
        .fromTo(tongueGroup, { scaleY: 0.4 }, { y: 0, scaleY: 0.15, duration: 1 }, 0)

    const pantDrool = gsap.timeline({ paused: true })
        .fromTo(tongueDrool, { scaleY: 0 }, { scaleY: 1, duration: 2, transformOrigin: "top center" })
        .to(tongueDrool, { scaleX: 0, duration: 1, ease: "power1.in", transformOrigin: "top center" })
        .set(tongueDrool, { scaleX: 1, scaleY: 0 });

    tearsAnimation(tearLeft, tearRight)

    console.log(draggable)

    gsap.timeline().to(draggable.target, {
        y: 0, duration: 1.2
    }).to(alsoMove, {
        y: 0
    })

    draggable.update();

    function setAllFalse() {
        setApproach(false)
        setMouthOn(false)
        setMouthOpen(false)
        setHoldMouthOpen(false)
    }

    setTimeout(setAllFalse, 3000)

    const master = gsap.timeline()
        .to(toMove, {
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
            repeat: 3,
            yoyoEase: "power2.out",
            onUpdate: () => {
                pantGroup.progress(obj.p);
            }
        })
        .to(obj, {
            p: 0.3,
            duration: 1,
            ease: "power2.out",
            onUpdate: () => {
                pantGroup.progress(obj.p);
            }
        })
        .to(obj, {
            p: 1,
            duration: 1,
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

    if (slowMorph) {
        let objMorph = { progress: 0 };
        master.to(objMorph, {
            progress: slowMorph.progress,
            duration: 5,
            onUpdate: () => {
                renderMorph(slowMorph.from, slowMorph.to, objMorph.progress, expressionsArray, fastMorph, setSlowMorph);
            },
            onComplete: () => setFastMorph(false)
        }, 3);
    }

    return master;

};