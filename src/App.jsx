import { useState, useEffect, useRef } from 'react'
import './App.css'
import icon from './assets/cover.png';
import * as kkht from './functions'
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

  const [mouthOn, setMouthOn] = useState(false)
  const [mouthOpen, setMouthOpen] = useState(false)
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

  gsap.registerPlugin(Draggable, DrawSVGPlugin, InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin);

  useEffect(() => {
    mouthOpenRef.current = mouthOpen;
  }, [mouthOpen]);

  useEffect(() => { // Elements that change based on approach state

    if (kkht.checkHoldMouthOpen()) return

    if (approach) {
      kkht.mouthOpenFunction()
    } else {
      kkht.mouthCloseFunction()
    }
  }, [approach])


  useEffect(() => {
    document.getElementById("beard").addEventListener("dblclick", kkht.mouthOpenClose)
    document.getElementById("tongue").addEventListener("dblclick", kkht.mouthOpenClose)
    gsap.set("#tongueGroup", { scaleY: 0 });
    gsap.set("#tongueDrool", { scaleY: 0, scaleX: 1 });
    const interval = setInterval(() => kkht.valChange(["boyd", "ives"], "down", maxArousal, setArousal), 500);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => { // Sets up draggables
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
        kkht.valChange("ives", "up", maxArousal, setArousal)
      }
    })

    Draggable.create("#hairPullHand", {
      trigger: "#hairPullHandGrab",
      onDrag: function () {

        gsap.to(hideHand, { opacity: 1, duration: 0.2 });
        kkht.updateFollowers.call(this, [headParts, body], this.x, this.y, "power2", 0.25, 0.2);
        kkht.updateFollowers.call(this, hairPullBeads, this.x, this.y, "back", 0.1, 0.05);
        const dickRect = document.getElementById("dickArea").getBoundingClientRect();
        const headRect = document.getElementById("headArea").getBoundingClientRect();
        const percent = kkht.getOverlapPercent(headRect, dickRect); // percent of headArea overlapped by dickArea

        if (percent <= 0.05) {
          setApproach(false)
        } else setApproach(true)
        if (percent <= 0.1) { // Dick isn't in mouth
          var resistance = 0
          setMouthOn(false)
          if (Draggable.hitTest("#tongue", "#dickHead", "20%")) {
            kkht.valChange(["boyd", "ives"], "up", maxArousal, setArousal);
          }
        } else { // Dick is in mouth
          setMouthOn(true)
          var resistance = percent * 3
          kkht.valChange(["boyd", "ives"], "up", maxArousal, setArousal);
        }
        this.dragResistance = resistance


        if (kkht.depthMethod() === "training") {
          this.applyBounds({
            minX: containerSize * -0.0055,
            maxX: containerSize * 0.0055,
            minY: containerSize * -0.07,
            maxY: containerSize * kkht.setMult("#hairPullHand", this.y, (this.maxY || containerSize * 0.1), 0.2, 0.4, 5, 0.005)
          });
        } else this.applyBounds({
          minX: containerSize * -0.0055,
          maxX: containerSize * 0.0055,
          minY: containerSize * -0.07,
          maxY: containerSize * 0.4
        }
        )
      },
      dragResistance: 0,
      zIndexBoost: false,
      onDragEnd: function () {
        gsap.to(hideHand, { opacity: 0, duration: 0.2 })
      }
    });

  }, [])



  useEffect(() => { // Nut function

    if (arousal.ives >= maxArousal.ives) {

      if (mouthOn) {
        kkht.renderChange("Open", "Wide", 0, 1)
        // Plays expression change animation and resets arousal
      }
      if (!mouthOn && mouthOpenRef.current) {
        kkht.cumAnimation("tongueCum", 0.25, 0.6)
        // Plays cum on tongue animation
      }
      if (!mouthOn && !mouthOpenRef.current) {
        kkht.cumAnimation("faceCum", 0.4, 1.5, "top left")
        // Plays cum on face animation
      }
      function disableAndEnableDraggables() {
        // Disable hair pull hand
        Draggable.get("#hairPullHand")?.disable();
        // Disable all dick hand parts
        gsap.utils.toArray(".dickHandParts").forEach(el => {
          Draggable.get(el)?.disable();
        });

        // Wait 4 seconds, then enable
        setTimeout(() => {
          Draggable.get("#hairPullHand")?.enable();
          gsap.utils.toArray(".dickHandParts").forEach(el => {
            Draggable.get(el)?.enable();
          });
        }, 2500);
      }
      disableAndEnableDraggables()
      setArousal(prev => ({ ...prev, ives: 0 }))
    }
  }, [arousal.ives])

  useEffect(() => {    // Elements that change based on arousal.boyd

    const arousalRatio = arousal.boyd / maxArousal.boyd

    if (kkht.depthMethod() === "arousal") {
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
    if (!kkht.isInterrupted()) {
      kkht.renderChange("Open", "Half", (arousalRatio / 2))
    }

    var breathCycleDuration = (
      (arousalRatio > 0.8) ? 0.75
        : (arousalRatio > 0.6) ? 1.0625
          : (arousalRatio > 0.4) ? 1.375
            : (arousalRatio > 0.2) ? 1.6875
              : 2
    )

    var prevDuration = document.documentElement.style.getPropertyValue("--animation-duration")

    const blush = document.getElementById("blush")
    kkht.renderProgress(blush, "opacity", arousal.boyd, maxArousal.boyd)

    sweatIntervalRef.current = setInterval(() => kkht.randomizeArray("sweat", "faceArea"), 10000);

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
