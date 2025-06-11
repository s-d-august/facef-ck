import gsap from "gsap"
import * as util from "./stateless-functions"
var tweensRef = []
var changeInProgress = false
var interrupt = false
var expressionsArray = ["Open", "Half", "Wide", "Shut"]

/* Selects a random element from an array, removes it from that array while animation is running,
and returns it to the array so it can be selected again once the animation is complete
*/
export const randomizeArray = async (idString, animation) => {

    var arrayName = document.getElementById(`${idString}Group`)
    var array = [...arrayName.children]

    if (array.length === 0 || !document.hasFocus()) return

    var index = Math.floor(Math.random() * array.length); // Generates a random index for the array
    var element = array[index]; // Retrieves the value associated with the index

    array.splice(index, 1) // Removes the selected element from the array
    await animation

    array.splice(0, 0, element) // Adds the element back to the array so it can be called again
}

/* Makes an element move slowly down the page until it hits the bounds */
export const drip = (element, initialY) => {
    var boundsArea = document.getElementById(bounds)
    var initialY = boundsArea.getBoundingClientRect().height

    return new Promise((resolve) => {
        gsap.set(element, { opacity: 1 });
        var initials = {
            transformOrigin: "top center",
            y: initialY,
            scaleY: (Math.random() + 1),
            duration: initialY / util.randomRange(4, 6)
        };
        if (Math.random() < 0.5) {
            gsap.set(element, { transformOrigin: "center", scaleX: -1 });
        }
        let tl = gsap.timeline({
            onComplete: resolve // resolve the promise when timeline is done
        });
        tl.to(element, initials)
            .to(element, { opacity: 0, duration: 0.3 })
            .set(element, { y: 0, opacity: 0 });
    });
};

export const cumAnimation = async (cumType, shotDuration, moveDuration, origin, axis, empty, cumshotAnimation, wipeFaceAnimation) => {

    if (typeof cumType === "string") {
        var cumArray = Array.from(document.querySelectorAll(`[id*="${cumType}"]`));
        var typeKey = cumType;
    } else {
        var cumArray = cumType;
        var typeKey = "custom";
    }

    if (!cumArray || cumArray.length === 0) return;

    let cumId;
    if (empty) {
        cumId = util.pluckRandomFrom(cumArray, typeKey);
    } else {
        cumId = util.getRandomFrom(cumArray);
    }
    console.log(cumId)

    var scaleAxis
    if (!axis) {
        scaleAxis = "scale"
    } else scaleAxis = axis

    const cumshot = document.getElementById("cumshot");
    if (!cumshot || !cumId) return;

    const cumVals = getXY(cumId, origin);
    cumshot.setAttribute('x2', cumVals.x);
    cumshot.setAttribute('y2', cumVals.y);

    await cumshotAnimation

    if (arrayEligibleMap[typeKey].length === 0) {
        wipeFaceAnimation
        cumArray.forEach(el => {
            if (typeof el === "string") el = document.getElementById(el);
            if (el) gsap.set(el, { opacity: 0 })
        })
    }

    gsap.set("#cumshot", { opacity: 0.9 });
    gsap.timeline().fromTo(
        "#cumshot",
        { drawSVG: "0 0" },
        {
            duration: (shotDuration / 2 || 0.125),
            drawSVG: "0 100%"
        }).to("#cumshot", { drawSVG: "100% 100%", duration: (shotDuration / 2 || 0.125) })
        .set("#cumshot", { opacity: 0 })
        .set(cumId, { opacity: .8, [scaleAxis]: 0.3, transformOrigin: (cumId.transformOrigin || origin || "center") })
        .to(cumId, {
            [scaleAxis]: 1, duration: (moveDuration || 1), ease: "power1.out",
        })

}


/* Generates tweens for an SVGMorph if they don't already exist and caches them in tweensRef */
export const generateMorphTweens = (fromState, toState) => {
    // Get all elements whose id contains fromState and toState
    var fromArray = document.querySelectorAll(`[id*="${fromState}"]`);
    var stateName = fromState + "-" + toState

    // Initialize the object for this state if it doesn't exist
    if (!tweensRef[stateName]) {
        tweensRef[stateName] = {
            name: stateName,
            from: fromState,
            to: toState
        };
    }

    fromArray.forEach((el) => {
        // Use el.id as the key, or el if you prefer
        const match = matchID(el, fromState, toState)
        if (!match) return

        tweensRef[stateName][el.id] = gsap.to(el, {
            duration: 1,
            morphSVG: match,
            y: 0,
            paused: true
        });
    });

    return () => {
        // Kill all tweens on cleanup
        Object.values(tweensRef.current[stateName]).forEach(tween => tween && tween.kill());
    };
}

export const renderMorph = (name, progress) => {
    var states = name.split("-")

    if (!tweensRef[name]) {
        generateMorphTweens(states[0], states[1])
    }

    Object.values(tweensRef[name]).forEach(tween => {

        var initialState = Array.from(document.querySelectorAll(`[id*=${states[0] || "Open"}]`))
        initialState.forEach((el) => {
            el.style.visibility = "visible"
        })

        if (tween && typeof tween.progress === "function") {
            tween.progress(progress);
        }

        // Interrupts the current change in progress
        if (interrupt === true) {
            return
        }

        if (progress > 0) {
            changeInProgress = {
                name: stateName,
                from: fromState,
                to: toState,
                progress: progress
            }
        } else changeInProgress = false

    });
}

export const expressionMorphHandler = (fromState, toState, progress, interruptAnimations) => {
    var stateName = fromState + "-" + toState

    // When building your fromArray, also build a set of IDs that have matches
    const fromArray = Array.from(document.querySelectorAll(`[id*="${fromState}"]`));
    const matchedIDs = new Set();

    fromArray.forEach(el => {
        const match = util.matchID(el, fromState, toState);
        if (match) matchedIDs.add(el.id);
    });

    // Then, when hiding/showing, only affect matched elements
    function hideAllExpressions(stateNameArray) {
        stateNameArray.forEach(stateName => {
            Array.from(document.querySelectorAll(`[id*="${stateName}"]`)).forEach(el => {
                if (matchedIDs.has(el.id)) {
                    el.style.visibility = "hidden";
                }
            });
        });
    }

    hideAllExpressions(expressionsArray)

    // When showing, only show matched elements
    fromArray.forEach(el => {
        if (matchedIDs.has(el.id)) {
            el.style.visibility = "visible";
        }
    });

    if (interruptAnimations) {
        interruptMorph(changeInProgress, animations)
    }

    renderMorph(stateName, progress)
}

export const interruptMorph = (changeInProgress, animations) => {

    if (changeInProgress) {

        interrupt = true

        // if the currently running animation starts with the same state as the interrupt, reverts to that state
        if (changeInProgress.from === fromState) {
            renderMorph(changeInProgress.name, 0.01)

            // if the currently running animation ends with the same state as the interrupt, goes to that state
        }
        if (changeInProgress.to === fromState) {
            renderMorph(changeInProgress.name, 0.99)
        }
    }
    fromArray.forEach(el => {
        const match = util.matchID(el, fromState, toState)
        if (!match) return
        const tl = gsap.timeline({
            onComplete: () => {
                if (changeInProgress) {
                    let obj = { progress: 0 };
                    gsap.to(obj, {
                        progress: changeInProgress.progress,
                        duration: 0.75,
                        onUpdate: () => {
                            renderMorph(changeInProgress.name, obj.progress)
                        },
                        onComplete: () => interrupt = false
                    });
                }
            }
        });

        animations.forEach((anim) => {
            tl.add(anim(el, match))
        })
    })

}
