import { useState, useEffect } from 'react'
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


function App() {

  const [ives, setIves] = useState(0)
  const [boyd, setBoyd] = useState(0)
  const [maxIves, setMaxIves] = useState(500)
  const [maxBoyd, setMaxBoyd] = useState(100)
  const [mouthOn, setMouthOn] = useState(false)

  gsap.registerPlugin(Draggable, InertiaPlugin, CustomEase, CustomWiggle, Observer, MorphSVGPlugin);

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
    var head = document.getElementById(overlapId)
    var drool = document.getElementById(id)
    var droolArea = drool.getBoundingClientRect()
    var headVal = head.getBoundingClientRect().bottom
    console.log(droolArea)
    console.log(head.getBoundingClientRect())
    return {
      drool: drool,
      overlapY: (droolArea.bottom + (droolArea.height * 1.5) - headVal),
      defY: droolArea.top
    }
  }

  function showDrool({ drool, overlapY, defY }) {
    console.log(overlapY)
    console.log(this.y)
    if ((this.y) >= overlapY && drool.classList.contains("opacity0")) {
      drool.classList.remove("opacity0")
      gsap.to(drool, { y: defY, duration: defY })
        .then(() => {
          gsap.set(drool, { y: defY * -1 })
          drool.classList.add("opacity0")
        })
    }
  }


  useEffect(() => {
    const interval = setInterval(valDown, 500);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
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
      dickDroolValsArray.push(getDroolVals(el.id, "headArea"))
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
        dickDroolValsArray.forEach(showDrool, this)
        gsap.to(hideHand, { opacity: 1, duration: 0.2 });
        updateFollowers.call(this, [headParts, body], "power2", 0.25, 0.2);
        updateFollowers.call(this, hairPullBeads, "back", 0.1, 0.05);
        const dickRect = document.getElementById("dickArea").getBoundingClientRect();
        const headRect = document.getElementById("headArea").getBoundingClientRect();
        const percent = getOverlapPercent(headRect, dickRect); // percent of headArea overlapped by dickArea
        if (percent < 0.1) {
          var resistance = 0
          setMouthOn(false)
        } else {
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

  useEffect(() => {
    // Update bounds for #hairPullHand Draggable when boyd or maxBoyd changes
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

  useEffect(() => {

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
