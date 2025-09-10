import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import * as kkht from './assets/kkht/index'
import Dick from './assets/components/dick'
import HairPullHand from './assets/components/hair-pull-hand'
import Body from './assets/components/body'
import Head from './assets/components/head'
import Mouth from './assets/components/mouth'
import Arms from './assets/components/arms'
import Outputs from './assets/components/outputs'
import Tutorial from './Tutorial'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin, DrawSVGPlugin } from 'gsap/all'
import Setters from './assets/components/setters/setters'

function App() {

    const [slowMorph, setSlowMorph] = useState(false)
    const [fastMorph, setFastMorph] = useState(false)
    const slowMorphRef = useRef(slowMorph)
    const fastMorphRef = useRef(fastMorph)

    const [interruptBreath, setInterruptBreath] = useState()
    const [interruptUI, setInterruptUI] = useState()

    const [ivesModeActive, setIvesModeActive] = useState(() => localStorage.getItem("ivesModeActive") === "true")
    const [ivesMode, setIvesMode] = useState(false)

    const [isTongueCum, setIsTongueCum] = useState(false)
    const isTongueCumRef = useRef()

    const [depthMethod, setDepthMethod] = useState("Training")

    const [hairPullDragging, setHairPullDragging] = useState(false)

    const [holdMouthOpen, setHoldMouthOpen] = useState(false)
    const [mouthOpen, setMouthOpen] = useState(false)
    const [mouthOn, setMouthOn] = useState(false)
    const mouthOpenRef = useRef(mouthOpen);
    const [approach, setApproach] = useState(false)

    const [armsUp, setArmsUp] = useState(true)

    const droolIntervalRef = useRef(null);
    const sweatIntervalRef = useRef(null);

    const [arousalTier, setArousalTier] = useState(1)

    const [arousal, setArousal] = useState({
        ives: 0,
        boyd: 0,
    })
    const [maxArousal, setmaxArousal] = useState({
        ives: 2500,
        boyd: 10000,
    })
    const [sensitivity, setSensitivity] = useState({
        ives: 3.5,
        boyd: 1.5,
    })

    const armLeft = useRef()
    const armRight = useRef()
    const arousalTierRef = useRef(arousalTier)
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
    const hairPullBeads = useRef()
    const hairPullDraggable = useRef()
    const hairPullHandGrab = useRef()
    const headParts = useRef()
    const hesitation = useRef((5 - arousalTier) * 250)
    const hideHand = useRef()
    const maxArousalRef = useRef(maxArousal);
    const mouthArgs = useRef()
    const mouthButton = useRef()
    const mouthCloseBlockRef = useRef(false);
    const mouthGroup = useRef()
    const mouthOnRef = useRef()
    const sensitivityRef = useRef()
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
    gsap.defaults({ overwrite: "auto" })

    useEffect(() => {

        const container = document.getElementById("container");
        if (!container) {
            console.log("container not rendered")
            return
        }; // Prevents error if not rendered
        armLeft.current = document.getElementById("armLeft")
        armRight.current = document.getElementById("armRight")
        body.current = document.getElementById("bodyGroup");
        browLeft.current = document.getElementById("browLeft")
        browRight.current = document.getElementById("browRight")
        chain.current = document.getElementById("chain")
        cloth.current = document.getElementById("cloth")
        containerSize.current = window.innerHeight
        dickHandGrab.current = document.getElementById("dickHandGrab");
        dickHandParts.current = gsap.utils.toArray(".dickHandParts")
        dickSvg.current = document.getElementById("dick")
        hairPullBeads.current = gsap.utils.toArray(".hairPullBeads").reverse()
        hairPullHandGrab.current = document.getElementById("hairPullHandGrab");
        headParts.current = gsap.utils.toArray(".headParts");
        hideHand.current = gsap.utils.toArray(".hideHand")
        mouthButton.current = document.getElementById("mouthOrderButton")
        mouthGroup.current = document.getElementById("mouthGroup")
        tearLeft.current = document.getElementById("tearLeft")
        tearRight.current = document.getElementById("tearRight")
        tongueCumArray.current = Array.from(document.querySelectorAll(`[id^="tongueCum"]`))
        tongueDrool.current = document.getElementById("tongueDrool")
        tongueGroup.current = document.getElementById("tongueGroup")
        wipeButton.current = document.getElementById("wipeOrderButton")
        mouthArgs.current = {
            tongueCum: tongueCumArray.current,
            moveBy: containerSize.current * 0.045,
            mouthGroup: mouthGroup.current,
            tongueGroup: tongueGroup.current,
            tongueDrool: tongueDrool.current,
            mouthOpenSetter: setMouthOpen,
            arousalTier: arousalTierRef.current,
            hesitation: hesitation.current,
            duration: Math.max((hesitation.current / 1000), 0.5)
        }

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
        hesitation.current = ((5 - arousalTier) * 250)
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
        maxArousalRef.current = maxArousal;
        if (Object.values(maxArousal).includes(1999)
            || Object.values(maxArousal).includes(1847)) {
            setIvesModeActive(true)
            localStorage.setItem("ivesModeActive", "true")
        }
    }, [maxArousal]);

    useEffect(() => {
        if (ivesModeActive) {
            document.getElementById("secret").style.display = "block"
            setIvesMode(true)
        } else {
            document.getElementById("secret").style.display = "none"
            setIvesMode(false)
        }
    }, [ivesModeActive])

    useEffect(() => {
        var elements = gsap.utils.toArray(".ivesMode")
        elements.forEach((el) => {
            el.style.display = ivesMode ? "block" : "none"

        })
    }, [ivesMode])

    useEffect(() => { // Face wipe, order buttons

        if (holdMouthOpen) {
            if (isTongueCum) {
                mouthButton.current.innerText = '"Swallow for me."'
            } else mouthButton.current.innerText = '"Close your mouth."'
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

        if (armsUp) {
            wipeButton.current.innerText = '"Now now, don\'t be shy."'
            mouthButton.current.classList.add("hide")
        } else {
            wipeButton.current.innerText = '"Wipe the mess off your face."'
            wipeButton.current.classList.add("hide")
            mouthButton.current.classList.remove("hide")

            if (kkht.isFaceClean() === false) {
                wipeButton.current.classList.remove("hide");
                wipeButton.current.addEventListener("click", handleFaceWipeClick);
            } else {
                wipeButton.current.classList.add("hide");
            }
        }

        function handleFaceWipeClick() {
            wipeButton.current.classList.add("hide");
            kkht.faceWipe({
                elements: [chain.current, armRight.current, armLeft.current],
                cloth: cloth.current,
                hide: [hairPullHandGrab.current, dickHandGrab.current],
                setter: setArmsUp,
                animationSetter: setInterruptUI
            });
        }
        function lowerArmsHandler() {
            //   kkht.valChange(["boyd"], "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousal.boyd / 20 * sensitivityRef.current.boyd))
            kkht.lowerArms({
                elements: [chain.current, cloth.current, armRight.current, armLeft.current],
                container: container,
                setter: setArmsUp,
                animationSetter: setInterruptUI
            }
            )
        }

        wipeButton.current.addEventListener("click", lowerArmsHandler)
        //   document.getElementById("boydBarWrap").addEventListener("dblclick", handleFaceWipeClick);


        // Cleanup function to remove listeners
        return () => {
            wipeButton.current.removeEventListener("click", lowerArmsHandler);
            wipeButton.current.removeEventListener("click", handleFaceWipeClick);
            //   document.getElementById("boydBarWrap").removeEventListener("dblclick", handleFaceWipeClick);
        };

    }, [armsUp, mouthOn, fastMorph, interruptUI, approach, mouthOpen, isTongueCum, holdMouthOpen])

    useEffect(() => { // Elements that change based on approach state

        if (mouthCloseBlockRef.current) {
            mouthCloseBlockRef.current = false; // Reset for next time
            return;
        }
        if (holdMouthOpen) return
        if (
            !containerSize.current ||
            !mouthGroup.current ||
            !tongueGroup.current ||
            !tongueDrool.current
        ) {
            console.error("One or more refs are null!");
            console.log(containerSize.current, mouthGroup.current, tongueGroup.current, tongueDrool.current)
            return;
        }

        if (approach) {
            kkht.mouthOpenFunction({ ...mouthArgs.current, duration: 1 })
        } else if (!approach || !mouthOn || !holdMouthOpen) {
            kkht.mouthCloseFunction({ ...mouthArgs.current, duration: 1 })
        }
    }, [approach, holdMouthOpen, mouthOn])

    function mouthOpenClose() {
        if (mouthOpenRef.current === false) { // if setting mouth to open
            kkht.hesitation({
                deepBreath: (arousalTierRef.current < 4) ? "true" : "false",
                setter: [setInterruptUI, setInterruptBreath],
                duration: Math.max((hesitation.current * 2 / 1000), 0),
                playDuring: {
                    name: kkht.browRaise,
                    args: {
                        browLeft: browLeft.current,
                        browRight: browRight.current
                    }
                },
                playAfter: () => {
                    //   kkht.valChange(["boyd"], "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousalRef.current.boyd / 100 * sensitivityRef.current.boyd))
                    kkht.mouthOpenFunction({ ...mouthArgs.current, duration: Math.max((hesitation.current * 2 / 1000), 1) });
                    setHoldMouthOpen(true)
                }
            })


        } else {
            if (isTongueCumRef.current) {
                kkht.hesitation({
                    deepBreath: (arousalTierRef.current < 4) ? "true" : "false",
                    setter: [setInterruptBreath, setInterruptUI],
                    duration: Math.max((hesitation.current * 3 / 1000), 0),
                    playDuring: (arousalTierRef.current < 4) ? [{
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
                            tearLeft: tearLeft.current,

                        }
                    }] : [{
                        name: kkht.browRaise,
                        args: {
                            browLeft: browLeft.current,
                            browRight: browRight.current
                        }
                    }],
                    playAfter: () => {
                        kkht.mouthCloseFunction({ ...mouthArgs.current, duration: Math.max((hesitation.current * 3 / 1000), 1) });
                        kkht.callState(setInterruptUI, (hesitation.current !== 0) ? (hesitation.current * 3.1 / 1000) : 1.1)
                        mouthCloseBlockRef.current = true;
                        setHoldMouthOpen(false)
                        setIsTongueCum(false)
                        kkht.valChange(["boyd"], "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousalRef.current.boyd / 15))
                        if (arousalTierRef.current < 4) kkht.tearsAnimation({ secondary: true })
                    }
                })

            } else {

                kkht.mouthCloseFunction({ ...mouthArgs.current, duration: 1 });
                setHoldMouthOpen(false)
            }
        }
    }

    useEffect(() => { // initializing, valDown

        gsap.to("#waitIcon", {
            rotation: 180,
            duration: 1,
            repeat: -1
        })

        mouthButton.current.addEventListener("click", mouthOpenClose)
        gsap.set(tongueGroup.current, { scaleY: 0 });
        gsap.set(tongueDrool.current, { scaleY: 0, scaleX: 1 });
        function valDownHandler() {
            if ((mouthOnRef.current === false) && document.hasFocus()) {
                kkht.valChange(["boyd", "ives"], "down", maxArousalRef.current, setArousal, sensitivityRef.current)
            }
        }
        const interval = setInterval(valDownHandler, 500);

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    useEffect(() => { // Sets up draggables


        Draggable.create(".dickHandParts", {
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
                gsap.to(dickHandParts.current, { opacity: 1, duration: 0.2 });
                gsap.to("#hairPullHand", { opacity: 0, duration: 0.2 });
                kkht.valChange("ives", "up", maxArousalRef.current, setArousal, sensitivityRef.current)
            },
            onDragEnd: function () {
                setHairPullDragging(false);
                // Check if still hovering

                gsap.to(dickHandParts.current, { opacity: 0.2, duration: 0.2 });
                gsap.to("#hairPullHand", { opacity: 0.2, duration: 0.2 });
            }
        })

        Draggable.create("#hairPullHand", {
            trigger: "#hairPullHandGrab",
            cursor: "ns-resize",
            edgeResistance: 0.9,
            onDragStart: function () {
                setHairPullDragging(true);
            },
            onDrag: function () {

                gsap.to(hideHand.current, { opacity: 1, duration: 0.2 });
                kkht.updateFollowers({
                    itemsArray: [headParts.current, body.current],
                    x: this.x,
                    y: this.y,
                    ease: "back",
                    init: 0.25,
                    increase: 0.2
                })
                kkht.updateFollowers({
                    itemsArray: hairPullBeads.current,
                    x: this.x,
                    y: this.y,
                    ease: "back",
                    init: 0.1,
                    increase: 0.05
                })
                // THESE HAVE TO BE IN onDrag!!! The values aren't current otherwise
                const dickRect = document.getElementById("dickArea").getBoundingClientRect();
                const headRect = document.getElementById("faceArea").getBoundingClientRect();
                const percent = kkht.getOverlapPercent(headRect, dickRect, 50); // percent of headArea overlapped by dickArea
                const direction = this.getDirection("velocity")

                //    var resistance

                const args = {
                    percent: percent,
                    startApproach: 0.2,
                    startOn: 0.325,
                    setApproach,
                    setMouthOn,
                    affectedIDs: ["ives", "boyd"],
                    lick: {
                        tongue: "#tongue",
                        tip: "#dickTip",
                        percent: "20%"
                    },
                    maxArousal: maxArousalRef.current,
                    setArousal,
                    sensitivity: sensitivityRef.current,
                    direction
                };
                console.log(percent)
                this.dragResistance = kkht.isApproachOrOn(args)

                if (depthMethodRef.current === "Training") {
                    this.applyBounds({
                        minX: containerSize.current * -0.0055,
                        maxX: containerSize.current * 0.0055,
                        minY: containerSize.current * -0.07,
                        maxY: containerSize.current * kkht.trainingMultiplier(
                            {
                                id: "#hairPullHand",
                                y: this.y,
                                maxY: (this.maxY || containerSize.current * 0.1),
                                initial: 0.125,
                                end: 0.225,
                                hits: 5,
                                increaseBy: 0.001
                            })
                    });
                } else {
                    kkht.trainingMultiplier(
                        {
                            id: "#hairPullHand",
                            reset: true
                        })
                    this.applyBounds({
                        minX: containerSize.current * -0.0055,
                        maxX: containerSize.current * 0.0055,
                        minY: containerSize.current * -0.07,
                        maxY: containerSize.current * 0.225
                    }
                    )
                }
            },
            zIndexBoost: false,
            onDragEnd: function () {
                const dickRect = document.getElementById("dickArea").getBoundingClientRect();
                const headRect = document.getElementById("faceArea").getBoundingClientRect();
                const percent = kkht.getOverlapPercent(headRect, dickRect, 50); // percent of headArea overlapped by dickArea

                //    var resistance

                const args = {
                    percent: percent,
                    startApproach: 0.2,
                    startOn: 0.3,
                    setApproach,
                    setMouthOn,
                    affectedIDs: ["ives", "boyd"],
                    lick: {
                        tongue: "#tongue",
                        tip: "#dickTip",
                        percent: "20%"
                    },
                    maxArousal: maxArousalRef.current,
                    setArousal,
                    sensitivity: sensitivityRef.current
                };

                kkht.isApproachOrOn(args)

                setHairPullDragging(false);

                gsap.to(hideHand.current, { opacity: 0.2, duration: 0.2 });
            }

        });
        hairPullDraggable.current = Draggable.get("#hairPullHand")
        dickHandDraggable.current = Draggable.get(dickHandParts.current)

    }, [depthMethod])

    useEffect(() => { // Nut function
        if (arousal.ives >= maxArousal.ives) {

            kkht.valChange("boyd", "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousal.boyd / 20))

            if (mouthOn) {
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
                            draggable: hairPullDraggable.current,
                            alsoMove: hairPullBeads.current,
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

                kkht.callFastMorph({
                    ...morphArgsTemplate,
                    fromState: "Open",
                    toState: "Wide"
                })

                //         kkht.callState(setInterruptUI, 1.5)
                kkht.resetDraggable(dickHandDraggable.current, dickHandParts.current)
                if (mouthOpen) {
                    kkht.callCumshot({
                        cumType: "tongueCum",
                        setInterruptUI
                    })
                    setIsTongueCum(true)
                    setHoldMouthOpen(true)
                } else {
                    kkht.callCumshot({
                        cumType: "faceCum",
                        untilEmpty: true,
                        origin: "top",
                        shotDuration: 0.5,
                        moveDuration: 2.5,
                        setInterruptUI,
                        faceWipeArgs: {
                            elements: [chain.current, armRight.current, armLeft.current],
                            cloth: cloth.current,
                            setter: setArmsUp,
                            animationSetter: setInterruptUI
                        }
                    })
                }
            }

            setArousal(prev => ({ ...prev, ives: 0 }))
        }
    }, [arousal.ives, mouthOn, mouthOpenRef])

    useEffect(() => { // Elements that change based on arousal.boyd
        const arousalRatio = arousal.boyd / maxArousal.boyd

        if (depthMethodRef.current === "Arousal") {
            const draggable = Draggable.get("#hairPullHand");
            if (container && draggable) {
                const bounds = containerSize.current * (0.125 + (arousalRatio * 0.1));
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

        const blush = document.getElementById("blush")
        kkht.renderProgress(blush, "opacity", arousal.boyd, maxArousal.boyd)

        const pupilSize = gsap.timeline({ paused: true })
            .fromTo(".pupil",
                { scale: 0.8, transformOrigin: "center" },
                { scale: 1.4, duration: 1 })

        pupilSize.progress(arousalRatio)

        return () => {
        };
    }, [arousal.boyd, depthMethod]);

    useEffect(() => { // Elements dependent on arousalTier (eye movement, breath)
        const eyeCenterRight = document.getElementById("eyeCenterRight");
        const eyeCenterLeft = document.getElementById("eyeCenterLeft");
        let cleanup;

        if (!fastMorphRef.current) {
            if (arousalTier === 1 || arousalTier === 2) {
                cleanup = kkht.eyeMovement({
                    moveEls: [eyeCenterRight, eyeCenterLeft],
                    type: "random",
                    bounds: {
                        maxX: 30,
                        maxY: 20,
                        minX: -30,
                        minY: 5
                    }
                });
            } else if (arousalTier === 3 || arousalTier === 4) {
                cleanup = kkht.eyeMovement({
                    moveEls: [eyeCenterRight, eyeCenterLeft],
                    type: "toFro",
                    bounds: {
                        maxX: 30,
                        maxY: 15,
                        minX: -30,
                        minY: -5
                    }
                });
            } else if (arousalTier === 5) {
                gsap.to([eyeCenterRight, eyeCenterLeft], {
                    x: 0,
                    y: 0,
                    duration: 1
                })
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
    }, [arousalTier, fastMorph, interruptBreath])

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

    useEffect(() => { // Enable/disable draggables

        if (mouthOn || fastMorph || interruptUI || armsUp || hairPullDragging) {
            dickHandParts.current.forEach((el) => {
                el.style.display = "none"
            })
            dickHandDraggable.current.disable()
        } else {
            dickHandParts.current.forEach((el) => {
                el.style.display = "block"
            })
            dickHandDraggable.current.enable()
        }

        if (fastMorph || interruptUI || armsUp) {
            hairPullDraggable.current.disable()
            hideHand.current.forEach((el) => {
                el.style.display = "none"
            })
        } else {
            hairPullDraggable.current.enable()
            hideHand.current.forEach((el) => {
                el.style.display = "block"
            })
        }
        const waitIcon = document.getElementById("waitIcon")

        if (fastMorph || interruptUI) {
            gsap.to(waitIcon, {
                opacity: 1, duration: 0.2
            })

        } else gsap.to(waitIcon, { opacity: 0, duration: 0.2 })

    }, [mouthOn, approach, fastMorph, interruptUI, armsUp, hairPullDragging])


    useEffect(() => { // Drool, clear tongueCum when mouthOn
        if (mouthOn) {
            //   gsap.set(tongueDrool.current, { opacity: 0 })
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

    useEffect(() => { // Sets up hover listeners for draggables

        let hairEnter, hairLeave, dickEnter, dickLeave;

        hairEnter = () => {
            gsap.to(hideHand.current, { opacity: 1, duration: 0.2 });
        };

        hairLeave = () => {

            gsap.to(hideHand.current, { opacity: 0.2, duration: 0.2 });

        };
        hairPullHandGrab.current.addEventListener("touchstart", hairEnter);
        hairPullHandGrab.current.addEventListener("touchend", hairLeave);

        dickEnter = () => {
            gsap.to(dickHandParts.current, { opacity: 1, duration: 0.2 });
        };
        dickLeave = () => {

            gsap.to(dickHandParts.current, {
                opacity: 0.2,
                duration: 0.2
            });

        };
        dickHandGrab.current.addEventListener("touchstart", dickEnter);
        dickHandGrab.current.addEventListener("touchend", dickLeave);

        // Cleanup
        return () => {
            if (hairPullHandGrab.current) {
                hairPullHandGrab.current.removeEventListener("touchstart", hairEnter);
                hairPullHandGrab.current.removeEventListener("touchend", hairLeave);
            }
            if (dickHandGrab.current) {
                dickHandGrab.current.removeEventListener("touchstart", dickEnter);
                dickHandGrab.current.removeEventListener("touchend", dickLeave);
            }

        };

    }, []);

    useEffect(() => {
        if (armsUp || interruptUI) {
            dickSvg.current.style.zIndex = 100
        } else dickSvg.current.style.zIndex = 12
    }, [armsUp, interruptUI])


    return (
        <div id='mobileWrapDiv'>
            <div id='mainDiv' className="ready">

                <Outputs id="outputs"
                    boyd={arousal.boyd}
                    ives={arousal.ives}
                    maxBoyd={maxArousal.boyd}
                    maxIves={maxArousal.ives} />

                <svg
                    id="waitIcon"
                    fill="#fff"
                    version="1.1"
                    viewBox="0 -960 660 820"
                >
                    <path
                        id="path1"
                        fill="#fff"
                        stroke="#000"
                        strokeDasharray="none"
                        strokeWidth="20"
                        d="M170-230h320v-120q0-66-47-113t-113-47-113 47-47 113zm160-360q66 0 113-47t47-113v-120H170v120q0 66 47 113t113 47zM10-150v-80h80v-120q0-61 28.5-114.5T198-550q-51-32-79.5-85.5T90-750v-120H10v-80h640v80h-80v120q0 61-28.5 114.5T462-550q51 32 79.5 85.5T570-350v120h80v80zm320-80zm0-640z"
                    ></path>
                </svg>

                <div id='positioning'>
                    <Body />
                    <Mouth />
                    <Dick />
                    <Head />
                    <Arms />
                    <HairPullHand />
                </div>

                <div className='tutorial' id='tutorialBox'>
                    <div id='tutorialLine'></div>
                    <p className='right' id='tutorialArrow'>► </p>

                </div>

            </div>
            <div id='mobile'>
                <Setters
                    sensitivity={[
                        {
                            id: "boydSet",
                            setter: value => {
                                setSensitivity(prev => ({ ...prev, boyd: Number(value) }))
                            },
                            label: !ivesMode ? "Set Blue's sensitivity." : "Set Boyd's sensitivity.",
                            value: sensitivity.boyd
                        },
                        {
                            id: "ivesSet",
                            setter: value => {
                                setSensitivity(prev => ({ ...prev, ives: Number(value) }))
                            },
                            label: !ivesMode ? "Set Red's sensitivity." : "Set Ives' sensitivity.",
                            value: sensitivity.ives
                        }
                    ]
                    }
                    max={[
                        {
                            id: "boydMax",
                            setter: value => {
                                setmaxArousal(prev => ({ ...prev, boyd: Number(value) }))
                            },
                            label: !ivesMode ? "Blue Max: " : "Boyd Max: ",
                            value: maxArousal.boyd
                        },
                        {
                            id: "ivesMax",
                            setter: value => {
                                setmaxArousal(prev => ({ ...prev, ives: Number(value) }))
                            },
                            label: !ivesMode ? "Red Max: " : "Ives Max: ",
                            value: maxArousal.ives
                        }
                    ]}
                    modes={{
                        id: "depthModeSet",
                        modes: ["Training", "Arousal", "None"],
                        label: "Depth Mode:",
                        setter: setDepthMethod
                    }}
                    secret={
                        {
                            id: "ivesModeSwitch",
                            setter: setIvesMode,
                            label: "Ravenous",
                            value: ivesMode
                        }
                    }
                />
                <div id='ordersDiv'>
                    <button id='mouthOrderButton'>"Open your mouth."</button>
                    <button id='wipeOrderButton'>"Wipe the mess off your face."</button>
                </div>
                <Tutorial ivesMode={ivesModeActive} />
                <div id='tutorialButton'>
                    <p id='tutorialButtonText'>?</p>
                </div>
            </div>


        </div>
    )
}

export default App
