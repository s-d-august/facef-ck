import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import * as kkht from './assets/kkht/index'
import buttons from './assets/components/handler-functions/buttons-handler'
import drags from './assets/components/handler-functions/draggables-handler'
import Dick from './assets/components/dick'
import HairPullHand from './assets/components/hair-pull-hand'
import Body from './assets/components/body'
import Head from './assets/components/head'
import Mouth from './assets/components/mouth'
import Arms from './assets/components/arms'
import Outputs from './assets/components/outputs'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin, DrawSVGPlugin } from 'gsap/all'
import Setters from './assets/components/setters/setters'

function App() {

    const [slowMorph, setSlowMorph] = useState(false)
    const [fastMorph, setFastMorph] = useState(false)
    const slowMorphRef = useRef(slowMorph)
    const fastMorphRef = useRef(fastMorph)

    const [interruptUI, setInterruptUI] = useState(false)
    const [interruptBreath, setInterruptBreath] = useState(false)

    const [ivesModeActive, setIvesModeActive] = useState(() => localStorage.getItem("ivesModeActive") === "true")
    const [ivesMode, setIvesMode] = useState(false)

    const [cumOnTongue, setCumOnTongue] = useState(false)
    const cumOnTongueRef = useRef()

    const [cumOnFace, setCumOnFace] = useState(false)
    const cumOnFaceRef = useRef()

    const [depthMethod, setDepthMethod] = useState("Training")

    const [hairPullDragging, setHairPullDragging] = useState(false)

    const [holdMouthOpen, setHoldMouthOpen] = useState(false)
    const [mouthOpen, setMouthOpen] = useState(false)
    const [mouthOn, setMouthOn] = useState(false)

    const [approach, setApproach] = useState(false)

    const [armsUp, setArmsUp] = useState(true)

    const [arousalTier, setArousalTier] = useState(1)

    const [arousal, setArousal] = useState({
        ives: 0,
        boyd: 0,
    })
    const [maxArousal, setmaxArousal] = useState({
        ives: 1500,
        boyd: 10000,
    })
    const [sensitivity, setSensitivity] = useState({
        ives: 5,
        boyd: 2.5,
    })

    const [buttonStates, setButtonStates] = useState({
        armsButton: "active",
        mouthButton: "hide"
    });

    const approachRef = useRef()
    const armLeft = useRef()
    const armRight = useRef()
    const armsButton = useRef()
    const armsSvg = useRef()
    const armsUpRef = useRef()
    const arousalTierRef = useRef()
    const body = useRef()
    const browLeft = useRef()
    const browRight = useRef()
    const buttonStatesRef = useRef()
    const chain = useRef()
    const cloth = useRef()
    const containerSize = useRef()
    const depthMethodRef = useRef()
    const dickHandDraggable = useRef("test")
    const dickHandGrab = useRef()
    const dickHandParts = useRef()
    const dickSvg = useRef()
    const droolIntervalRef = useRef(null);
    const eyeCenterLeft = useRef()
    const eyeCenterRight = useRef()
    const hairPullBeads = useRef()
    const hairPullDraggable = useRef()
    const hairPullHandGrab = useRef()
    const headParts = useRef()
    const hesitation = useRef({ sec: 0, ms: 0 })
    const hideHand = useRef()
    const holdMouthOpenRef = useRef()
    const maxArousalRef = useRef(maxArousal);
    const mouthArgs = useRef()
    const mouthButton = useRef()
    const mouthGroup = useRef()
    const mouthOnRef = useRef()
    const mouthOpenRef = useRef()
    const sensitivityRef = useRef()
    const sweatIntervalRef = useRef(null);
    const tearLeft = useRef()
    const tearRight = useRef()
    const tongueCumArray = useRef()
    const tongueDrool = useRef()
    const tongueGroup = useRef()

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
        armLeft.current = document.getElementById("armLeft")
        armRight.current = document.getElementById("armRight")
        armsButton.current = document.getElementById("wipeOrderButton")
        armsSvg.current = document.getElementById("armsSvg")
        body.current = document.getElementById("bodyGroup");
        browLeft.current = document.getElementById("browLeftGroup")
        browRight.current = document.getElementById("browRightGroup")
        chain.current = document.getElementById("chain")
        cloth.current = document.getElementById("cloth")
        containerSize.current = document.getElementById("container").getBoundingClientRect().height
        dickHandGrab.current = document.getElementById("dickHandGrab");
        dickHandParts.current = gsap.utils.toArray(".dickHandParts")
        dickSvg.current = document.getElementById("dick")
        eyeCenterLeft.current = document.getElementById("eyeCenterLeft");
        eyeCenterRight.current = document.getElementById("eyeCenterRight");
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
    }, [])


    useEffect(() => {
        approachRef.current = approach
    }, [approach])

    useEffect(() => {
        buttonStatesRef.current = buttonStates
    }, [buttonStates])

    useEffect(() => {
        cumOnTongueRef.current = cumOnTongue
    }, [cumOnTongue])

    useEffect(() => {
        cumOnFaceRef.current = cumOnFace
    }, [cumOnFace])

    useEffect(() => {
        mouthOpenRef.current = mouthOpen;
    }, [mouthOpen]);

    useEffect(() => {
        mouthOnRef.current = mouthOn;
    }, [mouthOn]);

    useEffect(() => {
        arousalTierRef.current = arousalTier;

        mouthArgs.current = {
            arousalTier: arousalTierRef.current,
            duration: (9 - arousalTierRef.current) / 4,
            mouthGroup: mouthGroup.current,
            mouthOpenSetter: setMouthOpen,
            moveBy: containerSize.current * 0.045,
            tongueCum: tongueCumArray.current,
            tongueDrool: tongueDrool.current,
            tongueGroup: tongueGroup.current
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
        holdMouthOpenRef.current = holdMouthOpen
    }, [holdMouthOpen])

    useEffect(() => {
        armsUpRef.current = armsUp
    }, [armsUp])

    useEffect(() => { // Handles unlocking Ravenous Mode
        maxArousalRef.current = maxArousal;
        if (Object.values(maxArousal).includes(1999)
            || Object.values(maxArousal).includes(1847)) {
            setIvesModeActive(true)
            localStorage.setItem("ivesModeActive", "true")
        }
    }, [maxArousal]);

    useEffect(() => { // Displays switch for Ravenous Mode if unlocked
        if (ivesModeActive) {
            document.getElementById("secret").style.display = "block"
            setIvesMode(true)
        } else {
            document.getElementById("secret").style.display = "none"
            setIvesMode(false)
        }
    }, [ivesModeActive])

    useEffect(() => { // Activates Ravenous Mode
        var elements = gsap.utils.toArray(".ivesMode")
        elements.forEach((el) => {
            el.style.display = ivesMode ? "block" : "none"
        })
    }, [ivesMode])

    useEffect(() => { // Renders button states
        buttons.buttonStatesHandler({
            armsButton: armsButton.current,
            mouthButton: mouthButton.current,
            buttonStates: buttonStates
        })
    }, [buttonStates])
    /*
        useEffect(() => { // Handles when buttons become inactive
            buttons.buttonsInactive({
                approach: approachRef.current,
                buttonStates: buttonStatesRef.current,
                mouthOn: mouthOnRef.current,
                setButtonStates
            })
        }, [approach, mouthOn])
    */
    useEffect(() => { // Handles states for armsButton
        console.log("cumOnFace: ", cumOnFace, cumOnFaceRef.current)
        buttons.armsButtonHandler({
            approach: approachRef.current,
            armsButton: armsButton.current,
            armsSvg: armsSvg.current,
            armsUp: armsUpRef.current,
            buttonStates: buttonStatesRef.current,
            cloth: cloth.current,
            cumOnFace: cumOnFaceRef.current,
            mouthOn: mouthOnRef.current,
            setArmsUp,
            setButtonStates,
            setCumOnFace,
            setInterruptUI
        })
    }, [armsUp, cumOnFace, mouthOn, buttonStates])

    useEffect(() => { // Handles states for mouthButton
        buttons.mouthButtonHandler({
            armsUp: armsUpRef.current,
            cumOnTongue: cumOnTongueRef.current,
            holdMouthOpen: holdMouthOpenRef.current,
            mouthArgs: mouthArgs.current,
            mouthButton: mouthButton.current,
            mouthOpen: mouthOpenRef.current,
            setButtonStates
        })
    }, [armsUp, cumOnTongue, holdMouthOpen, mouthArgs, mouthOpen, mouthOn])

    useEffect(() => { // Sets up listener for mouthButton
        function openCloseListener() {
            buttons.openCloseHandler({
                arousalTier: arousalTierRef.current,
                browLeft: browLeft.current,
                browRight: browRight.current,
                cumOnTongue: cumOnTongueRef.current,
                hesitation: hesitation.current.sec,
                holdMouthOpen: holdMouthOpenRef.current,
                maxArousal: maxArousalRef.current,
                mouthArgs: mouthArgs.current,
                sensitivity: sensitivityRef.current,
                setArousal,
                setHoldMouthOpen,
                setInterruptBreath,
                setInterruptUI,
            })
        }
        mouthButton.current.addEventListener("click", openCloseListener)
        return () => mouthButton.current.removeEventListener("click", openCloseListener)
    }, [arousalTier, cumOnTongue, hesitation, holdMouthOpen, maxArousal, mouthArgs, sensitivity])

    useEffect(() => { // Mouth open/shut when approach
        console.log("holdMouthOpen: ", holdMouthOpen)
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

    useEffect(() => { // handles valDown and resize

        window.addEventListener("resize", () => {
            containerSize.current = document.getElementById("container").getBoundingClientRect().height
            console.log("resize noted", containerSize.current)
        })

        function valDownHandler() {
            if (mouthOnRef.current === false) {
                kkht.valChange(["boyd", "ives"], "down", maxArousalRef.current, setArousal, sensitivityRef.current)
            }
        }
        const interval = setInterval(valDownHandler, 500);

        return () => {
            window.removeEventListener("resize", () => {
                containerSize.current = document.getElementById("container").getBoundingClientRect().height
            })
            clearInterval(interval);
        }
    }, []);

    useEffect(() => { // Sets up dickHandDraggable
        dickHandDraggable.current = drags.setUpJODrag({
            dickHandParts: dickHandParts.current,
            container,
            containerSize: containerSize.current,
            maxArousal: maxArousalRef.current,
            setArousal,
            sensitivity: sensitivityRef.current
        })

    }, [sensitivity, containerSize])

    useEffect(() => { // Sets up hairPullDraggable

        hairPullDraggable.current = drags.setUpHairPullDrag({
            body: body.current,
            container: container,
            containerSize: containerSize.current,
            depthMethod: depthMethodRef.current,
            hairPullBeads: hairPullBeads.current,
            headParts: headParts.current,
            maxArousal: maxArousalRef.current,
            sensitivity: sensitivityRef.current,
            setApproach,
            setArousal,
            setHairPullDragging,
            setMouthOn
        })

    }, [depthMethod])

    useEffect(() => { // Nut function
        if (arousal.ives >= maxArousal.ives) {

            kkht.valChange("boyd", "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousal.boyd / 10 * sensitivityRef.current.boyd))

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
                kkht.callState(setInterruptUI, 1.5)
                kkht.resetDraggable(dickHandDraggable.current, dickHandParts.current)


                if (mouthOpen) {
                    // cum on his tongue
                    kkht.callCumshot({
                        cumType: "tongueCum"
                    })
                    setCumOnTongue(true)

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
                            setter: setArmsUp,
                            animationSetter: setInterruptUI
                        }
                    })
                }
            }
            setCumOnFace(true)
            setArousal(prev => ({ ...prev, ives: 0 }))
        }
    }, [arousal.ives, mouthOn, mouthOpenRef])

    useEffect(() => { // Elements that change based on arousal.boyd
        const arousalRatio = arousal.boyd / maxArousal.boyd

        if (depthMethodRef.current === "Arousal") {
            const draggable = Draggable.get("#hairPullHand");
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

        const blush = document.getElementById("blush")
        kkht.renderProgress(blush, "opacity", arousal.boyd, maxArousal.boyd)

        const pupilSize = gsap.timeline({ paused: true })
            .fromTo(".pupil",
                { scale: 0.8, transformOrigin: "center" },
                { scale: 1.2, duration: 1 })

        pupilSize.progress(arousalRatio)

        return () => {
        };
    }, [arousal.boyd, maxArousal.boyd, depthMethod]);

    useEffect(() => { // Elements dependent on arousalTier (eye movement, breath)

        hesitation.current.ms = ((5 - arousalTier) * 250)
        hesitation.current.sec = ((5 - arousalTier) / 4)
        console.log("hesitation: ", hesitation.current)

        let cleanup;

        console.log("arousalTier: ", arousalTier)

        if (!fastMorphRef.current) {
            if (arousalTier === (1 || 2)) {
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
            } else if (arousalTier === (3 || 4)) {
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
            (fastMorph) ? 0
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
    }, [arousalTier, fastMorph])

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


        } else {
            dickHandParts.current.forEach((el) => {
                el.style.display = "block"
            })

        }

        if (fastMorph || interruptUI || armsUp) {

            console.log(hairPullDraggable.current)


            hideHand.current.forEach((el) => {
                el.style.display = "none"
            })
        } else {

            hideHand.current.forEach((el) => {
                el.style.display = "block"
            })
        }

        if (fastMorph || interruptUI) {
            container.classList.add("customCursor")
        } else container.classList.remove("customCursor")
    }, [mouthOn, approach, fastMorph, interruptUI, armsUp, hairPullDragging])


    useEffect(() => { // Drool, clear tongueCum when mouthOn
        if (mouthOn) {
            droolIntervalRef.current = setInterval(() => kkht.randomizeArray({
                idString: "dickDrool",
                animation: kkht.drip,
                areaHeight: 350
            }), 15000)
        } else {
            if (droolIntervalRef.current) {
                clearInterval(droolIntervalRef.current);
                droolIntervalRef.current = null;
            }
        }

        if (mouthOn && cumOnTongue) {
            kkht.clearVisible(tongueCumArray.current)
            setCumOnTongue(false)
        }

        return () => {
            if (droolIntervalRef.current) {
                clearInterval(droolIntervalRef.current);
                droolIntervalRef.current = null;
            }
        }
    }, [mouthOn, cumOnTongue])

    useEffect(() => { // Sets up hover listeners for draggables

        let hairEnter, hairLeave, dickEnter, dickLeave;

        hairEnter = () => {
            gsap.to(hideHand.current, { opacity: 1, duration: 0.2 });
        };

        hairLeave = () => {
            if (hairPullDraggable.current.isDragging) {
                return;
            } else {
                gsap.to(hideHand.current, { opacity: 0, duration: 0.2 });
            }
        };
        hairPullHandGrab.current.addEventListener("mouseenter", hairEnter);
        hairPullHandGrab.current.addEventListener("mouseleave", hairLeave);

        dickEnter = () => {
            gsap.to(dickHandParts.current, { opacity: 1, duration: 0.2 });
        };
        dickLeave = () => {
            if (dickHandDraggable.current.isDragging) {
                return;
            } else {
                gsap.to(dickHandParts.current, {
                    opacity: 0,
                    duration: 0.2
                });
            }
        };
        dickHandGrab.current.addEventListener("mouseenter", dickEnter);
        dickHandGrab.current.addEventListener("mouseleave", dickLeave);

        // Cleanup
        return () => {
            if (hairPullHandGrab.current) {
                hairPullHandGrab.current.removeEventListener("mouseenter", hairEnter);
                hairPullHandGrab.current.removeEventListener("mouseleave", hairLeave);
            }
            if (dickHandGrab.current) {
                dickHandGrab.current.removeEventListener("mouseenter", dickEnter);
                dickHandGrab.current.removeEventListener("mouseleave", dickLeave);
            }

        };

    }, []);

    useEffect(() => {
        if (armsUp || interruptUI) {
            dickSvg.current.style.zIndex = 100
        } else dickSvg.current.style.zIndex = 12
    }, [armsUp, interruptUI])


    return (
        <div>
            <div id='mainDiv' className="ready">
                <Outputs id="outputs"
                    boyd={arousal.boyd}
                    ives={arousal.ives}
                    maxBoyd={maxArousal.boyd}
                    maxIves={maxArousal.ives} />

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

                <div id='positioning'>
                    <Body />
                    <Mouth />
                    <Dick />
                    <Head />
                    <Arms />
                    <HairPullHand />
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
