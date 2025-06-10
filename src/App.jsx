import { useState, useEffect, useRef } from 'react'
import './App.css'
import icon from './assets/fonts-etc/cover.png';
import * as util from './stateless-functions.js'
import * as anim from './animations.js'
import { useAnimationFunctions } from './AnimationFunctions.jsx';
import Dick from './assets/components/dick'
import HairPullHand from './assets/components/hair-pull-hand'
import Body from './assets/components/body'
import Head from './assets/components/head'
import Mouth from './assets/components/mouth'
import Outputs from './assets/components/outputs'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin, DrawSVGPlugin } from 'gsap/all'
import { AgeGate } from '@jmeirinkmarimed/age-gate'

function App() {

  const depthMethod = useRef("null")
  const kkht = useAnimationFunctions()
  const [mouthOn, setMouthOn] = useState(false)
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

  gsap.registerPlugin(Draggable, DrawSVGPlugin, InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin);

  useEffect(() => { // Elements that change based on approach state
    console.log("useEffect [approach] fired", { approach, holdMouthOpen: kkht.holdMouthOpen });

    if (kkht.holdMouthOpen) return

    if (approach) {
      console.log("Calling mouthOpenFunction from approach effect");
      kkht.mouthOpenFunction()
    } else {
      console.log("Calling mouthCloseFunction from approach effect");
      kkht.mouthCloseFunction()
    }
  }, [approach])


  useEffect(() => {
    console.log("useEffect [] fired (componentDidMount)");
    document.getElementById("beard").addEventListener("dblclick", kkht.mouthOpenClose)
    document.getElementById("tongue").addEventListener("dblclick", kkht.mouthOpenClose)
    gsap.set("#tongueGroup", { scaleY: 0 });
    gsap.set("#tongueDrool", { scaleY: 0, scaleX: 1 });
    const interval = setInterval(() => util.valChange(["boyd", "ives"], "down", maxArousal, setArousal), 500);
    return () => {
      console.log("Cleanup interval on unmount");
      clearInterval(interval);
    }
  }, []);

  useEffect(() => { // Sets up draggables
    console.log("useEffect [] fired (draggables setup)");
    const containerSize = document.getElementById("container").getBoundingClientRect().height
    const hideHand = gsap.utils.toArray(".hideHand")
    const headParts = gsap.utils.toArray(".headParts");
    const hairPullBeads = gsap.utils.toArray(".hairPullBeads").reverse()
    const body = document.getElementById("bodyGroup");

    Draggable.create(".dickHandParts", {
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
        console.log("dickHandParts onDrag");
        util.valChange("ives", "up", maxArousal, setArousal)
      }
    })

    Draggable.create("#hairPullHand", {
      trigger: "#hairPullHandGrab",
      onDrag: function () {
        console.log("hairPullHand onDrag");

      },
      dragResistance: 0,
      zIndexBoost: false,
      onDragEnd: function () {
        console.log("hairPullHand onDragEnd");
        gsap.to(hideHand, { opacity: 0, duration: 0.2 })
      }
    });

  }, [])


  useEffect(() => { // Nut function
    console.log("useEffect [arousal.ives] fired", { arousal, mouthOn, isMouthOpen: kkht.isMouthOpen });

    if (arousal.ives >= maxArousal.ives) {

      if (mouthOn) {
        console.log("Calling callFastMorph for mouthOn nut");
        kkht.callFastMorph("Open", "Wide", [anim.tearsAnimation, anim.pantingAnimation], [anim.eyeFlutterWideAnimation])
      }
      if (!mouthOn && kkht.isMouthOpen) {
        console.log("Calling cumAnimation for tongueCum");
        kkht.cumAnimation("tongueCum", 0.25, 0.6)
      }
      if (!mouthOn && !kkht.isMouthOpen) {
        console.log("Calling cumAnimation for faceCum");
        kkht.cumAnimation("faceCum", 0.4, 3, "top center", "scaleY", true)
      }

      util.pauseDraggable([".dickHandParts", "#hairPullHand"], 5000)
      setArousal(prev => ({ ...prev, ives: 0 }))
    }
  }, [arousal.ives])

  useEffect(() => {    // Elements that change based on arousal.boyd
    console.log("useEffect [arousal.boyd, fastMorph, slowMorph] fired", { arousal, fastMorph: kkht.fastMorph, slowMorph: kkht.slowMorph });

    const arousalRatio = arousal.boyd / maxArousal.boyd

    if (depthMethod.current === "arousal") {
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
    }

    console.log(kkht.fastMorph)
    if (!kkht.fastMorph) {
      console.log("Calling callSlowMorph from arousal.boyd effect");
      kkht.callSlowMorph("Open", "Half", (arousalRatio / 2))
    }

    var breathCycleDuration = (
      (kkht.fastMorph) ? 0
        : (arousalRatio > 0.8) ? 0.75
          : (arousalRatio > 0.6) ? 1.0625
            : (arousalRatio > 0.4) ? 1.375
              : (arousalRatio > 0.2) ? 1.6875
                : 2
    )

    var prevDuration = document.documentElement.style.getPropertyValue("--animation-duration")

    const blush = document.getElementById("blush")
    if (blush) {
      util.renderProgress(blush, "opacity", arousal.boyd, maxArousal.boyd)
    }

    var boundsArea = document.getElementById("headArea")
    var initialY = boundsArea.getBoundingClientRect().height
    sweatIntervalRef.current = setInterval(() => {
      console.log("Sweat interval: calling randomizeArray");
      kkht.randomizeArray("sweat", kkht.drip, initialY)
    }, 10000);

    return () => {
      if (sweatIntervalRef.current) {
        console.log("Clearing sweat interval");
        clearInterval(sweatIntervalRef.current);
        sweatIntervalRef.current = null;
      }

      if (prevDuration !== (breathCycleDuration + "s")) {
        document.documentElement.style.setProperty("--animation-duration", breathCycleDuration + "s");
      } else return
    };
  }, [arousal.boyd, kkht.fastMorph, kkht.slowMorph]);

  useEffect(() => {
    console.log("useEffect [] fired (sweat overlap check)");
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
    console.log("useEffect [mouthOn] fired", { mouthOn });

    var dickHandDraggable = Draggable.get("#dickHandGrab")

    var boundsArea = document.getElementById("dickArea")
    var initialY = boundsArea.getBoundingClientRect().height

    if (mouthOn) {
      console.log("Setting up drool interval for dickDrool");
      droolIntervalRef.current = setInterval(() => kkht.randomizeArray("dickDrool", kkht.drip, initialY), 15000);
      dickHandDraggable.disable()
    } else {
      if (droolIntervalRef.current) {
        console.log("Clearing drool interval for dickDrool");
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
        console.log("hairPullHand mouseenter");
        gsap.to(hideHand, { opacity: 1, duration: 0.2 });
      };
      hairLeave = () => {
        console.log("hairPullHand mouseleave");
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
        console.log("dickHand mouseenter");
        dickHand.forEach(el => el.classList.remove("opacity0"));
        gsap.to(dickHand, { opacity: 1, duration: 0.2 });
      };
      dickLeave = () => {
        console.log("dickHand mouseleave");
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
