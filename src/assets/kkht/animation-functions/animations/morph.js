import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/all";
gsap.registerPlugin(MorphSVGPlugin)

// TO IMPORT: matchID

// generateMorphTweens
export const generateMorphTweens = (fromState, toState, tweensRef) => {
    console.log("generateMorphTweens called", { fromState, toState });
    const fromArray = document.querySelectorAll(`[id*="${fromState}"]`);
    const stateName = fromState + "-" + toState;
    if (!tweensRef.current[stateName]) {
        tweensRef.current[stateName] = {
            name: stateName,
            from: fromState,
            to: toState,
        };
    }
    fromArray.forEach((el) => {
        const match = util.matchID(el, fromState, toState);
        if (!match) return;
        tweensRef.current[stateName][el.id] = gsap.to(el, {
            duration: 1,
            morphSVG: match,
            y: 0,
            paused: true,
        });
    });
    return () => {
        Object.values(tweensRef.current[stateName]).forEach(
            (tween) => tween && tween.kill()
        );
    };
}

// renderMorph
export const renderMorph = (fromState, toState, progress, expressionsArray, fastMorph, setSlowMorph) => {
    console.log("renderMorph called", { fromState, toState, progress });
    const stateName = fromState + "-" + toState;
    const fromArray = Array.from(
        document.querySelectorAll(`[id*="${fromState}"]`)
    );
    const matchedIDs = new Set();
    fromArray.forEach((el) => {
        const match = util.matchID(el, fromState, toState);
        if (match) matchedIDs.add(el.id);
    });
    function hideAllExpressions(stateNameArray) {
        stateNameArray.forEach((stateName) => {
            Array.from(
                document.querySelectorAll(`[id*="${stateName}"]`)
            ).forEach((el) => {
                if (matchedIDs.has(el.id)) {
                    el.style.visibility = "hidden";
                }
            });
        });
    }
    hideAllExpressions(expressionsArray);
    fromArray.forEach((el) => {
        if (matchedIDs.has(el.id)) {
            el.style.visibility = "visible";
        }
    });

    if (!tweensRef.current[stateName]) {
        generateMorphTweens(fromState, toState);
    }
    Object.values(tweensRef.current[stateName]).forEach((tween) => {
        const initialState = Array.from(
            document.querySelectorAll(`[id*=${fromState || "Open"}]`)
        );
        initialState.forEach((el) => {
            el.style.visibility = "visible";
        });
        if (tween && typeof tween.progress === "function") {
            tween.progress(progress);
        }
        if (fastMorph === true) {
            return;
        }
        if (progress > 0) {
            setSlowMorph({
                name: stateName,
                from: fromState,
                to: toState,
                progress: progress,
            });
        } else setSlowMorph(false);
    });
}

// callMorph

export const callSlowMorph = (fromState, toState, progress, fastMorph) => {
    console.log("callSlowMorph called", { fromState, toState, progress });
    if (fastMorph) {
        return
    } else renderMorph(fromState, toState, progress);
}

export const callFastMorph =
    (fromState, toState, animations, forEachAnimations, setFastMorph, slowMorph) => {
        setFastMorph(true)

        // If the active slowMorph starts or ends with the fastMorph start state, reverts to that state
        if (slowMorph) {
            if (slowMorph.from === fromState) {
                renderMorph(slowMorph.name, 0.01);
            }
            if (slowMorph.to === fromState) {
                renderMorph(slowMorph.name, 0.99);
            }
        }
        const fromArray = Array.from(
            document.querySelectorAll(`[id*="${fromState}"]`)
        );
        const tl = gsap.timeline()
        animations.forEach((anim) => {
            tl.add(anim(el, match));
        });
        fromArray.forEach((el) => {
            const match = util.matchID(el, fromState, toState);
            if (!match) return;
            if (forEachAnimations) {
                forEachAnimations.forEach((anim) => {
                    tl.add(anim(el, match))
                })
            }
            tl.add({
                onComplete: () => {
                    console.log("callFastMorph timeline complete");
                    if (slowMorph) {
                        let obj = { progress: 0 };
                        gsap.to(obj, {
                            progress: slowMorph.progress,
                            duration: 0.75,
                            onUpdate: () => {
                                renderMorph(slowMorph.name, obj.progress);
                            },
                            onComplete: () => setFastMorph(false),
                        });
                    }
                },
            });

        });
    }