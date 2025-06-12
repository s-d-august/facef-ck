export const pantingAnimation = (containerSize, toMove, mouthGroup, bodyMain, tongueGroup, tongueDrool) => {

    let obj = { p: 0 };

    const pantGroup = gsap.timeline({ paused: true })
        .fromTo(mouthGroup, { y: containerSize * 0.045 }, { y: 0, duration: 1 })
        .fromTo(bodyMain, { scale: 1 }, { scale: 0.97, duration: 1, }, 0)
        .fromTo(tongueGroup, { scaleY: 1 }, { y: 0, scaleY: 0, duration: 1 }, 0)

    const pantDrool = gsap.timeline({ paused: true })
        .fromTo(tongueDrool, { scaleY: 0 }, { scaleY: 1, duration: 2, transformOrigin: "top center" })
        .to(tongueDrool, { scaleX: 0, duration: 1, ease: "power1.in", transformOrigin: "top center" })
        .set(tongueDrool, { scaleX: 1, scaleY: 0 });

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
        onComplete: () => {

        }

    }, 0); // Start at the beginning of master

    return master;

};