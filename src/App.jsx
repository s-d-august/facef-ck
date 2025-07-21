import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import * as kkht from './assets/kkht/index'
import JOHand from './assets/components/body-parts/JO-hand'
import Torso from './assets/components/body-parts/torso'
import Head from './assets/components/body-parts/head'
import Jaw from './assets/components/body-parts/jaw'
import Arms from './assets/components/body-parts/arms'
import Outputs from './assets/components/outputs/outputs'
import Setters from './assets/components/setters/setters'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin, DrawSVGPlugin } from 'gsap/all'


function App() {

    const [slowMorph, setSlowMorph] = useState(false)
    const [fastMorph, setFastMorph] = useState(false)
    const slowMorphRef = useRef(slowMorph)
    const fastMorphRef = useRef(fastMorph)

    const [interruptBreath, setInterruptBreath] = useState()
    const interruptBreathRef = useRef(interruptBreath)
    const [interruptUI, setInterruptUI] = useState()
    const interruptUIRef = useRef(interruptUI)

    const [isTongueCum, setIsTongueCum] = useState(false)
    const isTongueCumRef = useRef()

    const [depthMethod, setDepthMethod] = useState("Training")

    const [headDragging, setHeadDragging] = useState(false)

    const [holdMouthOpen, setHoldMouthOpen] = useState(false)
    const [mouthOpen, setMouthOpen] = useState(false)
    const [mouthOn, setMouthOn] = useState(false)
    const mouthOpenRef = useRef(mouthOpen);
    const [approach, setApproach] = useState(false)

    const [arousalTier, setArousalTier] = useState(1)

    const [arousal, setArousal] = useState({
        blue: 0,
        pink: 0,
    })
    const [maxArousal, setmaxArousal] = useState({
        blue: 1500,
        pink: 10000,
    })
    const [sensitivity, setSensitivity] = useState({
        blue: 5,
        pink: 2.5,
    })

    const armLeft = useRef()
    const armRight = useRef()
    const arousalTierRef = useRef()
    const body = useRef()
    const browLeft = useRef()
    const browRight = useRef()
    const chain = useRef()
    const cloth = useRef()
    const containerSize = useRef()
    const depthMethodRef = useRef()
    const dickHandDraggable = useRef()
    const dickHandGrab = useRef()
    const dickHandParts = useRef()
    const dickSvg = useRef()
    const droolIntervalRef = useRef(null);
    const eyeCenterLeft = useRef()
    const eyeCenterRight = useRef()
    const hairPullBeads = useRef()
    const headDraggable = useRef()
    const hairPullHandGrab = useRef()
    const headParts = useRef()
    const hesitation = useRef({ sec: 0, ms: 0 })
    const headHand = useRef()
    const maxArousalRef = useRef(maxArousal);
    const mouthArgs = useRef()
    const mouthButton = useRef()
    const mouthGroup = useRef()
    const mouthOnRef = useRef()
    const sensitivityRef = useRef()
    const sweatIntervalRef = useRef(null);
    const tearLeft = useRef()
    const tearRight = useRef()
    const tongueCumArray = useRef()
    const tongueDrool = useRef()
    const tongueGroup = useRef()
    const wipeButton = useRef()

    const morphArgsTemplate = {
        expressionsArray: ["Wide", "Open", "Half"],
        setFastMorph: setFastMorph,
        setSlowMorph: setSlowMorph,
        fastMorph: fastMorphRef.current,
        slowMorph: slowMorphRef.current
    }

    gsap.registerPlugin(Draggable, DrawSVGPlugin, InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin);
    //   gsap.defaults({ overwrite: "auto" })

    useEffect(() => {

        const container = document.getElementById("container");
        if (!container) {
            console.log("container not rendered")
            return
        }; // Prevents error if not rendered
        armLeft.current = document.getElementById("armLeftUp")
        armRight.current = document.getElementById("armRightIp")
        body.current = document.getElementById("torsoGroup");
        browLeft.current = document.getElementById("browLeft")
        browRight.current = document.getElementById("browRight")
        cloth.current = document.getElementById("cloth")
        containerSize.current = document.getElementById("container").getBoundingClientRect().height
        dickHandGrab.current = document.getElementById("dickHandGrab");
        dickHandParts.current = gsap.utils.toArray(".dickHandParts")
        dickSvg.current = document.getElementById("dickGroup")
        eyeCenterLeft.current = document.getElementById("eyeCenterLeft");
        eyeCenterRight.current = document.getElementById("eyeCenterRight");
        headHand.current = document.getElementById("headHand");
        headParts.current = gsap.utils.toArray(".headParts");
        mouthButton.current = document.getElementById("mouthOrderButton")
        mouthGroup.current = document.getElementById("mouthGroup")
        tongueCumArray.current = Array.from(document.querySelectorAll(`[id^="tongueCum"]`))
        tongueDrool.current = document.getElementById("tongueDrool")
        tongueGroup.current = document.getElementById("tongueGroup")
        wipeButton.current = document.getElementById("wipeOrderButton")
    }, [])

    useEffect(() => {
        isTongueCumRef.current = isTongueCum
    }, [isTongueCum])

    useEffect(() => {
        mouthOpenRef.current = mouthOpen;
    }, [mouthOpen]);

    useEffect(() => {
        mouthOnRef.current = mouthOn;
    }, [mouthOn]);

    useEffect(() => {
        arousalTierRef.current = arousalTier;

        mouthArgs.current = {
            tongueCum: tongueCumArray.current,
            moveBy: containerSize.current * 0.02,
            mouthGroup: mouthGroup.current,
            tongueGroup: tongueGroup.current,
            tongueDrool: tongueDrool.current,
            mouthOpenSetter: setMouthOpen,
            arousalTier: arousalTierRef.current
        }

    }, [arousalTier]);

    useEffect(() => {
        depthMethodRef.current = depthMethod;
    }, [depthMethod]);

    useEffect(() => {
        slowMorphRef.current = slowMorph;
    }, [slowMorph]);

    useEffect(() => {
        fastMorphRef.current = fastMorph;
    }, [fastMorph]);

    useEffect(() => {
        sensitivityRef.current = sensitivity
    }, [sensitivity])

    useEffect(() => {
        interruptBreathRef.current = interruptBreath
    }, [interruptBreath])

    useEffect(() => {
        interruptUIRef.current = interruptUI
    }, [interruptUI])


    useEffect(() => { // Face wipe, order buttons

        if (holdMouthOpen) {
            if (isTongueCum) {
                mouthButton.current.innerText = '"Swallow for me."'
            } else mouthButton.current.innerText = '"Close your mouth"'
        } else {
            mouthButton.current.innerText = '"Open your mouth."'
        }

        if (mouthOn || fastMorph || approach || interruptUI) {
            mouthButton.current.classList.add("inactive")
            wipeButton.current.classList.add("inactive")
        } else {
            mouthButton.current.classList.remove("inactive")
            wipeButton.current.classList.remove("inactive")
        }


        wipeButton.current.innerText = '"Wipe the mess off your face."'
        wipeButton.current.classList.add("hide")
        mouthButton.current.classList.remove("hide")

        if (kkht.isFaceClean() === false) {
            wipeButton.current.classList.remove("hide");
            wipeButton.current.addEventListener("click", handleFaceWipeClick);
        } else {
            wipeButton.current.classList.add("hide");
        }


        function handleFaceWipeClick() {
            wipeButton.current.classList.add("hide");
            kkht.faceWipe({
                elements: [chain.current, armRight.current, armLeft.current],
                cloth: cloth.current,
                hide: [headHand.current, dickHandGrab.current],

                animationSetter: setInterruptUI
            });
        }
        function lowerArmsHandler() {
            kkht.valChange(["pink"], "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousal.pink / 20 * sensitivityRef.current.pink))
            kkht.lowerArms({
                elements: [chain.current, cloth.current, armRight.current, armLeft.current],
                container: container,

            }
            )
        }
        // document.getElementById("pinkBarWrap").addEventListener("dblclick", handleFaceWipeClick)

        wipeButton.current.addEventListener("click", lowerArmsHandler)

        // Cleanup function to remove listeners
        return () => {
            wipeButton.current.removeEventListener("click", lowerArmsHandler);
            wipeButton.current.removeEventListener("click", handleFaceWipeClick);
            //  document.getElementById("pinkBarWrap").removeEventListener("dblclick", handleFaceWipeClick)
        };

    }, [mouthOn, fastMorph, interruptUI, approach, mouthOpen, isTongueCum])

    useEffect(() => { // Elements that change based on approach state
        if (holdMouthOpen) return
        if (
            !containerSize.current ||
            !mouthGroup.current ||
            !tongueGroup.current ||
            !tongueDrool.current
        ) {
            console.error("One or more refs are null!");
            return;
        }

        if (approach) {
            kkht.mouthOpenFunction(mouthArgs.current)
        } else {
            kkht.mouthCloseFunction(mouthArgs.current)
        }
    }, [approach, holdMouthOpen])

    function mouthOpenClose() {
        if (mouthOpenRef.current === false) { // if setting mouth to open
            kkht.hesitation({
                deepBreath: (arousalTierRef.current === 1) ? "true" : "false",
                setter: [setInterruptBreath, setInterruptUI],
                duration: hesitation.current.sec,
                playDuring: {
                    name: kkht.browRaise,
                    args: {
                        browLeft: browLeft.current,
                        browRight: browRight.current
                    }
                },
                playAfter: () => {
                    kkht.valChange(["pink"], "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousalRef.current.pink / 100 * sensitivityRef.current.pink))
                    kkht.mouthOpenFunction({
                        tongueCum: tongueCumArray.current,
                        moveBy: containerSize.current * 0.045,
                        mouthGroup: mouthGroup.current,
                        tongueGroup: tongueGroup.current,
                        tongueDrool: tongueDrool.current,
                        mouthOpenSetter: setMouthOpen,
                        arousalTier: arousalTierRef.current
                    });
                    setHoldMouthOpen(true)
                }
            })


        } else {
            if (isTongueCumRef.current) {
                kkht.hesitation({
                    deepBreath: (arousalTierRef.current < 4) ? "true" : "false",
                    setter: [setInterruptBreath, setInterruptUI],
                    duration: (hesitation.current.sec * 3),
                    playDuring: [{
                        name: kkht.browRaise,
                        args: {
                            browLeft: browLeft.current,
                            browRight: browRight.current
                        }
                    },
                    {
                        name: kkht.tearsAnimation,
                        args: {
                            tearRight: tearRight.current,
                            tearLeft: tearLeft.current
                        }
                    }],
                    playAfter: () => {
                        console.log("hesitation.current.sec: ", hesitation.current.sec)
                        kkht.mouthCloseFunction({ ...mouthArgs.current, duration: (hesitation.current.sec * 3) });
                        setHoldMouthOpen(false)
                        setIsTongueCum(false)
                        kkht.valChange(["pink"], "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousalRef.current.pink / 15 * sensitivityRef.current.pink))
                        if (arousalTierRef.current < 4) kkht.tearsAnimation({ tearLeft: tearLeft.current, tearRight: tearRight.current })
                    }
                })

            } else {
                kkht.mouthCloseFunction({ ...mouthArgs.current });
                setHoldMouthOpen(false)
            }
        }
    }

    useEffect(() => { // initializing, valDown

        gsap.set("#tongueGroup", {
            scaleY: 0,
            y: 10
        })
        window.addEventListener("resize", () => {
            containerSize.current = document.getElementById("container").getBoundingClientRect().height
            console.log("resize noted", containerSize.current)
        })
        mouthButton.current.addEventListener("click", mouthOpenClose)

        function valDownHandler() {
            if (mouthOnRef.current === false) {
                kkht.valChange(["pink", "blue"], "down", maxArousalRef.current, setArousal, sensitivityRef.current)
            }
        }
        const interval = setInterval(valDownHandler, 500);

        return () => {
            window.removeEventListener("resize", () => {
                containerSize.current = document.getElementById("container").getBoundingClientRect().height
            })
            mouthButton.current.removeEventListener("click", mouthOpenClose)
            clearInterval(interval);
        }
    }, []);

    useEffect(() => {
        let intervalId = null;

        function trySetupDraggables() {
            const container = document.getElementById("container");
            const dickHandPartsEls = dickHandParts.current;
            const headHandEl = document.getElementById("headHand");

            // Check if all required elements exist
            if (
                container &&
                dickHandPartsEls &&
                dickHandPartsEls.length > 0 &&
                headHandEl
            ) {
                // Setup draggables
                const dickDrags = Draggable.create(dickHandPartsEls, {
                    trigger: "#dickHandGrab",
                    zIndexBoost: false,
                    type: "y",
                    cursor: "ns-resize",
                    bounds: {
                        minY: containerSize.current * -0.07,
                        maxY: containerSize.current * 0.07,
                    },
                    inertia: {
                        y: {
                            end: 0,
                        }
                    },
                    edgeResistance: 0.9,
                    onDrag: function () {
                        container.style.cursor = "ns-resize"
                        if (this.getDirection("start") === ("up" || "down")) {
                            kkht.valChange("blue", "up", maxArousalRef.current, setArousal, sensitivityRef.current)
                        }
                    },
                    onDragEnd: () => {
                        container.style.cursor = "auto"
                    }
                });

                const headDrags = Draggable.create("#headHand", {
                    cursor: "ns-resize",
                    onDragStart: function () {
                        setHeadDragging(true);
                    },
                    onDrag: function () {

                        kkht.valChange(["blue", "pink"], "up", maxArousalRef.current, setArousal, sensitivityRef.current)
                        container.style.cursor = "ns-resize"
                        kkht.updateFollowers({
                            itemsArray: [headParts.current, body.current],
                            x: this.x,
                            y: this.y,
                            ease: "back",
                            init: 0.25,
                            increase: 0.2
                        });
                        const dickRect = document.getElementById("dickGroup").getBoundingClientRect();
                        const headRect = document.getElementById("faceTop").getBoundingClientRect();
                        const percent = kkht.getOverlapPercent(headRect, dickRect, 50);

                        console.log(percent)

                        const args = {
                            percent: percent,
                            startApproach: 0.001,
                            startOn: 0.13,
                            setApproach,
                            setMouthOn,
                            affectedIDs: ["blue", "pink"],
                            lick: {
                                tongue: "#tongue",
                                tip: "#dickTip",
                                percent: "20%"
                            },
                            maxArousal: maxArousalRef.current,
                            setArousal,
                            sensitivity: sensitivityRef.current,
                            direction: this.getDirection("start")
                        };

                        this.dragResistance = kkht.isApproachOrOn(args)

                        if (depthMethodRef.current === "Training") {
                            this.applyBounds({
                                minX: containerSize.current * -0.0055,
                                maxX: containerSize.current * 0.0055,
                                minY: containerSize.current * -0.07,
                                maxY: containerSize.current * kkht.trainingMultiplier(
                                    {
                                        id: "#headHand",
                                        y: this.y,
                                        maxY: (this.maxY || containerSize.current * 0.1),
                                        initial: 0.2,
                                        end: 0.4,
                                        hits: Math.round(5 - sensitivityRef.current.pink),
                                        increaseBy: 0.001
                                    })
                            });
                        } else {
                            kkht.trainingMultiplier(
                                {
                                    id: "#headHand",
                                    reset: true
                                })
                            this.applyBounds({
                                minX: containerSize.current * -0.0055,
                                maxX: containerSize.current * 0.0055,
                                minY: containerSize.current * -0.07,
                                maxY: containerSize.current * 0.4
                            }
                            )
                        }
                    },
                    dragResistance: 0,
                    zIndexBoost: false,
                    onDragEnd: function () {
                        container.style.cursor = "auto"
                        setHeadDragging(false);
                    }
                });

                headDraggable.current = headDrags[0]
                dickHandDraggable.current = dickDrags[0]
                console.log(dickDrags)

                // Clear the interval so setup only runs once
                clearInterval(intervalId);

                // Cleanup function for draggables
                return () => {
                    if (headDraggable.current) headDraggable.current.kill()
                    if (dickHandDraggable.current) dickHandDraggable.current.kill()
                };
            }
        }

        // Start polling every 50ms
        intervalId = setInterval(trySetupDraggables, 50);

        // Cleanup polling interval on unmount
        return () => {
            clearInterval(intervalId);
            // Also cleanup draggables if they were created
            if (headDraggable.current) headDraggable.current.kill()
            if (dickHandDraggable.current) dickHandDraggable.current.kill()
        };
    }, []);

    useEffect(() => { // Nut function
        if (arousal.blue >= maxArousal.blue) {

            kkht.valChange("pink", "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousal.pink / 10 * sensitivityRef.current.pink))

            if (mouthOn) {
                // cum down his throat
                kkht.callFastMorph({
                    ...morphArgsTemplate,
                    fromState: "Open",
                    toState: "Wide",
                    animations: [{
                        name: kkht.callEyeFlutter,
                        args: { fromState: "Open", toState: "Wide" }
                    }, {
                        name: kkht.pantingAnimation,
                        args: {
                            ...morphArgsTemplate,
                            containerSize: containerSize.current,
                            toMove: [body.current, headParts.current],
                            mouthGroup: mouthGroup.current,
                            bodyMain: body.current,
                            tongueGroup: tongueGroup.current,
                            tongueDrool: tongueDrool.current,
                            tearLeft: tearLeft.current,
                            tearRight: tearRight.current,
                            setMouthOn: setMouthOn,
                            setMouthOpen: setMouthOpen,
                            setApproach: setApproach,
                            draggable: headDraggable.current,
                            setHoldMouthOpen: setHoldMouthOpen
                        }
                    }]
                })
            }
            if (!mouthOn) {

                gsap.to([".eyeCenter"], {
                    x: 0,
                    y: 0,
                    duration: 0.2
                })

                kkht.browRaise({
                    browLeft: browLeft.current,
                    browRight: browRight.current,
                    duration: 1.5
                })
                kkht.callState(setInterruptUI, 1.5)
                kkht.resetDraggable(dickHandDraggable.current, dickHandParts.current)

                if (mouthOpen) {
                    // cum on his tongue
                    kkht.callCumshot({
                        cumType: "tongueCum"
                    })
                    setIsTongueCum(true)

                } else {
                    // cum on his face
                    kkht.callCumshot({
                        cumType: "faceCum",
                        untilEmpty: true,
                        origin: "top",
                        shotDuration: 0.5,
                        moveDuration: 2.5,
                        faceWipeArgs: {
                            elements: [chain.current, armRight.current, armLeft.current],
                            cloth: cloth.current,
                            animationSetter: setInterruptUI
                        }
                    })
                }
            }

            setArousal(prev => ({ ...prev, blue: 0 }))
        }
    }, [arousal.blue, mouthOn, mouthOpenRef])

    useEffect(() => { // Elements that change based on arousal.pink
        const arousalRatio = arousal.pink / maxArousal.pink

        if (depthMethodRef.current === "Arousal") {
            const draggable = headDraggable.current
            if (container && draggable) {
                const bounds = containerSize.current * (0.2 + (arousalRatio * 0.2));
                draggable.applyBounds({
                    minX: containerSize.current * -0.0055,
                    maxX: containerSize.current * 0.0055,
                    minY: containerSize.current * -0.07,
                    maxY: bounds
                });
            }
        }
        if (!fastMorphRef.current) {
            kkht.callSlowMorph({
                ...morphArgsTemplate,
                fromState: "Open",
                toState: "Half",
                progress: (arousalRatio / 2)
            })
        }

        // arousalTier setter
        (arousalRatio > 0.8) ? setArousalTier(5)
            : (arousalRatio > 0.6) ? setArousalTier(4)
                : (arousalRatio > 0.4) ? setArousalTier(3)
                    : (arousalRatio > 0.2) ? setArousalTier(2)
                        : setArousalTier(1)

        const blushOpacity = gsap.timeline({ paused: true })
            .fromTo(".blush",
                { opacity: 0, transformOrigin: "center" },
                { opacity: 1, duration: 1 })

        const pupilSize = gsap.timeline({ paused: true })
            .fromTo(".pupil",
                { scale: 0.8, transformOrigin: "center" },
                { scale: 1.2, duration: 1 })

        pupilSize.progress(arousalRatio)
        blushOpacity.progress(arousalRatio)

        return () => {
        };
    }, [arousal.pink, maxArousal.pink, depthMethod]);

    useEffect(() => { // Elements dependent on arousalTier (eye movement, breath)

        hesitation.current.ms = ((5 - arousalTier) * 250)
        hesitation.current.sec = ((5 - arousalTier) / 4)
        console.log("hesitation: ", hesitation.current)

        let cleanup;

        console.log("arousalTier: ", arousalTier)

        if (!fastMorph && !interruptUI) {
            if ((arousalTier === 1) || (arousalTier === 2)) {
                cleanup = kkht.eyeMovement({
                    moveEls: [".eyeCenter"],
                    type: "random",
                    bounds: {
                        maxX: 30,
                        maxY: 15,
                        minX: -30,
                        minY: 0
                    }
                });

                document.documentElement.style.setProperty("--breathTorsoScale", "102%");
            } else if ((arousalTier === 3) || (arousalTier === 4)) {
                cleanup = kkht.eyeMovement({
                    moveEls: [".eyeCenter"],
                    type: "toFro",
                    bounds: {
                        maxX: 30,
                        maxY: 10,
                        minX: -30,
                        minY: -17
                    }
                });
                document.documentElement.style.setProperty("--breathTorsoScale", "103%");
            } else if (arousalTier === 5) {
                gsap.to([".eyeCenter"], {
                    x: 0,
                    y: -17,
                    duration: 1
                })
                document.documentElement.style.setProperty("--breathTorsoScale", "104%");
            }
        }

        var prevDuration = document.documentElement.style.getPropertyValue("--animation-duration");

        var breathCycleDuration = (
            (fastMorph || interruptBreath) ? 0
                : (arousalTier === 5) ? 1
                    : (arousalTier === 4) ? 0.875
                        : (arousalTier === 3) ? 0.75
                            : (arousalTier === 2) ? 0.625
                                : (arousalTier === 1) ? 0.5
                                    : null
        );
        if (prevDuration !== (breathCycleDuration + "s")) {
            document.documentElement.style.setProperty("--animation-duration", breathCycleDuration + "s");
        }

        return () => {
            if (cleanup) cleanup();

        };
    }, [arousalTier, fastMorph, interruptBreath, interruptUI])
    /*
        useEffect(() => { // Sweat
    
            let running = true;
    
            sweatIntervalRef.current = setInterval(() => kkht.randomizeArray({
                idString: "sweat",
                animation: kkht.drip,
                areaHeight: 322
            }), 10000);
    
            // Get all sweat elements
            const sweatsParent = document.getElementById(`sweatGroup`)
            const sweats = [...sweatsParent.children]
            // Get all .eyeCenter elements
            const eyes = gsap.utils.toArray('.eyeCenter');
    
            kkht.hideOnOverlap({
                running: running,
                element1: sweats,
                element2: eyes
            })
    
            return () => {
                running = false;
    
                if (sweatIntervalRef.current) {
                    clearInterval(sweatIntervalRef.current);
                    sweatIntervalRef.current = null;
                }
            };
        }, []);
    */
    useEffect(() => {
        let intervalId = null;

        function tryEnableDisableDraggables() {
            // Check for required DOM elements and draggables
            const container = document.getElementById("container");
            const dickHandPartsEls = dickHandParts.current;
            const dickHandDraggableInstance = dickHandDraggable.current;
            const headDraggableInstance = headDraggable.current;

            if (
                container &&
                dickHandPartsEls &&
                dickHandPartsEls.length > 0 &&
                dickHandDraggableInstance &&
                headDraggableInstance
            ) {
                // Enable/disable logic
                if (mouthOn || fastMorph || interruptUI || headDragging) {
                    dickHandPartsEls.forEach((el) => {
                        el.style.display = "none"
                    })
                    dickHandDraggableInstance.disable()
                } else {
                    dickHandPartsEls.forEach((el) => {
                        el.style.display = "block"
                    })
                    dickHandDraggableInstance.enable()
                }

                if (fastMorph || interruptUI) {
                    headDraggableInstance.disable()
                    headHand.current.style.display = "none"

                } else {
                    headDraggableInstance.enable()
                    headHand.current.style.display = "block"
                }

                if (fastMorph || interruptUI) {
                    container.classList.add("customCursor")
                } else container.classList.remove("customCursor")

                // Clear interval after setup
                clearInterval(intervalId);
            }
        }

        // Start polling every 50ms
        intervalId = setInterval(tryEnableDisableDraggables, 50);

        // Cleanup polling interval on unmount
        return () => {
            clearInterval(intervalId);
        };
    }, [mouthOn, approach, fastMorph, interruptUI, headDragging]);


    useEffect(() => { // Drool, clear tongueCum when mouthOn
        if (mouthOn) {
            droolIntervalRef.current = setInterval(() => kkht.randomizeArray({
                idString: "dickDrool",
                animation: kkht.drip,
                areaHeight: 350
            }), 5000)
        } else {
            if (droolIntervalRef.current) {
                clearInterval(droolIntervalRef.current);
                droolIntervalRef.current = null;
            }
        }

        if (mouthOn && isTongueCum) {
            kkht.clearVisible(tongueCumArray.current)
            setIsTongueCum(false)
        }

        return () => {
            if (droolIntervalRef.current) {
                clearInterval(droolIntervalRef.current);
                droolIntervalRef.current = null;
            }
        }
    }, [mouthOn, isTongueCum])

    useEffect(() => {
        let intervalId = null;

        function trySetupHoverListeners() {
            const headHandEl = headHand.current;
            const dickHandGrabEl = dickHandGrab.current;
            const dickHandPartsEls = dickHandParts.current;
            const headDraggableInstance = headDraggable.current;
            const dickHandDraggableInstance = dickHandDraggable.current;

            // Check if all required elements and draggables exist
            if (
                headHandEl &&
                dickHandGrabEl &&
                dickHandPartsEls &&
                headDraggableInstance &&
                dickHandDraggableInstance
            ) {
                let hairEnter = () => {
                    gsap.to(headHandEl, { opacity: 1, duration: 0.2 });
                };

                let hairLeave = () => {
                    if (headDraggableInstance.isDragging) {
                        return;
                    } else {
                        gsap.to(headHandEl, { opacity: 0, duration: 0.2 });
                    }
                };

                headHandEl.addEventListener("mouseenter", hairEnter);
                headHandEl.addEventListener("mouseleave", hairLeave);

                let dickEnter = () => {
                    gsap.to(dickHandPartsEls, { opacity: 1, duration: 0.2 });
                };
                let dickLeave = () => {
                    if (dickHandDraggableInstance.isDragging) {
                        return;
                    } else {
                        gsap.to(dickHandPartsEls, {
                            opacity: 0,
                            duration: 0.2
                        });
                    }
                };
                dickHandGrabEl.addEventListener("mouseenter", dickEnter);
                dickHandGrabEl.addEventListener("mouseleave", dickLeave);

                // Clear interval after setup
                clearInterval(intervalId);

                // Cleanup
                return () => {
                    hairPullHandGrabEl.removeEventListener("mouseenter", hairEnter);
                    hairPullHandGrabEl.removeEventListener("mouseleave", hairLeave);
                    dickHandGrabEl.removeEventListener("mouseenter", dickEnter);
                    dickHandGrabEl.removeEventListener("mouseleave", dickLeave);
                };
            }
        }

        // Start polling every 50ms
        intervalId = setInterval(trySetupHoverListeners, 50);

        // Cleanup polling interval on unmount
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        let intervalId = null;

        function trySetZIndex() {
            const dickSvgEl = dickSvg.current;
            if (dickSvgEl) {
                if (interruptUI) {
                    dickSvgEl.style.zIndex = 100;
                } else {
                    dickSvgEl.style.zIndex = 12;
                }
                clearInterval(intervalId);
            }
        }

        intervalId = setInterval(trySetZIndex, 50);

        return () => {
            clearInterval(intervalId);
        };
    }, [interruptUI]);


    return (
        <div>
            <div id='mainDiv' className="ready">
                <Outputs id="outputs"
                    pink={arousal.pink}
                    blue={arousal.blue}
                    maxpink={maxArousal.pink}
                    maxblue={maxArousal.blue} />

                <Setters
                    sensitivity={[
                        {
                            id: "pinkSet",
                            setter: value => {
                                setSensitivity(prev => ({ ...prev, pink: Number(value) }))
                            },
                            label: "Set pink's sensitivity.",
                            value: sensitivity.pink
                        },
                        {
                            id: "blueSet",
                            setter: value => {
                                setSensitivity(prev => ({ ...prev, blue: Number(value) }))
                            },
                            label: "Set blue's sensitivity.",
                            value: sensitivity.blue
                        }
                    ]
                    }
                    max={[
                        {
                            id: "pinkMax",
                            setter: value => {
                                setmaxArousal(prev => ({ ...prev, pink: Number(value) }))
                            },
                            label: "Pink Max: ",
                            value: maxArousal.pink
                        },
                        {
                            id: "blueMax",
                            setter: value => {
                                setmaxArousal(prev => ({ ...prev, blue: Number(value) }))
                            },
                            label: "Blue Max: ",
                            value: maxArousal.blue
                        }
                    ]}
                    modes={{
                        id: "depthModeSet",
                        modes: ["Training", "Arousal", "None"],
                        label: "Depth Mode:",
                        setter: setDepthMethod
                    }}

                />

                <div id='positioning'>
                    <Torso />
                    <Jaw />
                    <JOHand />
                    <Head />
                    <Arms />
                </div>

                <div id='ordersDiv'>
                    <button id='mouthOrderButton'>"Open your mouth."</button>
                    <button id='wipeOrderButton'>"Wipe the mess off your face."</button>
                </div>
            </div>

        </div>
    )
}

export default App
