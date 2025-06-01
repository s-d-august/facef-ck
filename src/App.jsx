import { useState, useEffect, useRef } from 'react'
import './App.css'
import Dick from './assets/dick'
import HairPullHand from './assets/hair-pull-hand'
import Body from './assets/body'
import Mouth from './assets/mouth'
import Head from './assets/head'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin } from 'gsap/all'
import { CustomEase } from 'gsap/all'
import { CustomWiggle } from 'gsap/all'
import { Observer } from 'gsap/all'
import Outputs from './assets/outputs'
import { MorphSVGPlugin } from 'gsap/all'
import { AgeGate } from '@jmeirinkmarimed/age-gate'
import icon from './assets/icon.png';



function App() {

  const [ives, setIves] = useState(0)
  const [boyd, setBoyd] = useState(0)
  const [maxIves, setMaxIves] = useState(500)
  const [maxBoyd, setMaxBoyd] = useState(100)
  const [mouthOn, setMouthOn] = useState(false)
  const [droolArray, setDroolArray] = useState([1, 2, 3, 4])
  const droolIntervalRef = useRef(null);

  gsap.registerPlugin(Draggable, InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin);

  function random() {
    if (Math.random() > 0.5) {
      return true
    } else return false
  }

  function valUp() {
    setIves((prevIves) => {
      const newIves = prevIves + 1;
      if (newIves > maxIves) {
        return 0; // Do not increment further if max is reached
      }
      return newIves; // Increment Ives
    });
    setBoyd((prevBoyd) => {
      const newBoyd = prevBoyd + 1;
      if (newBoyd > maxBoyd) {
        return prevBoyd; // Do not increment further if max is reached
      }
      return newBoyd; // Increment Boyd
    });
  };

  function updateFollowers(itemsArray, ease, init, increase) {

    function follower(target, duration, ease) {
      let xTo = gsap.quickTo(target, "x", { duration: duration, ease: ease }),
        yTo = gsap.quickTo(target, "y", { duration: duration, ease: ease });
      return (x, y) => { xTo(x); yTo(y) };
    }

    const followers = itemsArray.map(
      (el, i) => follower(el, init + i * increase, ease)
    );

    followers.forEach(f => f(this.x, this.y));
  }

  function getOverlapPercent(rectA, rectB) {
    const x_overlap = Math.max(
      0,
      Math.min(rectA.right, rectB.right) - Math.max(rectA.left, rectB.left)
    );
    const y_overlap = Math.max(
      0,
      Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top)
    );
    const overlapArea = x_overlap * y_overlap;
    const areaA = (rectA.right - rectA.left) * (rectA.bottom - rectA.top);
    return areaA ? (overlapArea / areaA) : 0; // percent of A overlapped by B
  }

  function fadeIn(hoverArea, fullArea, dragElement) {
    hoverArea.addEventListener("mouseenter", () => {
      gsap.to(fullArea, { opacity: 1, duration: 0.2 })
    });
    hoverArea.addEventListener("mouseleave", () => {
      if (Draggable.get(dragElement).isDragging) {
        return
      } else
        gsap.to(fullArea, { opacity: 0, duration: 0.2 })
    });
  }

  function valDown() {
    setBoyd((prevBoyd) => {
      const newBoyd = prevBoyd - 1;
      if (newBoyd < 0) {
        return 0; // Do not decrement below 0
      }
      return newBoyd;
    });

    setIves((prevIves) => {
      const newIves = prevIves - 1;
      if (newIves < 0) {
        return 0; // Do not decrement below 0
      }
      return newIves;
    });
  }

  function getDroolVals(id, overlapId) {
    const head = document.getElementById(overlapId);
    const drool = document.getElementById(id);
    const droolRect = drool.getBoundingClientRect();
    const headRect = head.getBoundingClientRect();
    return {
      drool,
      droolBottom: droolRect.bottom,
      headBottom: headRect.bottom,
      defY: droolRect.top
    };
  }


  function showDrool() {
    if (droolArray.length === 0) return

    let index = Math.floor(Math.random() * droolArray.length); // Generates a random index for the array
    let val = droolArray[index]; // Retrieves the value associated with the index
    console.log(index)
    console.log(droolArray)
    let drool = document.getElementById(`dickDrool${val}`);
    let defY = drool.getBoundingClientRect().top

    droolArray.splice(index, 1) // Removes the selected element from the array


    drool.classList.remove("opacity0"); // Makes element visible
    var defs = {
      transformOrigin: "top center",
      y: defY, // Moves the element down and offscreen
      scaleY: (Math.random() + 1), // Stretches the element down between 100-200%
      duration: defY / (Math.random() * 2 + 4) // Duration is the pixel value of y divided by between 4-6, in seconds
    };
    if (random()) {
      gsap.set(drool, { transformOrigin: "center", scaleX: -1 }) // 50% chance of flipping element horizontally
    }
    gsap.to(drool, defs) // Element is moved
      .then(() => {
        gsap.set(drool, { y: 0 }); // When animation is completed, element is reset to origin
        drool.classList.add("opacity0");
        droolArray.splice(0, 0, val) // Adds the element back to the array so it can be called again
      })

  }

  useEffect(() => {
    // Only set interval when mouthOn is true
    if (mouthOn) {
      droolIntervalRef.current = setInterval(showDrool, 10000);
    } else {
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


  useEffect(() => { // Lowers values gradually
    const interval = setInterval(valDown, 500);
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
      onDrag: valUp
    })

    Draggable.create("#hairPullHand", {
      trigger: "#hairPullHandGrab",
      onDrag: function () {
        gsap.to(hideHand, { opacity: 1, duration: 0.2 });
        updateFollowers.call(this, [headParts, body], "power2", 0.25, 0.2);
        updateFollowers.call(this, hairPullBeads, "back", 0.1, 0.05);
        const dickRect = document.getElementById("dickArea").getBoundingClientRect();
        const headRect = document.getElementById("headArea").getBoundingClientRect();
        const percent = getOverlapPercent(headRect, dickRect); // percent of headArea overlapped by dickArea
        if (percent < 0.1) { // Dick isn't in mouth
          var resistance = 0
          setMouthOn(false)
        } else { // Dick is in mouth
          setMouthOn(true)
          var resistance = percent * 3

          valUp();
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
      const bounds = containerSize * (0.2 + (boyd / maxBoyd * 0.2));
      draggable.applyBounds({
        minX: containerSize * -0.0055,
        maxX: containerSize * 0.0055,
        minY: containerSize * -0.07,
        maxY: bounds
      });
    }
  }, [boyd, maxBoyd]);

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
        logoWidth="200px"
        backgroundColor="#000000"
        textColor="#ffffff"
        buttonColor="#ffffff"
        buttonTextColor="#000000"
        buttonHoverColor="#e6e6e6"
        fontFamily="Benguiat"
      />
      <Outputs
        boyd={boyd}
        ives={ives}
        maxBoyd={maxBoyd}
        maxIves={maxIves} />
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
