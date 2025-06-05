import { useState, useEffect, useRef } from 'react'
import './App.css'
import Dick from './assets/dick'
import HairPullHand from './assets/hair-pull-hand'
import Body from './assets/body'
import Head from './assets/head'
import Mouth from './assets/mouth'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin } from 'gsap/all'
import { CustomEase } from 'gsap/all'
import { CustomWiggle } from 'gsap/all'
import { Observer } from 'gsap/all'
import Outputs from './assets/outputs'
import { MorphSVGPlugin } from 'gsap/all'
import { AgeGate } from '@jmeirinkmarimed/age-gate'
import icon from './assets/cover.png';
import { getOverlapPercent, updateFollowers, randomizeArray, renderProgress, valChange } from './functions'



function App() {

  const [mouthOn, setMouthOn] = useState(false)
  const [holdMouthOpen, setHoldMouthOpen] = useState(false)
  const [mouthOpen, setMouthOpen] = useState(false)
  const mouthOpenRef = useRef(mouthOpen);
  const [approach, setApproach] = useState(false)
  const droolIntervalRef = useRef(null);
  const sweatIntervalRef = useRef(null);
  const [arousal, setArousal] = useState({
    "ives": 0,
    "boyd": 0,
  })
  const [maxArousal, setmaxArousal] = useState({
    "ives": 500,
    "boyd": 100,
  })

  gsap.registerPlugin(Draggable, InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin);

  useEffect(() => {
    mouthOpenRef.current = mouthOpen;

  }, [mouthOpen]);

  function valChange(ids, upDown) {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }
    ids.forEach((key) => {
      setArousal((prev) => {
        const newVal = upDown === "up" ? prev[key] + 1 : prev[key] - 1;
        if (upDown === "up") {
          if (newVal > maxArousal[key]) {
            return { ...prev, [key]: prev[key] };
          }
          return { ...prev, [key]: newVal };
        } else if (upDown === "down") {
          if (newVal < 0) {
            return { ...prev, [key]: 0 };
          }
          return { ...prev, [key]: newVal };
        }
        return prev;
      });
    });
  }

  function mouthOpenFunction() {
    const containerSize = document.getElementById("container").getBoundingClientRect().height
    gsap.to("#mouthGroup", { y: containerSize * 0.045, duration: 1, ease: "power1.out" })
    gsap.to("#tongueGroup", { scaleY: 1, duration: 1, ease: "power1.out" })
    gsap.timeline()
      .to("#tongueDrool", { scaleY: 1, duration: 2 })
      .to("#tongueDrool", { scaleX: 0, duration: 1, ease: "power1.in", transformOrigin: "center" })
    setMouthOpen(true)
  }

  function mouthCloseFunction() {
    gsap.to("#mouthGroup", { y: 0, duration: 2, ease: "power1.out" })
    gsap.timeline()
      .to("#tongueGroup", { scaleY: 0, duration: 2, ease: "power1.out" })
      .set("#tongueDrool", { scaleX: 1, scaleY: 0 })
    setMouthOpen(false)
  }

  function mouthOpenClose() {
    if (mouthOpenRef.current === false) {
      mouthOpenFunction();
      setHoldMouthOpen(true);
    } else {
      mouthCloseFunction();
      setHoldMouthOpen(false);
    }
  }

  useEffect(() => { // Elements that change based on approach state

    if (holdMouthOpen === true) return

    if (approach) {
      mouthOpenFunction()
    } else {
      mouthCloseFunction()
    }
  }, [approach])


  useEffect(() => {
    document.getElementById("beard").addEventListener("dblclick", mouthOpenClose)
    document.getElementById("tongue").addEventListener("dblclick", mouthOpenClose)
    gsap.set("#tongueGroup", { scaleY: 0 });
    gsap.set("#tongueDrool", { scaleY: 0, scaleX: 1 });
    const interval = setInterval(() => valChange(["boyd", "ives"], "down"), 500);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => { // Sets up draggables
    const containerSize = document.getElementById("container").getBoundingClientRect().height
    const dickHand = gsap.utils.toArray(".dickHandParts")
    const hideHand = gsap.utils.toArray(".hideHand")
    const headParts = gsap.utils.toArray(".headParts");
    const dickDrool = gsap.utils.toArray(".dickDrool");
    const hairPullBeads = gsap.utils.toArray(".hairPullBeads").reverse()
    const body = document.getElementById("bodyGroup");
    const headFull = document.getElementById("headFull");
    const head = document.getElementById("head")
    const tongue = document.getElementById("tongue");

    Draggable.create(dickHand, {
      trigger: "#dickHandGrab",
      zIndexBoost: false,
      type: "y",
      cursor: "ns-resize",
      bounds: {
        minY: containerSize * -0.07,
        maxY: containerSize * 0.07,
      },
      inertia: {
        y: {
          end: 0,
        }
      },
      edgeResistance: 0.9,
      onDrag: function () {
        valChange(["ives", "boyd"], "up")
      }
    })

    Draggable.create("#hairPullHand", {
      trigger: "#hairPullHandGrab",
      onDrag: function () {

        gsap.to(hideHand, { opacity: 1, duration: 0.2 });
        updateFollowers.call(this, [headParts, body], this.x, this.y, "power2", 0.25, 0.2);
        updateFollowers.call(this, hairPullBeads, this.x, this.y, "back", 0.1, 0.05);
        const dickRect = document.getElementById("dickArea").getBoundingClientRect();
        const headRect = document.getElementById("headArea").getBoundingClientRect();
        const percent = getOverlapPercent(headRect, dickRect); // percent of headArea overlapped by dickArea

        if (percent <= 0.05) {
          setApproach(false)
        } else setApproach(true)
        if (percent <= 0.1) { // Dick isn't in mouth
          var resistance = 0
          setMouthOn(false)
        } else { // Dick is in mouth
          setMouthOn(true)
          var resistance = percent * 3
          valChange(["boyd", "ives"], "up");
        }
        this.dragResistance = resistance
      },
      bounds: {
        minX: containerSize * -0.0055,
        maxX: containerSize * 0.0055,
        minY: containerSize * -0.07,
        maxY: containerSize * 0.2
      },
      dragResistance: 0,
      zIndexBoost: false,
      onDragEnd: function () {
        gsap.to(hideHand, { opacity: 0, duration: 0.2 })
      }
    });

  }, [])

  const tweensRef = useRef({});
  // Expression elements that have Open, HalfShut, and Shut versions
  const expressionHalf = ["face", "eyelinesRight", "eyelinesLeft", "bottomLineRight", "bottomLineLeft"]
  // Expression elements that only have Open and Shut versions
  const expressionOpenShut = ["faceShadow", "topLineLeft", "topLineRight"]

  useEffect(() => {
    // Create or update tweens for multiple elements

    expressionHalf.forEach((el) => {
      const startingY = document.getElementById(`${el}HalfShut`).getBoundingClientRect().bottom
      const finalY = document.getElementById(`${el}HalfShut`).getBoundingClientRect().bottom
      tweensRef.current[el] = gsap.to(`#${el}Open`, {
        duration: 1,
        morphSVG: `#${el}HalfShut`,
        y: (startingY - finalY),
        paused: true
      });
    });

    return () => {
      // Kill all tweens on cleanup
      Object.values(tweensRef.current).forEach(tween => tween && tween.kill());
    };
  }, []);

  useEffect(() => {    // Elements that change based on arousal.boyd

    const arousalRatio = arousal["boyd"] / maxArousal["boyd"]

    const container = document.getElementById("container");
    const draggable = Draggable.get("#hairPullHand");
    if (container && draggable) {
      const containerSize = container.getBoundingClientRect().height;
      const bounds = containerSize * (0.2 + (arousalRatio * 0.2));
      draggable.applyBounds({
        minX: containerSize * -0.0055,
        maxX: containerSize * 0.0055,
        minY: containerSize * -0.07,
        maxY: bounds
      });
    }

    Object.values(tweensRef.current).forEach(tween => {
      if (tween) tween.progress(arousalRatio);
    });

    var breathCycleDuration = (
      (arousalRatio > 0.8) ? 0.75
        : (arousalRatio > 0.6) ? 1.0625
          : (arousalRatio > 0.4) ? 1.375
            : (arousalRatio > 0.2) ? 1.6875
              : 2
    )

    var prevDuration = document.documentElement.style.getPropertyValue("--animation-duration")

    const blush = document.getElementById("blush")
    renderProgress(blush, "opacity", arousal["boyd"], maxArousal["boyd"])

    sweatIntervalRef.current = setInterval(() => randomizeArray("sweat", "faceArea"), 5000);

    return () => {
      if (sweatIntervalRef.current) {
        clearInterval(sweatIntervalRef.current);
        sweatIntervalRef.current = null;
      }

      if (prevDuration !== (breathCycleDuration + "s")) {
        document.documentElement.style.setProperty("--animation-duration", breathCycleDuration + "s");
      } else return
    };
  }, [arousal["boyd"]]);

  useEffect(() => {
    let running = true;

    function checkSweatOverlap() {
      // Get all sweat elements
      const sweatsParent = document.getElementById(`sweatGroup`)
      const sweats = [...sweatsParent.children]
      // Get all .eyeCenter elements
      const eyes = gsap.utils.toArray('.eyeCenter');

      sweats.forEach(sweat => {
        eyes.forEach(eye => {
          // 20% overlap threshold (adjust as needed)
          if (Draggable.hitTest(sweat, eye, 1)) {
            gsap.to(sweat, { opacity: 0, duration: 0.2 });
          }
        });
      });

      if (running) requestAnimationFrame(checkSweatOverlap);
    }

    checkSweatOverlap();

    return () => {
      running = false;
    };
  }, []);


  useEffect(() => { // Elements that change based on mouthOn (including JOHand listeners)

    var dickHandDraggable = Draggable.get("#dickHandGrab")

    if (mouthOn) {
      droolIntervalRef.current = setInterval(() => randomizeArray("dickDrool", "dickArea"), 15000);
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



  return (
    <div id='container'>
      <AgeGate
        minAge={18}
        confirmationType="yesNo"
        headerText="This page contains sexually explicit content!"
        subHeaderText="Are you over 18 and okay with seeing that?"
        logo={icon}
        logoWidth='250px'
        backgroundColor="#000000"
        textColor="#ffffff"
        buttonColor="#ffffff"
        buttonTextColor="#000000"
        buttonHoverColor="#e6e6e6"
        fontFamily="Benguiat"
      >
      </AgeGate>
      <Outputs
        boyd={arousal["boyd"]}
        ives={arousal["ives"]}
        maxBoyd={maxArousal["boyd"]}
        maxIves={maxArousal["ives"]} />
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
