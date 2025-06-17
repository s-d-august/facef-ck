import { useState, useEffect, useRef } from 'react'
import './App.css'
import icon from './assets/fonts-etc/cover.png';
import * as kkht from './functions'
import * as kihe from './assets/kkht/index'
import Dick from './assets/components/dick'
import HairPullHand from './assets/components/hair-pull-hand'
import Body from './assets/components/body'
import Head from './assets/components/head'
import Mouth from './assets/components/mouth'
import Outputs from './assets/components/outputs'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin, DrawSVGPlugin } from 'gsap/all'
import AgeCheck from './assets/kkht/age-check/age-check'

function App() {

  const [slowMorph, setSlowMorph] = useState(false)
  const [fastMorph, setFastMorph] = useState(false)
  const slowMorphRef = useRef(slowMorph)
  const fastMorphRef = useRef(fastMorph)

  const [ageChecked, setAgeChecked] = useState(false)
  const ageCheckedRef = useRef(ageChecked)

  const depthMethod = useRef("")

  const [holdMouthOpen, setHoldMouthOpen] = useState(false)
  const [mouthOpen, setMouthOpen] = useState(false)
  const [mouthOn, setMouthOn] = useState(false)
  const mouthOpenRef = useRef(mouthOpen);
  const [approach, setApproach] = useState(false)

  const droolIntervalRef = useRef(null);
  const sweatIntervalRef = useRef(null);

  const [arousal, setArousal] = useState({
    ives: 0,
    boyd: 0,
  })
  const [maxArousal, setmaxArousal] = useState({
    ives: 100,
    boyd: 100,
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
  const hairPullHandOrigin = useRef()

  const morphArgsTemplate = {
    expressionsArray: ["Wide", "Open", "Half"],
    setFastMorph: setFastMorph,
    setSlowMorph: setSlowMorph,
    fastMorph: fastMorphRef.current,
    slowMorph: slowMorphRef.current
  }

  const boundsTemplate = {
    minX: containerSize.current * -0.0055,
    maxX: containerSize.current * 0.0055,
    minY: containerSize.current * -0.07,
    maxY: containerSize.current * 0.4
  }


  gsap.registerPlugin(Draggable, DrawSVGPlugin, InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin);

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
    var hairPullDraggable = document.getElementById("hairPullHand").getBoundingClientRect()
    hairPullHandOrigin.current = { x: hairPullDraggable.x, y: hairPullDraggable.y }

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
    if (approach) {
      kihe.mouthOpenFunction({
        moveBy: containerSize.current * 0.045,
        mouthGroup: mouthGroup.current,
        tongueGroup: tongueGroup.current,
        tongueDrool: tongueDrool.current,
        mouthOpenSetter: setMouthOpen
      })
    } else {
      kihe.mouthCloseFunction({
        mouthGroup: mouthGroup.current,
        tongueGroup: tongueGroup.current,
        tongueDrool: tongueDrool.current,
        mouthOpenSetter: setMouthOpen
      })
    }
  }, [approach, holdMouthOpen])

  function mouthOpenClose() {
    if (mouthOpenRef.current === false) { // if mouth is closed
      kihe.mouthOpenFunction({
        moveBy: containerSize.current * 0.045,
        mouthGroup: mouthGroup.current,
        tongueGroup: tongueGroup.current,
        tongueDrool: tongueDrool.current,
        mouthOpenSetter: setMouthOpen
      });
      setHoldMouthOpen(true)
    } else if (mouthOpenRef.current === true) {
      kihe.mouthCloseFunction({
        mouthGroup: mouthGroup.current,
        tongueGroup: tongueGroup.current,
        tongueDrool: tongueDrool.current,
        mouthOpenSetter: setMouthOpen
      });
      setHoldMouthOpen(false)
    }
  }

  function createMainDraggable() {
    console.log("createMainDraggable called")
    Draggable.create("#hairPullHand", {
      trigger: "#hairPullHandGrab",
      onDrag: function () {

        gsap.to(hideHand.current, { opacity: 1, duration: 0.2 });
        kihe.updateFollowers({
          itemsArray: [headParts.current, body.current],
          x: this.x,
          y: this.y,
          ease: "power2",
          init: 0.25,
          increase: 0.2
        })
        kihe.updateFollowers({
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
        const percent = kihe.getOverlapPercent(headRect, dickRect, 50); // percent of headArea overlapped by dickArea

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
          maxArousal,
          setArousal
        };

        console.log("dickRect:", dickRect, "headRect:", headRect);
        console.log(percent)

        this.dragResistance = kihe.isApproachOrOn(args)

        if (depthMethod.current === "training") {
          this.applyBounds({
            minX: containerSize.current * -0.0055,
            maxX: containerSize.current * 0.0055,
            minY: containerSize.current * -0.07,
            maxY: containerSize.current * kihe.trainingMultiplier("#hairPullHand", this.y, (this.maxY || containerSize.current * 0.1), 0.2, 0.4, 5, 0.005)
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
    const interval = setInterval(() => kihe.valChange(["boyd", "ives"], "down", maxArousal, setArousal), 500);
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
        kihe.valChange("ives", "up", maxArousal, setArousal)
      }
    })

    createMainDraggable()

  }, [])

  useEffect(() => {
    console.log("MouthOn: ", mouthOn)
    console.log("MouthOpen: ", mouthOpenRef.current)
    console.log("Approach: ", approach)
  }, [approach, mouthOn, mouthOpenRef])


  useEffect(() => { // Nut function

    if (arousal.ives >= maxArousal.ives) {

      if (mouthOn) {
        console.log("before calling fastMorph")
        kihe.callFastMorph({
          ...morphArgsTemplate,
          fromState: "Open",
          toState: "Wide",
          animations: [kihe.callEyeFlutter, kihe.pantingAnimation],
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
              origin: hairPullHandOrigin.current,
              alsoMove: hairPullBeads.current
            }]

        })
        //  Draggable.get("#hairPullHand").kill()
        disableAndEnableDraggables(5)
        //   createMainDraggable()
        // Plays expression change animation and resets arousal
      }
      if (!mouthOn && mouthOpen) {
        kihe.callCumshot({
          cumType: "tongueCum"
        })
        disableAndEnableDraggables(1.5)
        // Plays cum on tongue animation
      }
      if (!mouthOn && !mouthOpen) {
        kihe.callCumshot({ cumType: "faceCum", untilEmpty: true, origin: "top", shotDuration: 0.5, moveDuration: 2.5 })
        disableAndEnableDraggables(1.5)
        // Plays cum on face animation
      }

      function disableAndEnableDraggables(sec) {
        // Disable hair pull hand
        Draggable.get("#hairPullHand")?.disable();
        // Disable all dick hand parts
        gsap.utils.toArray(".dickHandParts").forEach(el => {
          Draggable.get(el)?.disable();
        });

        // Wait, then enable
        setTimeout(() => {
          Draggable.get("#hairPullHand")?.enable();
          Draggable.get("#hairPullHand")?.update(); // <-- Add this line

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
      kihe.callSlowMorph({
        ...morphArgsTemplate,
        fromState: "Open",
        toState: "Half",
        progress: (arousalRatio / 2)
      })
    }

    var breathCycleDuration = (
      (fastMorphRef.current) ? 0
        : (arousalRatio > 0.8) ? 0.75
          : (arousalRatio > 0.6) ? 1.0625
            : (arousalRatio > 0.4) ? 1.375
              : (arousalRatio > 0.2) ? 1.6875
                : 2
    )

    var prevDuration = document.documentElement.style.getPropertyValue("--animation-duration")

    const blush = document.getElementById("blush")
    kihe.renderProgress(blush, "opacity", arousal.boyd, maxArousal.boyd)

    sweatIntervalRef.current = setInterval(() => kihe.randomizeArray({
      idString: "sweat",
      animation: kihe.drip,
      areaHeight: 322
    }), 500);

    return () => {
      if (sweatIntervalRef.current) {
        clearInterval(sweatIntervalRef.current);
        sweatIntervalRef.current = null;
      }

      if (prevDuration !== (breathCycleDuration + "s")) {
        document.documentElement.style.setProperty("--animation-duration", breathCycleDuration + "s");
      } else return
    };
  }, [arousal.boyd]);

  useEffect(() => {
    let running = true;

    // Get all sweat elements
    const sweatsParent = document.getElementById(`sweatGroup`)
    const sweats = [...sweatsParent.children]
    // Get all .eyeCenter elements
    const eyes = gsap.utils.toArray('.eyeCenter');

    console.log(running, eyes, sweats)
    kihe.hideOnOverlap({
      running: running,
      element1: sweats,
      element2: eyes
    })

    return () => {
      running = false;
    };
  }, []);


  useEffect(() => { // Elements that change based on mouthOn (including JOHand listeners)

    var dickHandDraggable = Draggable.get("#dickHandGrab")

    if (mouthOn) {
      droolIntervalRef.current = setInterval(() => kkht.randomizeArray("dickDrool", "dickArea"), 15000);
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
    // Mark as ready after check
    document.getElementById("root")?.classList.add("ready");
  }, []);

  return (
    <div id='container'>
      {!ageChecked ? <AgeCheck ageChecked={ageChecked}
        setAgeChecked={setAgeChecked} /> : <></>}
      <Outputs
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
    </div>
  )
}

export default App
