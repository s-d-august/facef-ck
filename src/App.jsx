import { useState, useEffect, useRef, useCallback, use } from 'react'
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

function App({ JP, setJP }) {

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

    const [isFaceCum, setIsFaceCum] = useState(false)

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

    const boydNutRef = useRef(false)

    const [arousalTier, setArousalTier] = useState(1)

    const [arousal, setArousal] = useState({
        ives: 0,
        boyd: 0,
    })
    const [maxArousal, setmaxArousal] = useState({
        ives: 2500,
        boyd: 3500,
    })
    const [sensitivity, setSensitivity] = useState({
        ives: 3.5,
        boyd: 1.5,
    })

    const endLineRef = useRef(0)
    const endCallRef = useRef(0)

    const [areTears, setAreTears] = useState(false)
    const [isCrying, setIsCrying] = useState(false)

    const areTearsRef = useRef()
    const armLeft = useRef()
    const armRight = useRef()
    const arousalRef = useRef(arousal);

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
    const endingButton = useRef()
    const endingUnlocked = useRef()
    const hairPullBeads = useRef()
    const hairPullDraggable = useRef()
    const hairPullHandGrab = useRef()
    const headParts = useRef()
    const hesitation = useRef((5 - arousalTier) * 250)
    const hideHand = useRef()
    const isCryingRef = (useRef(isCrying))
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
        endingButton.current = document.getElementById("boydNutButton")
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
        isCryingRef.current = isCrying
    }, [isCrying])

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
        arousalRef.current = arousal;
    }, [arousal]);

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

        if (arousal.ives > maxArousal.ives) setArousal(prev => ({ ...prev, ives: Math.min(maxArousal.ives * 0.95, maxArousal.ives - 5) }))
        if (arousal.boyd > maxArousal.boyd) setArousal(prev => ({ ...prev, boyd: Math.min(maxArousal.boyd * 0.95, maxArousal.boyd - 5) }))
    }, [maxArousal]);

    useEffect(() => {
        var secret = document.getElementById("secret")
        if (!ivesModeActive) {
            secret.style.opacity = 0
            secret.style.pointerEvents = "none"
            setIvesMode(false)
        } else {
            secret.style.opacity = 1
            secret.style.pointerEvents = "all"
            setIvesMode(true)
        }
    }, [ivesModeActive])

    useEffect(() => {
        var elements = gsap.utils.toArray(".ivesMode")
        elements.forEach((el) => {
            el.style.display = ivesMode ? "block" : "none"

        })
    }, [ivesMode])

    useEffect(() => {
        console.log("areTears: ", areTears)
        areTearsRef.current = areTears
    }, [areTears])

    useEffect(() => {
        if (areTears && arousalTier === 2 && mouthOn && isCrying) {
            console.log("tears renew")
            kkht.tearsAnimation({
                index: "",
                areTears: areTearsRef,
                setAreTears,
                type: "renew",
                arousalTier: arousalTierRef,
                isCrying: isCryingRef
            })
        } else if (areTears && arousalTier === 2 && !isCrying) {
            console.log("tears once")
            kkht.tearsAnimation({
                index: "",
                areTears: areTearsRef,
                setAreTears,
                type: "once",
                arousalTier: arousalTierRef,
                isCrying: isCryingRef
            })
        } else if (areTears && !isCrying) {
            gsap.to(["#tearLeft", "#tearRight"], {
                scale: 0,
                opacity: 0.8,
                duration: 1,
                ease: "power1.out"
            })
        }
    }, [mouthOn])

    useEffect(() => {
        if (isFaceCum || isTongueCum || mouthOn && arousalTier <= 3) {
            setIsCrying(true)
        } else setIsCrying(false)
    }, [isFaceCum, isTongueCum, mouthOn])

    useEffect(() => {
        function callTearsAnimation(typeVal) {
            kkht.tearsAnimation({
                index: "",
                areTears: areTearsRef,
                setAreTears,
                type: typeVal,
                arousalTier: arousalTierRef,
                isCrying: isCryingRef
            })
        }
        console.log("isCrying: ", isCrying)
        if (isCrying && arousalTier <= 3) {
            var type =
                (arousalTier === 1) ? "constant"
                    : (arousalTier === 2) ? "renew"
                        : "inEyes"

            console.log("type: ", type)
            callTearsAnimation(type)

        }

        if (!isCrying && areTears) {
            if (arousalTier <= 2) {
                callTearsAnimation("once")
            } else if (arousalTier >= 3) {
                gsap.to(["#tearRight", "#tearLeft"], {
                    scale: 0,
                    opacity: 0.8,
                    duration: 1,
                    y: 0,
                    ease: "power1.out"
                })
            }
        }
    }, [arousalTier, isCrying])


    useEffect(() => { // Face wipe, order buttons

        if (holdMouthOpen) {
            if (isTongueCum) {
                mouthButton.current.innerText = !JP ? '"Swallow for me."' : '“良い子にして飲みなさい。”'
            } else mouthButton.current.innerText = !JP ? '"Close your mouth."' : '“お口を閉じて。”'
        } else {
            mouthButton.current.innerText = !JP ? '"Open your mouth."' : '“お口を開けて。”'
        }

        if (mouthOn || fastMorph || approach || interruptUI) {
            mouthButton.current.classList.add("inactive")
            wipeButton.current.classList.add("inactive")
            endingButton.current.classList.add("inactive")
        } else {
            mouthButton.current.classList.remove("inactive")
            wipeButton.current.classList.remove("inactive")
            endingButton.current.classList.remove("inactive")
        }

        if (armsUp) {
            wipeButton.current.innerText = !JP ? '"Now now, don\'t be shy."' : "“さあ、照れる必要がないのよ。”"
            mouthButton.current.classList.add("hide")
        } else {
            wipeButton.current.innerText = !JP ? '"Wipe the mess off your face."' : "“その汚い顔をきれいにして。”"
            wipeButton.current.classList.add("hide")
            mouthButton.current.classList.remove("hide")

            if (isFaceCum) {

                wipeButton.current.classList.remove("hide");
                wipeButton.current.addEventListener("click", handleFaceWipeClick);
            } else {
                wipeButton.current.classList.add("hide");
            }
        }

        function handleFaceWipeClick() {
            wipeButton.current.classList.add("hide");
            setIsFaceCum(false)
            kkht.faceWipe({
                elements: [chain.current, armRight.current, armLeft.current],
                cloth: cloth.current,
                hide: [hairPullHandGrab.current, dickHandGrab.current],
                setter: setArmsUp,
                animationSetter: setInterruptUI,
                setIsFaceCum
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
        //  document.getElementById("boydBarWrap").addEventListener("dblclick", handleFaceWipeClick);


        // Cleanup function to remove listeners
        return () => {
            wipeButton.current.removeEventListener("click", lowerArmsHandler);
            wipeButton.current.removeEventListener("click", handleFaceWipeClick);
            //     document.getElementById("boydBarWrap").removeEventListener("dblclick", handleFaceWipeClick);
        };

    }, [armsUp, mouthOn, fastMorph, interruptUI, approach, mouthOpen, isTongueCum, holdMouthOpen, JP, isFaceCum, areTears])

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
    }, [approach, holdMouthOpen, mouthOn, isFaceCum, interruptUI])

    function mouthOpenClose() {
        if (mouthOpenRef.current === false) { // if setting mouth to open
            kkht.hesitation({
                deepBreath: (arousalTierRef.current < 4) ? "true" : "false",
                setter: [setInterruptUI, setInterruptBreath],
                duration: Math.max((hesitation.current * 2 / 1000), 0),
                playDuring: {
                    name: kkht.browRaise
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
                    deepBreath: (arousalTierRef.current <= 3) ? "true" : "false",
                    setter: [setInterruptBreath, setInterruptUI],
                    duration: Math.max((hesitation.current * 3 / 1000), 0),
                    playDuring: (arousalTierRef.current <= 3) ? [{
                        name: kkht.browRaise
                    },
                    {
                        name: kkht.tearsAnimation,
                        args: {
                            index: "2",
                            areTears: areTearsRef,
                            setAreTears,
                            type: "once",
                            arousalTier: arousalTierRef,
                            isCrying: isCryingRef
                        }
                    }] : [{
                        name: kkht.browRaise
                    }],
                    playAfter: () => {
                        kkht.mouthCloseFunction({ ...mouthArgs.current, duration: Math.max((hesitation.current * 3 / 1000), 1) });
                        kkht.callState(setInterruptUI, (hesitation.current !== 0) ? (hesitation.current * 3.1 / 1000) : 1.1)
                        mouthCloseBlockRef.current = true;
                        setHoldMouthOpen(false)
                        setIsTongueCum(false)
                        kkht.valChange(["boyd"], "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousalRef.current.boyd / 15))
                        if (arousalTierRef.current <= 3) kkht.tearsAnimation({
                            index: "3",
                            areTears: areTearsRef,
                            setAreTears,
                            type: "once",
                            arousalTier: arousalTierRef,
                            isCrying: isCryingRef,
                        })
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
            repeat: -1,
            ease: "power1.inOut",
            delay: -0.05
        })

        mouthButton.current.addEventListener("click", mouthOpenClose)
        endingButton.current.addEventListener("click", callBoydNut)
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


        Draggable.create("#dickHandSvg", {
            trigger: "#dickHandGrab",
            zIndexBoost: false,
            type: "y",
            cursor: "ns-resize",
            bounds: {
                minY: containerSize.current * -0.03,
                maxY: containerSize.current * 0.03,
            },
            inertia: {
                y: {
                    end: 0,
                }
            },
            edgeResistance: 0.95,
            onDrag: function () {
                gsap.to(dickHandParts.current, { opacity: 1, duration: 0.2 });
                gsap.to("#hairPullDiv", { opacity: 0, duration: 0.2 });
                const direction = this.getDirection("velocity")
                if (direction && ((direction === "up") || (direction === "down"))) {
                    kkht.valChange("ives", "up", maxArousalRef.current, setArousal, sensitivityRef.current)
                }
                kkht.updateFollowers({
                    itemsArray: ["#dickHandFingers"],
                    x: this.x,
                    y: this.y,
                    ease: "back",
                    init: 0.1,
                    increase: 0.05
                })
            },
            onDragEnd: function () {
                gsap.to("#dickHandFingers", {
                    y: 0,
                    duration: 0.2
                })
                gsap.to(dickHandParts.current, { opacity: 0.2, duration: 0.2 });
                gsap.to("#hairPullDiv", { opacity: 0.2, duration: 0.2 });
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
                    itemsArray: [headParts.current, "#bodyGroup"],
                    x: this.x,
                    y: this.y,
                    ease: "back",
                    init: 0.1,
                    increase: 0
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
                this.dragResistance = kkht.isApproachOrOn(args)

                if (depthMethodRef.current === "Training") {
                    this.applyBounds({
                        minX: containerSize.current * -0.005,
                        maxX: containerSize.current * 0.005,
                        minY: containerSize.current * -0.05,
                        maxY: containerSize.current * kkht.trainingMultiplier(
                            {
                                id: "#hairPullHand",
                                y: this.y,
                                maxY: (this.maxY || containerSize.current * 0.1),
                                initial: 0.125,
                                end: 0.21,
                                hits: 7,
                                increaseBy: 0.001
                            })
                    });
                } else if (depthMethodRef.current === "Arousal") {
                    const draggable = Draggable.get("#hairPullHand");
                    if (container && draggable) {
                        const arousalRatio = arousalRef.current.boyd / maxArousalRef.current.boyd;

                        const bounds = containerSize.current * (0.11 + (arousalRatio * 0.1));
                        draggable.applyBounds({
                            minX: containerSize.current * -0.005,
                            maxX: containerSize.current * 0.005,
                            minY: containerSize.current * -0.05,
                            maxY: bounds
                        });
                    }
                } else {
                    kkht.trainingMultiplier(
                        {
                            id: "#hairPullHand",
                            reset: true
                        })
                    this.applyBounds({
                        minX: containerSize.current * -0.005,
                        maxX: containerSize.current * 0.005,
                        minY: containerSize.current * -0.05,
                        maxY: containerSize.current * 0.21
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
        dickHandDraggable.current = Draggable.get("#dickHandSvg")

    }, [depthMethod])

    useEffect(() => { // Nut function
        if (arousal.ives >= maxArousal.ives) {

            kkht.valChange("boyd", "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousal.boyd / 35))

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
                            alsoMove: hairPullBeads.current,
                            areTears: areTearsRef,
                            arousalTier: arousalTierRef,
                            bodyMain: body.current,
                            containerSize: containerSize.current,
                            draggable: hairPullDraggable.current,
                            isCrying: isCryingRef,
                            mouthGroup: mouthGroup.current,
                            setApproach: setApproach,
                            setAreTears,
                            setHoldMouthOpen: setHoldMouthOpen,
                            setMouthOn: setMouthOn,
                            setMouthOpen: setMouthOpen,
                            toMove: [body.current, headParts.current],
                            tongueDrool: tongueDrool.current,
                            tongueGroup: tongueGroup.current,
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
                    duration: 1.5
                })

                kkht.callFastMorph({
                    ...morphArgsTemplate,
                    fromState: "Open",
                    toState: "Wide"
                })

                //         kkht.callState(setInterruptUI, 1.5)
                kkht.resetDraggable(dickHandDraggable.current, dickHandParts.current)
                gsap.to(dickHandParts.current, {
                    y: 0,
                    opacity: 0.2,
                    duration: 0.2
                })
                if (mouthOpen) {
                    kkht.callCumshot({
                        cumType: "tongueCum",
                        setInterruptUI
                    })
                    setIsTongueCum(true)
                    setHoldMouthOpen(true)
                    gsap.to(dickHandParts.current, {
                        y: 0,
                        opacity: 0.2,
                        duration: 0.2
                    })

                } else {
                    setIsFaceCum(true)
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
                            animationSetter: setInterruptUI,
                            setIsFaceCum
                        }
                    })
                }
            }
            gsap.to(dickHandParts.current, {
                y: 0,
                opacity: 0.2,
                duration: 0.2
            })
            setArousal(prev => ({ ...prev, ives: 0 }))
        }


    }, [arousal.ives, maxArousal.ives, mouthOn, mouthOpenRef])

    function callBoydNut() {
        gsap.to(hairPullDraggable.current.target, {
            y: -10,
            duration: 2
        })

        gsap.to(hairPullBeads.current, {
            y: -10,
            duration: 2
        })

        gsap.to(body.current, {
            y: -10,
            duration: 2
        })

        gsap.to(headParts.current, {
            y: -10,
            duration: 2
        })

        hairPullDraggable.current.update();

        document.getElementById("boydNutButton").style.display = "none"
        endingUnlocked.current = false

        setTimeout(() => {
            kkht.mouthCloseFunction({ ...mouthArgs.current, duration: 1 })
            setApproach(false)
            setMouthOn(false)
            setMouthOpen(false)
            setHoldMouthOpen(false)
        }, 500)

        kkht.endingHandler({
            maxArousal: maxArousalRef.current,
            JP,
            setArousal,
            setInterruptUI,
            setMouthOn,
            setMouthOpen,
            setHoldMouthOpen,
            setApproach,
            draggable: hairPullDraggable.current,
            mouthArgs: mouthArgs.current,
            endLineRef,
            endCallRef
        })

    }

    useEffect(() => { // Elements that change based on arousal.boyd
        if (arousal.boyd >= (maxArousal.boyd * 0.98)) {
            endingButton.current.style.display = "block"

            if (!endingUnlocked.current) {
                endingUnlocked.current = true
                const elements = ["settersDiv", "settingsContents", "settingsIcon"]
                if (document.getElementById("settersDiv").classList.contains("collapsed")) {
                    return
                } else {
                    elements.forEach((el) => {
                        document.getElementById(el).classList.toggle("collapsed")
                    })
                }
            }


        }

        if (!(arousal.boyd >= (maxArousal.boyd * 0.90))) {
            endingUnlocked.current = false
            endingButton.current.style.display = "none"
        }

        const arousalRatio = arousal.boyd / maxArousal.boyd

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
    }, [arousal.boyd, depthMethod, approach, mouthOn, mouthOpen, holdMouthOpen]);

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
                el.style.display = (el.id === "hairPullDiv") ? "flex" : "block"
            })
        }

        if (fastMorph || interruptUI) {
            gsap.to("#waitIcon", {
                opacity: 1, duration: 0.2
            })

        } else gsap.to("#waitIcon", { opacity: 0, duration: 0.2 })

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

                <div className='message' id='messageBox'>
                    <div id='messageLine'></div>
                    <p className='right' id='messageArrow'>► </p>

                </div>

            </div>
            <div id='mobile'>
                <Setters
                    JP={JP}
                    setJP={setJP}
                    sensitivity={[
                        {
                            id: "boydSet",
                            setter: value => {
                                setSensitivity(prev => ({ ...prev, boyd: Number(value) }))
                            },
                            label: !ivesMode ? "Set Blue's sensitivity." : "Set Boyd's sensitivity.",
                            labelJP: !ivesMode ? "アオの感度をセット。" : "ボイドの感度をセット。",
                            value: sensitivity.boyd
                        },
                        {
                            id: "ivesSet",
                            setter: value => {
                                setSensitivity(prev => ({ ...prev, ives: Number(value) }))
                            },
                            label: !ivesMode ? "Set Red's sensitivity." : "Set Ives' sensitivity.",
                            labelJP: !ivesMode ? "アカの感度をセット。" : "アイヴスの感度をセット。",
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
                            labelJP: !ivesMode ? "アオの上限: " : "ボイド上限: ",
                            value: maxArousal.boyd
                        },
                        {
                            id: "ivesMax",
                            setter: value => {
                                setmaxArousal(prev => ({ ...prev, ives: Number(value) }))
                            },
                            label: !ivesMode ? "Red Max: " : "Ives Max: ",
                            labelJP: !ivesMode ? "アカの上限: " : "ｱｲｳﾞｽ上限: ",
                            value: maxArousal.ives
                        }
                    ]}
                    modes={{
                        id: "depthModeSet",
                        modes: [
                            { en: "Training", jp: "教習" },
                            { en: "Arousal", jp: "興奮" },
                            { en: "None", jp: "ない" }],
                        label: !JP ? "Depth Mode:" : "深さモード:",
                        setter: setDepthMethod
                    }}
                    secret={
                        {
                            id: "ivesModeSwitch",
                            setter: setIvesMode,
                            label: !JP ? "Ravenous" : "ラビナス",
                            value: ivesMode
                        }
                    }
                />
                <div id='ordersDiv'>
                    <button id='mouthOrderButton'>"Open your mouth."</button>
                    <button id='wipeOrderButton'>"Wipe the mess off your face."</button>
                    <button id='boydNutButton'>"Just look at you..."</button>
                </div>
                <Tutorial ivesMode={ivesModeActive}
                    setInterruptUI={setInterruptUI}
                    JP={JP}
                    arousal={arousal}
                    maxArousal={maxArousal}
                    hairPullDraggable={hairPullDraggable}
                    hairPullBeads={hairPullBeads}
                    body={body}
                    headParts={headParts}
                    boydNutRef={boydNutRef.current}
                    mouthArgs={mouthArgs}
                    setApproach={setApproach}
                    setMouthOn={setMouthOn}
                    setHoldMouthOpen={setHoldMouthOpen}
                    setMouthOpen={setMouthOpen}
                    arousalTier={arousalTierRef.current} />
                <div id='tutorialButton'>
                    <p id='tutorialButtonText'>?</p>
                </div>
            </div>


        </div>
    )
}

export default App
