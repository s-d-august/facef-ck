import { useState, useEffect, useRef } from 'react'
import './App.css'
import * as kkht from './assets/kkht/index'
import Dick from './assets/components/dick'
import HairPullHand from './assets/components/hair-pull-hand'
import Body from './assets/components/body'
import Head from './assets/components/head'
import Mouth from './assets/components/mouth'
import Outputs from './assets/components/outputs'
import AgeCheck from './assets/kkht/age-check/age-check'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin, DrawSVGPlugin } from 'gsap/all'
import Setters from './assets/components/setters/setters'

function App() {

  const [slowMorph, setSlowMorph] = useState(false)
  const [fastMorph, setFastMorph] = useState(false)
  const slowMorphRef = useRef(slowMorph)
  const fastMorphRef = useRef(fastMorph)

  const [ageChecked, setAgeChecked] = useState(false)
  const ageCheckedRef = useRef(ageChecked)

  const [ivesModeActive, setIvesModeActive] = useState(false)
  const [ivesMode, setIvesMode] = useState(false)

  const depthMethod = useRef("")

  const [holdMouthOpen, setHoldMouthOpen] = useState(false)
  const [mouthOpen, setMouthOpen] = useState(false)
  const [mouthOn, setMouthOn] = useState(false)
  const mouthOpenRef = useRef(mouthOpen);
  const [approach, setApproach] = useState(false)

  const droolIntervalRef = useRef(null);
  const sweatIntervalRef = useRef(null);

  const [arousalTier, setArousalTier] = useState(1)

  const [arousal, setArousal] = useState({
    ives: 0,
    boyd: 0,
  })
  const [maxArousal, setmaxArousal] = useState({
    ives: 1000,
    boyd: 1000,
  })
  const [sensitivity, setSensitivity] = useState({
    ives: 2.5,
    boyd: 2.5,
  })

  const containerSize = useRef()
  const mouthGroup = useRef()
  const tongueGroup = useRef()
  const tongueDrool = useRef()
  const hideHand = useRef()
  const headParts = useRef()
  const hairPullBeads = useRef()
  const body = useRef()
  const tearRight = useRef()
  const tearLeft = useRef()
  const sensitivityRef = useRef()
  const maxArousalRef = useRef(maxArousal);

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
    containerSize.current = document.getElementById("container").getBoundingClientRect().height
    mouthGroup.current = document.getElementById("mouthGroup")
    tongueGroup.current = document.getElementById("tongueGroup")
    tongueDrool.current = document.getElementById("tongueDrool")
    hideHand.current = gsap.utils.toArray(".hideHand")
    headParts.current = gsap.utils.toArray(".headParts");
    hairPullBeads.current = gsap.utils.toArray(".hairPullBeads").reverse()
    body.current = document.getElementById("bodyGroup");
    tearRight.current = document.getElementById("tearRight")
    tearLeft.current = document.getElementById("tearLeft")
  }, [])

  useEffect(() => {
    mouthOpenRef.current = mouthOpen;
  }, [mouthOpen]);

  useEffect(() => {
    ageCheckedRef.current = ageChecked;
  }, [ageChecked]);

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
    } else {
      document.getElementById("secret").style.display = "none"
    }
  }, [ivesModeActive])

  useEffect(() => {
    console.log(ivesMode)
    var elements = gsap.utils.toArray(".ivesMode")

    elements.forEach((el) => {
      el.style.display = ivesMode ? "block" : "none"
    })

  }, [ivesMode])


  useEffect(() => { // Elements that change based on approach state
    if (holdMouthOpen === true) return

    if (
      !containerSize.current ||
      !mouthGroup.current ||
      !tongueGroup.current ||
      !tongueDrool.current
    ) {
      console.error("One or more refs are null!");
      return;
    }

    const mouthArgs = {
      moveBy: containerSize.current * 0.045,
      mouthGroup: mouthGroup.current,
      tongueGroup: tongueGroup.current,
      tongueDrool: tongueDrool.current,
      mouthOpenSetter: setMouthOpen
    }

    if (approach) {
      kkht.mouthOpenFunction(mouthArgs)
    } else {
      kkht.mouthCloseFunction(mouthArgs)
    }
  }, [approach, holdMouthOpen])

  function mouthOpenClose() {
    const mouthArgs = {
      moveBy: containerSize.current * 0.045,
      mouthGroup: mouthGroup.current,
      tongueGroup: tongueGroup.current,
      tongueDrool: tongueDrool.current,
      mouthOpenSetter: setMouthOpen
    }

    if (mouthOpenRef.current === false) { // if mouth is closed
      kkht.mouthOpenFunction(mouthArgs);
      setHoldMouthOpen(true)
    } else if (mouthOpenRef.current === true) {
      kkht.mouthCloseFunction(mouthArgs);
      setHoldMouthOpen(false)
    }
  }

  function createMainDraggable() {
    Draggable.create("#hairPullHand", {
      trigger: "#hairPullHandGrab",
      onDrag: function () {

        gsap.to(hideHand.current, { opacity: 1, duration: 0.2 });
        kkht.updateFollowers({
          itemsArray: [headParts.current, body.current],
          x: this.x,
          y: this.y,
          ease: "power2",
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

        //    var resistance

        const args = {
          percent: percent,
          startApproach: 0.05,
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

        this.dragResistance = kkht.isApproachOrOn(args)

        if (depthMethod.current === "training") {
          this.applyBounds({
            minX: containerSize.current * -0.0055,
            maxX: containerSize.current * 0.0055,
            minY: containerSize.current * -0.07,
            maxY: containerSize.current * kkht.trainingMultiplier("#hairPullHand", this.y, (this.maxY || containerSize.current * 0.1), 0.2, 0.4, 5, 0.001)
          });
        } else {
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
        gsap.to(hideHand.current, { opacity: 0, duration: 0.2 })
      }
    });
  }

  useEffect(() => {
    document.getElementById("beard").addEventListener("dblclick", mouthOpenClose)
    document.getElementById("tongue").addEventListener("dblclick", mouthOpenClose)
    gsap.set(tongueGroup.current, { scaleY: 0 });
    gsap.set(tongueDrool.current, { scaleY: 0, scaleX: 1 });
    const interval = setInterval(() => kkht.valChange(["boyd", "ives"], "down", maxArousalRef.current, setArousal, sensitivityRef.current), 500);
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
        kkht.valChange("ives", "up", maxArousalRef.current, setArousal, sensitivityRef.current)
      }
    })

    createMainDraggable()

  }, [])

  useEffect(() => { // Nut function

    if (arousal.ives >= maxArousal.ives) {

      if (mouthOn) {
        kkht.callFastMorph({
          ...morphArgsTemplate,
          fromState: "Open",
          toState: "Wide",
          animations: [kkht.callEyeFlutter, kkht.pantingAnimation],
          animationArgs:
            [{ fromState: "Open", toState: "Wide" },
            {
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
              draggable: Draggable.get("#hairPullHand"),
              alsoMove: hairPullBeads.current
            }]

        })

        disableAndEnableDraggables(5)
        // Plays expression change animation and resets arousal
      }
      if (!mouthOn && mouthOpen) {
        kkht.callCumshot({
          cumType: "tongueCum"
        })
        disableAndEnableDraggables(1.5)
        // Plays cum on tongue animation
      }
      if (!mouthOn && !mouthOpen) {
        kkht.callCumshot({ cumType: "faceCum", untilEmpty: true, origin: "top", shotDuration: 0.5, moveDuration: 2.5 })
        disableAndEnableDraggables(1.5)
        // Plays cum on face animation
      }

      function disableAndEnableDraggables(sec) {
        const hairPullHandGrab = document.getElementById("hairPullHandGrab");

        // Disable hair pull hand
        Draggable.get("#hairPullHand")?.disable();
        hairPullHandGrab.classList.remove("interact")
        console.log(hairPullHandGrab)
        // Disable all dick hand parts
        gsap.utils.toArray(".dickHandParts").forEach(el => {
          Draggable.get(el)?.disable();
        });

        // Wait, then enable
        setTimeout(() => {
          Draggable.get("#hairPullHand")?.enable();
          Draggable.get("#hairPullHand")?.update(); // <-- Add this line
          hairPullHandGrab.classList.add("interact")

          gsap.utils.toArray(".dickHandParts").forEach(el => {
            Draggable.get(el)?.enable();
            Draggable.get(el)?.update(); // <-- And this line

          });
        }, (sec * 1000));
      }

      setArousal(prev => ({ ...prev, ives: 0 }))
    }
  }, [arousal.ives, mouthOn, mouthOpenRef])

  useEffect(() => {    // Elements that change based on arousal.boyd

    const arousalRatio = arousal.boyd / maxArousal.boyd


    if (depthMethod.current === "arousal") {
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
  }, [arousal.boyd]);

  useEffect(() => {
    const eyeCenterRight = document.getElementById("eyeCenterRight");
    const eyeCenterLeft = document.getElementById("eyeCenterLeft");
    let cleanup;

    console.log(arousalTier)

    if (!fastMorphRef.current) {
      if (arousalTier === 1 || arousalTier === 2) {
        cleanup = kkht.eyeMovement({
          moveEls: [eyeCenterRight, eyeCenterLeft],
          type: "random",
          bounds: {
            maxX: 30,
            maxY: 15,
            minX: -30,
            minY: 0
          }
        });
      } else if (arousalTier === 3 || arousalTier === 4) {
        cleanup = kkht.eyeMovement({
          moveEls: [eyeCenterRight, eyeCenterLeft],
          type: "toFro",
          bounds: {
            maxX: 30,
            maxY: 10,
            minX: -30,
            minY: -17
          }
        });
      } else if (arousalTier === 5) {
        gsap.to([eyeCenterRight, eyeCenterLeft], {
          x: 0,
          y: -17,
          duration: 1
        })
      }
    }

    var prevDuration = document.documentElement.style.getPropertyValue("--animation-duration");

    var breathCycleDuration = (
      (fastMorph) ? 0
        : (arousalTier === 5) ? 0.5
          : (arousalTier === 4) ? 0.625
            : (arousalTier === 3) ? 0.75
              : (arousalTier === 2) ? 0.875
                : (arousalTier === 1) ? 1
                  : null
    );
    if (prevDuration !== (breathCycleDuration + "s")) {
      document.documentElement.style.setProperty("--animation-duration", breathCycleDuration + "s");
    }

    return () => {
      if (cleanup) cleanup();

    };
  }, [arousalTier, fastMorph])

  useEffect(() => { // Sweat, eye movement
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


  useEffect(() => { // Elements that change based on mouthOn (including JOHand listeners)

    var dickHandDraggable = Draggable.get("#dickHandGrab")

    if (mouthOn) {
      droolIntervalRef.current = setInterval(() => kkht.randomizeArray({
        idString: "dickDrool",
        animation: kkht.drip,
        areaHeight: 350
      }), 7500)

      dickHandDraggable.disable()
    } else {
      if (droolIntervalRef.current) {
        clearInterval(droolIntervalRef.current);
        droolIntervalRef.current = null;
      }
      dickHandDraggable.enable()
    }
    // Always set up hairPullHand hover listeners
    const hairPullHandGrab = document.getElementById("hairPullHandGrab");
    const hairPullHand = document.getElementById("hairPullHand");
    const hideHand = gsap.utils.toArray(".hideHand");

    let hairEnter, hairLeave, dickEnter, dickLeave, dickHandle, dickHand;

    if (hairPullHandGrab && hideHand && hairPullHand) {
      hairEnter = () => {
        gsap.to(hideHand, { opacity: 1, duration: 0.2 });
      };
      hairLeave = () => {
        if (Draggable.get(hairPullHand)?.isDragging) {
          return;
        } else {
          gsap.to(hideHand, { opacity: 0, duration: 0.2 });
        }
      };
      hairPullHandGrab.addEventListener("mouseenter", hairEnter);
      hairPullHandGrab.addEventListener("mouseleave", hairLeave);
    }

    // Only set up dickHand hover listeners when mouthOn === false
    dickHand = gsap.utils.toArray(".dickHandParts");
    dickHandle = document.getElementById("dickHandGrab");

    if (mouthOn === false && dickHandle && dickHand.length) {
      dickHand.forEach((el) => {
        el.style.display = "inline";
      });
      dickEnter = () => {
        dickHand.forEach(el => el.classList.remove("opacity0"));
        gsap.to(dickHand, { opacity: 1, duration: 0.2 });
      };
      dickLeave = () => {
        if (Draggable.get(dickHandle)?.isDragging) {
          return;
        } else {
          gsap.to(dickHand, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
              dickHand.forEach(el => el.classList.add("opacity0"));
            }
          });
        }
      };
      dickHandle.addEventListener("mouseenter", dickEnter);
      dickHandle.addEventListener("mouseleave", dickLeave);
    }

    // Cleanup
    return () => {
      if (hairPullHandGrab) {
        hairPullHandGrab.removeEventListener("mouseenter", hairEnter);
        hairPullHandGrab.removeEventListener("mouseleave", hairLeave);
      }
      if (dickHandle) {
        dickHandle.removeEventListener("mouseenter", dickEnter);
        dickHandle.removeEventListener("mouseleave", dickLeave);
      }
      if (droolIntervalRef.current) {
        clearInterval(droolIntervalRef.current);
        droolIntervalRef.current = null;
      }
    };

  }, [mouthOn]);

  useEffect(() => {
    const checked = localStorage.getItem("ageChecked");
    setAgeChecked(checked === "true");

    const ivesModeActive = localStorage.getItem("ivesModeActive")
    setIvesModeActive(ivesModeActive === "true")
  }, []);



  return (
    <div id='container'>
      {!ageChecked ? <AgeCheck ageChecked={ageChecked}
        setAgeChecked={setAgeChecked} /> : <></>}
      <Outputs id="outputs"
        boyd={arousal.boyd}
        ives={arousal.ives}
        maxBoyd={maxArousal.boyd}
        maxIves={maxArousal.ives} />
      <div className='buffer'></div>
      <div id='positioning'>
        <Body />
        <Mouth />
        <Dick />
        <Head />
        <HairPullHand />
      </div>
      <div className='buffer'></div>
      <Setters
        sensitivity={[
          {
            id: "boydSet",
            setter: value => {
              setSensitivity(prev => ({ ...prev, boyd: Number(value) }))
            },
            label: "Set Blue's sensitivity.",
            value: sensitivity.boyd
          },
          {
            id: "ivesSet",
            setter: value => {
              setSensitivity(prev => ({ ...prev, ives: Number(value) }))
            },
            label: "Set Red's sensitivity.",
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
            label: "Blue max: ",
            value: maxArousal.boyd
          },
          {
            id: "ivesMax",
            setter: value => {
              setmaxArousal(prev => ({ ...prev, ives: Number(value) }))
            },
            label: "Red max: ",
            value: maxArousal.ives
          }
        ]}
        secret={
          {
            id: "ivesModeSwitch",
            setter: setIvesMode,
          }
        }
      />
    </div>
  )
}

export default App
