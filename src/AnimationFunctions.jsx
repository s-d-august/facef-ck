import React, { useRef, useState, useCallback } from "react";
import gsap from "gsap";
import * as util from "./stateless-functions";
import * as anim from './animations'

export function useAnimationFunctions() {
    const tweensRef = useRef({});
    const trainingMaxYLoggedRef = useRef({})
    const trainingMultiplierRef = useRef({})
    const [slowMorph, setSlowMorph] = useState(false);
    const [fastMorph, setFastMorph] = useState(false);
    const expressionsArray = ["Open", "Half", "Wide", "Shut"];
    const [holdMouthOpen, setHoldMouthOpen] = useState(false)
    const [isMouthOpen, setIsMouthOpen] = useState(false)
    const arrayEligibleMap = useRef({})

    const trainingModeMaxY = useCallback((id, y, maxY, initial, end, hits, increaseBy) => {
        console.log("trainingModeMaxY called", { id, y, maxY, initial, end, hits, increaseBy });
        if (trainingMultiplierRef[id] === undefined) {
            trainingMultiplierRef[id] = initial;
        }
        if (trainingMaxYLoggedRef[id] === undefined) {
            trainingMaxYLoggedRef[id] = 0;
        }

        if (trainingMultiplierRef[id] >= end) return end;
        else if (y + 1 >= maxY) {
            trainingMaxYLoggedRef[id] += 1;
            if (trainingMaxYLoggedRef[id] >= hits) {
                trainingMaxYLoggedRef[id] = 0;
                trainingMultiplierRef[id] = trainingMultiplierRef[id] + increaseBy;
            }
        }
        return trainingMultiplierRef[id];
    }, [])

    // randomizeArray
    const randomizeArray = useCallback(async (idString, animation, args) => {
        console.log("randomizeArray called", { idString, animation, args });
        const arrayName = document.getElementById(`${idString}Group`);
        if (!arrayName) return;
        const array = [...arrayName.children];
        if (array.length === 0 || !document.hasFocus()) return;
        const index = Math.floor(Math.random() * array.length);
        const element = array[index];
        array.splice(index, 1);
        await animation(element, args);
        array.splice(0, 0, element);
        console.log("randomizeArray finished", { array });
    }, []);

    // drip
    const drip = useCallback((element, initialY) => {
        console.log("drip called", { element, initialY });
        return new Promise((resolve) => {
            gsap.set(element, { opacity: 1 });
            const initials = {
                transformOrigin: "top center",
                y: initialY,
                scaleY: Math.random() + 1,
                duration: initialY / util.randomRange(4, 6),
            };
            if (Math.random() < 0.5) {
                gsap.set(element, { transformOrigin: "center", scaleX: -1 });
            }
            let tl = gsap.timeline({
                onComplete: () => {
                    console.log("drip timeline complete", { element });
                    resolve();
                },
            });
            tl.to(element, initials)
                .to(element, { opacity: 0, duration: 0.3 })
                .set(element, { y: 0, opacity: 0 });
        });
    }, []);

    // cumAnimation
    const cumAnimation = useCallback((
        cumType, shotDuration, moveDuration, origin, axis, empty
    ) => {
        console.log("cumAnimation called", { cumType, shotDuration, moveDuration, origin, axis, empty });
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
            cumId = pluckRandomFrom(cumArray, typeKey);
        } else {
            cumId = getRandomFrom(cumArray);
        }
        console.log("cumId selected", cumId);

        var scaleAxis;
        if (!axis) {
            scaleAxis = "scale";
        } else scaleAxis = axis;

        const cumshot = document.getElementById("cumshot");
        if (!cumshot || !cumId) return;

        const cumVals = getXY(cumId, origin);
        cumshot.setAttribute('x2', cumVals.x);
        cumshot.setAttribute('y2', cumVals.y);

        gsap.timeline().set("#cumshot", { opacity: 0.9 })
            .fromTo(
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
                onComplete: () => {
                    console.log("cumAnimation complete", { cumId });
                    if (arrayEligibleMap[typeKey].length === 0) {
                        cumArray.forEach(el => {
                            if (typeof el === "string") el = document.getElementById(el);
                            if (el) gsap.set(el, { opacity: 0 });
                        });
                        // Wipe face animation
                        console.log("wipe your face, boyd!")
                        return;
                    }
                }
            });
    }, []);

    // generateMorphTweens
    const generateMorphTweens = useCallback((fromState, toState) => {
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
    }, []);

    // renderMorph
    const renderMorph = useCallback((fromState, toState, progress) => {
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
    }, [generateMorphTweens, fastMorph, slowMorph]);

    // callMorph

    const callSlowMorph = useCallback((fromState, toState, progress) => {
        console.log("callSlowMorph called", { fromState, toState, progress });
        if (fastMorph) {
            return
        } else renderMorph(fromState, toState, progress);
    }, [fastMorph, renderMorph])

    const callFastMorph = useCallback(
        (fromState, toState, animations, forEachAnimations) => {
            console.log("callFastMorph called", { fromState, toState, animations, forEachAnimations });
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
        },
        [renderMorph, slowMorph]
    );

    const mouthOpenFunction = useCallback(() => {
        console.log("mouthOpenFunction called");
        if (fastMorph === true) return

        const containerSize = document.getElementById("container").getBoundingClientRect().height
        gsap.to("#mouthGroup", { y: containerSize * 0.045, duration: 1, ease: "power1.out" })
        gsap.to("#tongueGroup", { y: 0, scaleY: 1, duration: 1, ease: "power1.out" })
        gsap.to("#tongueDrool", { scaleY: 1, duration: 2, transformOrigin: "top center" })
        // mouthOpenRef = true
        setIsMouthOpen(true);
    }, [fastMorph])

    const mouthCloseFunction = useCallback(() => {
        console.log("mouthCloseFunction called");
        if (holdMouthOpen === true || fastMorph === true) return

        const all = document.querySelectorAll('[id*="tongueCum"]');
        const visible = (Array.from(all)).filter(el => getComputedStyle(el).opacity !== "0");

        gsap.to("#mouthGroup", { y: 0, duration: 2, ease: "power1.out" })
        gsap.to("#tongueGroup", { y: 0, scaleY: 0, duration: 2, ease: "power1.out" })
        gsap.timeline()
            .to("#tongueDrool", { scaleX: 0, duration: 1, ease: "power1.in", transformOrigin: "top center" })
            .set("#tongueDrool", { scaleX: 1, scaleY: 0 })
            .set(visible, { opacity: 0 })
        setIsMouthOpen(false);
    }, [holdMouthOpen, fastMorph])

    const toggleHoldMouthOpen = useCallback(() => {
        console.log("toggleHoldMouthOpen called");
        if (isMouthOpen == true) {
            mouthCloseFunction();
            setHoldMouthOpen(false)
        } else {
            mouthOpenFunction();
            setHoldMouthOpen(true)
        }
    }, [isMouthOpen, mouthOpenFunction, mouthCloseFunction])

    function pluckRandomFrom(array, typeKey) {
        if (!arrayEligibleMap[typeKey] || arrayEligibleMap[typeKey].length === 0) {
            arrayEligibleMap[typeKey] = gsap.utils.shuffle(array.slice(0));
        }
        const popped = arrayEligibleMap[typeKey].pop();
        return popped;
    }

    function getRandomFrom(array) {
        var selected = array.selected;
        while (
            selected === (array.selected = Math.floor(Math.random() * array.length))
        ) { }
        return array[array.selected];
    }

    return {
        tweensRef,
        trainingMaxYLoggedRef,
        trainingMultiplierRef,
        slowMorph,
        setSlowMorph,
        fastMorph,
        setFastMorph,
        expressionsArray,
        holdMouthOpen,
        setHoldMouthOpen,
        isMouthOpen,
        setIsMouthOpen,
        arrayEligibleMap,
        trainingModeMaxY,
        randomizeArray,
        drip,
        cumAnimation,
        generateMorphTweens,
        renderMorph,
        callSlowMorph,
        callFastMorph,
        mouthOpenFunction,
        mouthCloseFunction,
        toggleHoldMouthOpen
    };
}