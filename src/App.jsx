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
import { DrawSVGPlugin } from 'gsap/all'
import { AgeGate } from '@jmeirinkmarimed/age-gate'
import icon from './assets/cover.png';
import { checkHoldMouthOpen, setMult, getOverlapPercent, updateFollowers, randomizeArray, renderProgress, valChange, mouthOpenClose, mouthCloseFunction, mouthOpenFunction, getXY } from './functions'



function App() {

  const [mouthOn, setMouthOn] = useState(false)
  const [holdMouthOpen, setHoldMouthOpen] = useState(false)
  const [mouthOpen, setMouthOpen] = useState("closed")
  const mouthOpenRef = useRef(mouthOpen);
  const [approach, setApproach] = useState(false)
  const droolIntervalRef = useRef(null);
  const sweatIntervalRef = useRef(null);
  const [arousal, setArousal] = useState({
    ives: 0,
    boyd: 0,
  })
  const [maxArousal, setmaxArousal] = useState({
    ives: 500,
    boyd: 100,
  })

  gsap.registerPlugin(Draggable, DrawSVGPlugin, InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin);

  useEffect(() => {
    mouthOpenRef.current = mouthOpen;
  }, [mouthOpen]);

  useEffect(() => { // Elements that change based on approach state

    if (checkHoldMouthOpen()) return

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
    const interval = setInterval(() => valChange(["boyd", "ives"], "down", maxArousal, setArousal), 500);
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
        valChange("ives", "up", maxArousal, setArousal)
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
          valChange(["boyd", "ives"], "up", maxArousal, setArousal);
        }
        this.dragResistance = resistance

        this.applyBounds({
          minX: containerSize * -0.0055,
          maxX: containerSize * 0.0055,
          minY: containerSize * -0.07,
          maxY: containerSize * setMult("#hairPullHand", this.y, this.maxY, 0.2, 0.4, 5, 0.05)
        });
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

  function cumAnimation(cumId, shotDuration, moveDuration, origin) {
    const cumshot = document.getElementById("cumshot")
    const cumVals = getXY(cumId, origin)
    cumshot.setAttribute('x2', cumVals.x)
    cumshot.setAttribute('y2', cumVals.y)
    gsap.set("#cumshot", { opacity: 0.9 })
    gsap.timeline().fromTo(
      "#cumshot",
      { drawSVG: "0 30%" },
      {
        duration: (shotDuration || 0.25),
        drawSVG: "70% 100%"
      })
      .set("#cumshot", { opacity: 0 })
      .set(`#${cumId}`, { opacity: .8, scale: 0.6, transformOrigin: (origin || "center") })
      .to(`#${cumId}`, { scale: 1, duration: (moveDuration || 1), ease: "power1.out" })
  }

  useEffect(() => { // Nut function

    if (arousal.ives >= maxArousal.ives) {

      if (mouthOn) {
        console.log("mouthOn")
        // Plays expression change animation and resets arousal
      }
      if (!mouthOn && mouthOpenRef.current) {
        cumAnimation("tongueCum", 0.25, 0.6)
        // Plays cum on tongue animation
      }
      if (!mouthOn && !mouthOpenRef.current) {
        cumAnimation("faceCum", 0.4, 1.5, "top left")
        // Plays cum on face animation
      }
      setArousal(prev => ({ ...prev, ives: 0 }))
    }
  }, [arousal.ives])

  const expressionTweensRef = useRef([]);

  useEffect(() => {
    // Create or update tweens for multiple elements

    expressionChange("Open", "HalfShut")

  }, []);

  function clearDupes(arr1, arr2) {
    // Make shallow copies to avoid mutating the originals
    let a = [...arr1];
    let b = [...arr2];

    // Remove identical elements from the larger array
    for (let i = 0; i < b.length; i++) {
      const idx = a.indexOf(b[i]);
      if (idx !== -1) {
        a.splice(idx, 1);
      }
    }

    return [a];
  }
  function matchID(el,
    startString, // The string associated with the start state (ie "Open")
    endString // The string associated with the start state (ie "HalfShut")
  ) {
    const startID = el.id.toString() // Gets the ID of the original element
    const stateless = startID.replace(startString, "") // Removes the state string from the ID to get the element name
    const endID = stateless + endString // Concats the element name with the end state string to get the ID for the matching element
    if (document.getElementById(endID)) {
      return document.getElementById(endID)
    } else console.log("Element with ID " + endID + " not found!")
  }

  function expressionChange(fromState, toState) {
    // Get all elements whose id contains fromState and toState
    var fromArray = document.querySelectorAll(`[id*="${fromState}"]`);
    var stateName = fromState + "-" + toState
    console.log(stateName)

    // Cleans up duplicate elements if one state name contains another (ie "HalfOpen" and "Open")
    if (fromState.includes(toState) || toState.includes(fromState)) {
      var toArray = document.querySelectorAll(`[id*="${toState}"]`);
      fromArray = clearDupes(fromArray, toArray);
    }

    // Initialize the object for this state if it doesn't exist
    if (!expressionTweensRef.current[stateName]) {
      expressionTweensRef.current[stateName] = {};
    }



    fromArray.forEach((el) => {
      // Use el.id as the key, or el if you prefer
      const match = matchID(el, fromState, toState)
      if (!match) return

      expressionTweensRef.current[stateName][el.id] = gsap.to(el, {
        duration: 1,
        morphSVG: match,
        y: 0,
        paused: true
      });
    });

    return () => {
      // Kill all tweens on cleanup
      Object.values(expressionTweensRef.current[stateName]).forEach(tween => tween && tween.kill());
    };
  }

  useEffect(() => {    // Elements that change based on arousal.boyd

    const arousalRatio = arousal.boyd / maxArousal.boyd
    /*
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
        } */

    Object.values(expressionTweensRef.current["Open-HalfShut"]).forEach(tween => {
      if (tween) tween.progress(arousalRatio / 2);
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
    renderProgress(blush, "opacity", arousal.boyd, maxArousal.boyd)

    sweatIntervalRef.current = setInterval(() => randomizeArray("sweat", "faceArea"), 10000);

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

    function checkSweatOverlap() {
      // Get all sweat elements
      const sweatsParent = document.getElementById(`sweatGroup`)
      const sweats = [...sweatsParent.children]
      // Get all .eyeCenter elements
      const eyes = gsap.utils.toArray('.eyeCenter');

      sweats.forEach(sweat => {
        eyes.forEach(eye => {
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
