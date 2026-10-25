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
import fullSvg from './assets/components/fullSvg'
import ffkSvg from "./assets/FFK.svg?raw";


function App({ JP, setJP, devMode }) {

    const [slowMorph, setSlowMorph] = useState(false)
    const [fastMorph, setFastMorph] = useState(false)
    const slowMorphRef = useRef(slowMorph)
    const fastMorphRef = useRef(fastMorph)

    const [interruptBreath, setInterruptBreath] = useState()
    const [interruptUI, setInterruptUI] = useState()

    const [rosaryModeActive, setrosaryModeActive] = useState(true)
    const [rosaryMode, setrosaryMode] = useState(() => localStorage.getItem("rosaryModeOn") === "true")

    const [isTongueCum, setIsTongueCum] = useState(false)
    const isTongueCumRef = useRef()

    const [isFaceCum, setIsFaceCum] = useState(false)

    const [isLick, setIsLick] = useState(false)

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

    const boyNutRef = useRef(false)

    const [arousalTier, setArousalTier] = useState(1)

    const [arousal, setArousal] = useState({
        man: 0,
        boy: 0,
    })
    const [maxArousal, setmaxArousal] = useState({
        man: localStorage.getItem("manMax") ? localStorage.getItem("manMax") : 2500,
        boy: localStorage.getItem("boyMax") ? localStorage.getItem("boyMax") : 5000,
    })
    const [sensitivity, setSensitivity] = useState({
        man: localStorage.getItem("manSens") ? localStorage.getItem("manSens") : 5,
        boy: localStorage.getItem("boySens") ? localStorage.getItem("boySens") : 2,
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
    const beads = useRef()
    const blush = useRef()
    const body = useRef()
    const browLeft = useRef()
    const browRight = useRef()
    const cloth = useRef()
    const containerSize = useRef()
    const depthMethodRef = useRef()
    const dickHandDraggable = useRef()
    const dickHandGrab = useRef()
    const dickHandParts = useRef()
    const dickSvg = useRef()
    const endingButton = useRef()
    const endingFired = useRef(false)
    const endingUnlocked = useRef()
    const eyeCenters = useRef()
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
        beads.current = document.getElementById("beads")
        blush.current = document.getElementById("blush")
        body.current = document.getElementById("bodyGroup");
        browLeft.current = document.getElementById("browLeft")
        browRight.current = document.getElementById("browRight")
        cloth.current = document.getElementById("cloth")
        containerSize.current = window.innerHeight
        dickHandGrab.current = document.getElementById("dickHandGrab");
        dickHandParts.current = kkht.arrayFrom(["dickHandFingersGroup", "dickHandGroup", "dickHandGrab"])
        dickSvg.current = document.getElementById("dick")
        endingButton.current = document.getElementById("boyNutButton")
        eyeCenters.current = Array.from(document.querySelectorAll(`[id*="eyeCenter"]`))
        console.log(eyeCenters.current)
        hairPullBeads.current = Array.from(document.querySelectorAll(`[id^="moveBead"]`)).reverse()
        hairPullHandGrab.current = document.getElementById("hairPullHandGrab");
        headParts.current = kkht.arrayFrom(["head", "mouthFull"]);
        hideHand.current = document.getElementById("hairPullDiv")
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

        // Elements that require the "interact" class
        document.querySelectorAll(`[id*="Grab"]`).forEach(el => {
            el.classList.add("interact")
        });

        document.querySelectorAll(`[id*="Topmost"]`).forEach(el => {
            el.classList.add("noInteract")
        });

        // Elements that disappear when blink fires
        kkht.arrayFrom([`[id^="upper"]`, "eyeLeft", "eyeRight"]).forEach(el => {
            el.classList.add("blink")
        });

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

        if (arousal.man > maxArousal.man) setArousal(prev => ({ ...prev, man: Math.min(maxArousal.man * 0.95, maxArousal.man - 5) }))
        if (arousal.boy > maxArousal.boy) setArousal(prev => ({ ...prev, boy: Math.min(maxArousal.boy * 0.95, maxArousal.boy - 5) }))
    }, [maxArousal]);

    useEffect(() => {
        var secret = document.getElementById("secret")
        if (!rosaryModeActive) {
            secret.style.opacity = 0
            secret.style.pointerEvents = "none"
        } else {
            secret.style.opacity = 1
            secret.style.pointerEvents = "all"
        }
    }, [rosaryModeActive])

    useEffect(() => {
        var elements = [
            hairPullBeads.current,
            beads.current
        ]
        console.log("elements", elements)
        elements.forEach((el) => {
            console.log(el)
            if (Array.isArray(el)) {
                el.forEach(el2 => {
                    el2.style.display = rosaryMode ? "block" : "none"
                })
            } else el.style.display = rosaryMode ? "block" : "none"

        })
    }, [rosaryMode])

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
        if ((isFaceCum || isTongueCum || mouthOn || isLick) && (arousalTier <= 3)) {
            setIsCrying(true)
        } else setIsCrying(false)
    }, [isFaceCum, isTongueCum, mouthOn, isLick, arousalTier])

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
                console.log("tears called once")

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
            //   endingButton.current.classList.add("inactive")
        } else {
            mouthButton.current.classList.remove("inactive")
            wipeButton.current.classList.remove("inactive")
            //   endingButton.current.classList.remove("inactive")
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
            kkht.resetFaceCumArray()
            kkht.faceWipe({
                elements: [armRight.current, armLeft.current],
                cloth: cloth.current,
                hide: [hairPullHandGrab.current, dickHandGrab.current],
                setter: setArmsUp,
                animationSetter: setInterruptUI,
                setIsFaceCum
            });
        }
        function lowerArmsHandler() {
            //   kkht.valChange(["boy"], "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousal.boy / 20 * sensitivityRef.current.boy))
            kkht.lowerArms({
                elements: [cloth.current, armRight.current, armLeft.current],
                container: container,
                setter: setArmsUp,
                animationSetter: setInterruptUI,
                devMode: devMode
            }
            )
        }

        wipeButton.current.addEventListener("click", lowerArmsHandler)
        //  document.getElementById("boyBarWrap").addEventListener("dblclick", handleFaceWipeClick);


        // Cleanup function to remove listeners
        return () => {
            wipeButton.current.removeEventListener("click", lowerArmsHandler);
            wipeButton.current.removeEventListener("click", handleFaceWipeClick);
            //     document.getElementById("boyBarWrap").removeEventListener("dblclick", handleFaceWipeClick);
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
                    //   kkht.valChange(["boy"], "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousalRef.current.boy / 100 * sensitivityRef.current.boy))
                    kkht.mouthOpenFunction({ ...mouthArgs.current, duration: Math.max((hesitation.current * 2 / 1000), 1) });
                    setHoldMouthOpen(true)
                }
            })


        } else {
            if (isTongueCumRef.current) {
                console.log("tears called once")

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
                        kkht.valChange(["boy"], "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousalRef.current.boy / 15))
                        if (arousalTierRef.current <= 3) {
                            console.log("tears called once")
                            kkht.tearsAnimation({
                                index: "3",
                                areTears: areTearsRef,
                                setAreTears,
                                type: "once",
                                arousalTier: arousalTierRef,
                                isCrying: isCryingRef,
                            })
                        }
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
        endingButton.current.addEventListener("click", callboyNut, { once: true })
        gsap.set(tongueGroup.current, { scaleY: 0 });
        gsap.set(tongueDrool.current, { scaleY: 0, scaleX: 1 });
        function valDownHandler() {
            if ((mouthOnRef.current === false) && document.hasFocus()) {
                kkht.valChange(["boy", "man"], "down", maxArousalRef.current, setArousal, sensitivityRef.current)
            }
        }
        const interval = setInterval(valDownHandler, 500);

        return () => {
            clearInterval(interval); // Cleanup interval on unmount
            mouthButton.current.removeEventListener("click", mouthOpenClose)
            endingButton.current.removeEventListener("click", callboyNut)
        }
    }, []);

    useEffect(() => { // Sets up draggables


        Draggable.create("#dickHandTopmost", {
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
                    kkht.valChange("man", "up", maxArousalRef.current, setArousal, sensitivityRef.current)
                }
                kkht.updateFollowers({
                    itemsArray: ["#dickHandFingersGroup"],
                    x: this.x,
                    y: this.y,
                    ease: "back",
                    init: 0.1,
                    increase: 0.05
                })
            },
            onDragEnd: function () {
                gsap.to("#dickHandFingersGroup", {
                    y: 0,
                    duration: 0.2
                })
                gsap.to(dickHandParts.current, { opacity: 0.35, duration: 0.2 });
                gsap.to("#hairPullDiv", { opacity: 0.35, duration: 0.2 });
            }
        })

        Draggable.create("#hairPullHandTopmost", {
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
                const dickRect = document.getElementById("dickGroup").getBoundingClientRect();
                const headRect = document.getElementById("headGroup").getBoundingClientRect();
                const percent = kkht.getOverlapPercent(headRect, dickRect, 50); // percent of headArea overlapped by dickGroup
                const direction = this.getDirection("velocity")

                //    var resistance

                const args = {
                    percent: percent,
                    startApproach: 0.04,
                    startOn: 0.1,
                    setApproach,
                    setMouthOn,
                    affectedIDs: ["man", "boy"],
                    lick: {
                        tongue: "#tongue",
                        tip: "#dickTip",
                        percent: "20%"
                    },
                    maxArousal: maxArousalRef.current,
                    setArousal,
                    sensitivity: sensitivityRef.current,
                    direction,
                    setIsLick
                };
                this.dragResistance = kkht.isApproachOrOn(args)

                if (depthMethodRef.current === "Training") {
                    this.applyBounds({
                        minX: containerSize.current * -0.005,
                        maxX: containerSize.current * 0.005,
                        minY: containerSize.current * -0.05,
                        maxY: containerSize.current * kkht.trainingMultiplier(
                            {
                                id: "#hairPullHandTopmost",
                                y: this.y,
                                maxY: (this.maxY || containerSize.current * 0.1),
                                initial: 0.125,
                                end: 0.21,
                                hits: 8,
                                increaseBy: 0.001
                            })
                    });
                } else if (depthMethodRef.current === "Arousal") {
                    const draggable = Draggable.get("#hairPullHandTopmost");
                    if (container && draggable) {
                        const arousalRatio = arousalRef.current.boy / maxArousalRef.current.boy;

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
                            id: "#hairPullHandTopmost",
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
                const dickRect = document.getElementById("dickGroup").getBoundingClientRect();
                const headRect = document.getElementById("headGroup").getBoundingClientRect();
                const percent = kkht.getOverlapPercent(headRect, dickRect, 50); // percent of headArea overlapped by dickGroup

                //    var resistance

                const args = {
                    percent: percent,
                    startApproach: 0.04,
                    startOn: 0.1,
                    setApproach,
                    setMouthOn,
                    affectedIDs: ["man", "boy"],
                    lick: {
                        tongue: "#tongue",
                        tip: "#dickTip",
                        percent: "20%"
                    },
                    maxArousal: maxArousalRef.current,
                    setArousal,
                    sensitivity: sensitivityRef.current,
                    setIsLick
                };

                kkht.isApproachOrOn(args)

                setHairPullDragging(false);

                gsap.to(hideHand.current, { opacity: 0.35, duration: 0.2 });

            }

        });
        hairPullDraggable.current = Draggable.get("#hairPullHandTopmost")
        dickHandDraggable.current = Draggable.get("#dickHandTopmost")

    }, [depthMethod])

    useEffect(() => { // Nut function
        if (arousal.man >= maxArousal.man) {

            kkht.valChange("boy", "up", maxArousalRef.current, setArousal, sensitivityRef.current, (maxArousal.boy / 35))

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
                if (areTears && isCrying && arousalTier <= 2) {
                    kkht.tearsAnimation({
                        index: "",
                        setAreTears,
                        type: "renew",
                        arousalTier,
                        isCrying
                    })
                }
                gsap.to(eyeCenters.current, {
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
                    opacity: 0.35,
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
                        opacity: 0.35,
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
                            elements: [armRight.current, armLeft.current],
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
                opacity: 0.35,
                duration: 0.2
            })
            setArousal(prev => ({ ...prev, man: 0 }))
        }


    }, [arousal.man, maxArousal.man, mouthOn, mouthOpenRef])

    function callboyNut() {
        setAreTears(false)
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

        endingButton.current.style.display = "none"
        endingUnlocked.current = false
        endingFired.current = true

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

    useEffect(() => { // Elements that change based on arousal.boy
        if (arousal.boy >= (maxArousal.boy * 0.98) && endingFired.current === false) {
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

        if (endingFired.current === true || !(arousal.boy >= (maxArousal.boy * 0.95))) {
            endingUnlocked.current = false
            endingButton.current.style.display = "none"
        }

        const arousalRatio = arousal.boy / maxArousal.boy

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

        kkht.renderProgress(blush.current, "opacity", arousal.boy, maxArousal.boy)

        const pupilSize = gsap.timeline({ paused: true })
            .fromTo(["#pupilLeft", "#pupilRight"],
                { scale: 0.8, transformOrigin: "center" },
                { scale: 1.4, duration: 1 })

        pupilSize.progress(arousalRatio)

        return () => {
        };
    }, [arousal.boy, depthMethod, approach, mouthOn, mouthOpen, holdMouthOpen]);

    useEffect(() => { // Elements dependent on arousalTier (eye movement, breath)

        let cleanup;

        if (!fastMorphRef.current) {
            if (arousalTier === 1 || arousalTier === 2) {
                gsap.to("#faceBack", {
                    morphSVG: "#faceBack",
                    duration: 2
                })
                gsap.to("#mouth", {
                    morphSVG: "#mouth",
                    duration: 2
                })
                cleanup = kkht.eyeMovement({
                    moveEls: eyeCenters.current,
                    type: "random",
                    bounds: {
                        maxX: 30,
                        maxY: 30,
                        minX: -30,
                        minY: 10
                    }
                });
            } else if (arousalTier === 3 || arousalTier === 4) {
                cleanup = kkht.eyeMovement({
                    moveEls: eyeCenters.current,
                    type: "toFro",
                    bounds: {
                        maxX: 30,
                        maxY: 15,
                        minX: -30,
                        minY: -5
                    }
                });
            } else if (arousalTier === 5) {
                gsap.to(eyeCenters.current, {
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

        kkht.hideOnOverlap({
            running: running,
            element1: sweats,
            element2: eyeCenters.current
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
            hideHand.current.style.display = "none"
        } else {
            hairPullDraggable.current.enable()
            hideHand.current.style.display = "flex"
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

            gsap.to(hideHand.current, { opacity: 0.35, duration: 0.2 });

        };
        hairPullHandGrab.current.addEventListener("touchstart", hairEnter);
        hairPullHandGrab.current.addEventListener("touchend", hairLeave);

        dickEnter = () => {
            gsap.to(dickHandParts.current, { opacity: 1, duration: 0.2 });
        };
        dickLeave = () => {

            gsap.to(dickHandParts.current, {
                opacity: 0.35,
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
                    boy={arousal.boy}
                    man={arousal.man}
                    maxboy={maxArousal.boy}
                    maxman={maxArousal.man} />

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
                    <Mouth rosaryMode={rosaryMode} />
                    <Dick />
                    <Head rosaryMode={rosaryMode} />
                    <Arms />
                    <HairPullHand rosaryMode={rosaryMode} />
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
                            id: "boySet",
                            setter: value => {
                                setSensitivity(prev => ({ ...prev, boy: Number(value) }))
                            },
                            label: "Set boy's sensitivity.",
                            labelJP: "少年の感度をセット。",
                            value: sensitivity.boy
                        },
                        {
                            id: "manSet",
                            setter: value => {
                                setSensitivity(prev => ({ ...prev, man: Number(value) }))
                            },
                            label: "Set man's sensitivity.",
                            labelJP: "男の感度をセット。",
                            value: sensitivity.man
                        }
                    ]
                    }
                    max={[
                        {
                            id: "boyMax",
                            setter: value => {
                                setmaxArousal(prev => ({ ...prev, boy: Number(value) }))
                            },
                            label: "Boy Max: ",
                            labelJP: "少年上限: ",
                            value: maxArousal.boy
                        },
                        {
                            id: "manMax",
                            setter: value => {
                                setmaxArousal(prev => ({ ...prev, man: Number(value) }))
                            },
                            label: "Man Max: ",
                            labelJP: "男上限: ",
                            value: maxArousal.man
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
                            id: "rosaryModeSwitch",
                            setter: setrosaryMode,
                            label: !JP ? "Rosary" : "ロザリオ",
                            value: rosaryMode
                        }
                    }
                />
                <div id='ordersDiv'>
                    <button id='mouthOrderButton'>"Open your mouth."</button>
                    <button id='wipeOrderButton'>"Wipe the mess off your face."</button>
                    <button id='boyNutButton'>"Just look at you..."</button>
                </div>
                <Tutorial rosaryMode={rosaryModeActive}
                    setInterruptUI={setInterruptUI}
                    JP={JP}
                    arousal={arousal}
                    maxArousal={maxArousal}
                    hairPullDraggable={hairPullDraggable}
                    hairPullBeads={hairPullBeads}
                    body={body}
                    headParts={headParts}
                    boyNutRef={boyNutRef.current}
                    mouthArgs={mouthArgs}
                    setApproach={setApproach}
                    setMouthOn={setMouthOn}
                    setHoldMouthOpen={setHoldMouthOpen}
                    setMouthOpen={setMouthOpen}
                    arousalTier={arousalTierRef.current}
                    devMode={devMode} />
                <div id='tutorialButton'>
                    <p id='tutorialButtonText'>?</p>
                </div>
            </div>


        </div>
    )
}

export default App
