import { useState, useEffect, useRef } from 'react'
import './App.css'
import Dick from './assets/dick'
import HairPullHand from './assets/hair-pull-hand'
import Body from './assets/body'
import Mouth from './assets/mouth'
import Head from './assets/head'
import HeadFull from './assets/head-full'
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
import { getOverlapPercent, updateFollowers, randomizeArray } from './functions'



function App() {

  const [mouthOn, setMouthOn] = useState(false)
  const [approach, setApproach] = useState(false)
  const [droolArray, setDroolArray] = useState([1, 2, 3, 4])
  const [sweatArray, setSweatArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
  const [headDownPercent, setHeadDownPercent] = useState(0)
  const droolIntervalRef = useRef(null);
  const mouthGroupIntervalRef = useRef(null);
  const [arousal, setArousal] = useState({
    "ives": 0,
    "boyd": 0,
  })
  const [maxArousal, setmaxArousal] = useState({
    "ives": 500,
    "boyd": 100,
  })

  gsap.registerPlugin(Draggable, InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin);

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



  useEffect(() => {
    gsap.set("#tongueGroup", { scaleY: 0 });
  }, []);

  useEffect(() => { // Elements that change based on mouthOn
    // Only set interval when mouthOn is true
    if (mouthOn) {
      droolIntervalRef.current = setInterval(() => randomizeArray(droolArray, "dickDrool"), 10000);
    }
    else {
      if (droolIntervalRef.current) {
        clearInterval(droolIntervalRef.current);
        droolIntervalRef.current = null;
      }
    }

    // Cleanup on unmount or when mouthOn changes
    return () => {
      if (droolIntervalRef.current) {
        clearInterval(droolIntervalRef.current);
        droolIntervalRef.current = null;
      }
    };
  }, [mouthOn]);

  useEffect(() => { // Elements that change based on approach state
    const containerSize = document.getElementById("container").getBoundingClientRect().height

    if (approach) {
      gsap.to("#mouthGroup", { y: containerSize * 0.045, duration: 1 })
      gsap.to("#tongueGroup", { scaleY: 1, duration: 1 })
    } else {
      gsap.to("#mouthGroup", { y: 0, duration: 2 })
      gsap.to("#tongueGroup", { scaleY: 0, duration: 2 })
    }
  }, [approach])


  useEffect(() => {
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
    const body = document.getElementById("body");
    const headFull = document.getElementById("headFull");
    const head = document.getElementById("head")
    const tongue = document.getElementById("tongue");
    const dickDroolValsArray = []

    dickDrool.forEach(function (el) {
      dickDroolValsArray.push(getDroolVals(el.id, "faceOpen"))
    })

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

  useEffect(() => {    // Update bounds for #hairPullHand Draggable when boyd or maxBoyd changes

    const container = document.getElementById("container");
    const draggable = Draggable.get("#hairPullHand");
    if (container && draggable) {
      const containerSize = container.getBoundingClientRect().height;
      const bounds = containerSize * (0.2 + (arousal["boyd"] / maxArousal["boyd"] * 0.2));
      draggable.applyBounds({
        minX: containerSize * -0.0055,
        maxX: containerSize * 0.0055,
        minY: containerSize * -0.07,
        maxY: bounds
      });
    }
  }, [arousal]);

  useEffect(() => { // Sets up opacity listeners for draggables & deactivates JOHand when mouthOn

    var dickHandDraggable = Draggable.get("#dickHandGrab")
    if (mouthOn) {

      dickHandDraggable.disable()
    } else {

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
        <HeadFull />
        <Dick />
        <Head />
        <HairPullHand />
      </div>
      <div className='buffer'></div>
    </div>
  )
}

export default App
