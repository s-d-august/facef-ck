import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/all";
gsap.registerPlugin(MorphSVGPlugin)
import { matchID } from "../utils/dom.js"

const tweensRef = [{}]

export const callSlowMorph = (args) => {
    const { fromState, toState, progress, expressionsArray, fastMorph, setSlowMorph } = args

    if (fastMorph) {
        return
    } else renderMorph(fromState, toState, progress, expressionsArray, fastMorph, setSlowMorph);
}

export const callFastMorph = (args) => {
    const { fromState, toState, animations, expressionsArray, fastMorph, setFastMorph, slowMorph, setSlowMorph } = args

    setFastMorph(true)

    // If the active slowMorph starts or ends with the fastMorph start state, reverts to that state
    if (slowMorph) {
        if (slowMorph.from === fromState) {
            renderMorph(slowMorph.from, slowMorph.to, 0.01, expressionsArray, fastMorph, setSlowMorph);
        }
        if (slowMorph.to === fromState) {
            renderMorph(slowMorph.from, slowMorph.to, 0.99, expressionsArray, fastMorph, setSlowMorph);
        }
    }
    const fromArray = Array.from(
        document.querySelectorAll(`[id*="${fromState}"]`)
    );
    const tl = gsap.timeline()

    if (animations) {
        animations.forEach((anim) => {
            tl.add(anim.name(anim.args));
        });
    } else {
        // Fast morph from fromState to toState
        fromArray.forEach((el) => {
            const match = matchID(el, fromState, toState);
            if (!match) return;
            tl.to(el, {
                duration: 0.5,
                morphSVG: match,
                ease: "power1.In"
            }, 0);
            // Morph back to fromState
            tl.to(el, {
                duration: 0.75,
                morphSVG: el,
                ease: "power1.Out"
            }, 0.5);
        });

        tl.call(() => {
            setFastMorph(false);
            if (slowMorph) {
                const stateName = slowMorph.from + "-" + slowMorph.to;
                // Ensure tweens exist
                if (!tweensRef[stateName]) {
                    generateMorphTweens(slowMorph.from, slowMorph.to);
                }
                Object.values(tweensRef[stateName]).forEach((tween) => {
                    if (tween && typeof tween.progress === "function") {
                        gsap.to(tween, {
                            duration: 1,
                            progress: slowMorph.progress,
                            ease: "power1.Out"
                        });
                    }
                });
                // Optionally update slowMorph state after transition
                setTimeout(() => {
                    renderMorph(slowMorph.from, slowMorph.to, slowMorph.progress, expressionsArray, false, setSlowMorph);
                }, 1000);
            }
        });
    }

}

// generateMorphTweens
export const generateMorphTweens = (fromState, toState) => {
    const fromArray = document.querySelectorAll(`[id*="${fromState}"]`);
    const stateName = fromState + "-" + toState;
    if (!tweensRef[stateName]) {
        tweensRef[stateName] = {
            name: stateName,
            from: fromState,
            to: toState,
        };
    }
    fromArray.forEach((el) => {
        const match = matchID(el, fromState, toState);
        if (!match) return;
        tweensRef[stateName][el.id] = gsap.to(el, {
            duration: 1,
            morphSVG: match,
            y: 0,
            paused: true,
        });
    });
    return () => {
        Object.values(tweensRef[stateName]).forEach(
            (tween) => tween && tween.kill()
        );
    };
}

// renderMorph
export const renderMorph = (fromState, toState, progress, expressionsArray, fastMorph, setSlowMorph) => {
    const stateName = fromState + "-" + toState;
    const fromArray = Array.from(
        document.querySelectorAll(`[id*="${fromState}"]`)
    );
    const matchedIDs = new Set();
    fromArray.forEach((el) => {
        const match = matchID(el, fromState, toState);
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

    if (!tweensRef[stateName]) {
        generateMorphTweens(fromState, toState);
    }


    Object.values(tweensRef[stateName]).forEach((tween) => {

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

