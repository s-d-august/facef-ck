import { useState, useEffect } from 'react'
import './App.css'
import Dick from './assets/dick'
import Hand from './assets/hand'
import Body from './assets/body'
import Mouth from './assets/mouth'
import Head from './assets/head'
import HairPullBeads from './assets/hair-pull-beads'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin } from 'gsap/all'
import { CustomEase } from 'gsap/all'
import { CustomWiggle } from 'gsap/all'
import { Observer } from 'gsap/all'


function App() {

  const [mode, setMode] = useState(["none"])

  gsap.registerPlugin(Draggable, InertiaPlugin, CustomEase, CustomWiggle, Observer);

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

  useEffect(() => {

    const headParts = gsap.utils.toArray(".headParts");
    const hairPullBeads = gsap.utils.toArray(".hairPullBeads").reverse()
    const body = document.getElementById("body");
    const hand = document.getElementById("handGrab");
    const containerSize = document.getElementById("container").getBoundingClientRect().height
    const hideHand = document.getElementById("handBeadsDiv")

    hand.addEventListener("mouseenter", () => {
      gsap.to("#handBeadsDiv", { opacity: 1, duration: 0.2 })
    });
    hand.addEventListener("mouseleave", () => {
      if (Draggable.get("#hand").isDragging) {
        return
      } else
        gsap.to("#handBeadsDiv", { opacity: 0, duration: 0.2 })
    });

    Draggable.create("#hand", {
      trigger: "#handGrab",
      onDrag: function () {
        gsap.to("#handBeadsDiv", { opacity: 1, duration: 0.2 })
        updateFollowers.call(this, [headParts, body], "power2", 0.25, 0.2);
        updateFollowers.call(this, hairPullBeads, "back", 0.1, 0.1);
        const dickRect = document.getElementById("dickArea").getBoundingClientRect();
        const headRect = document.getElementById("headArea").getBoundingClientRect();
        const percent = getOverlapPercent(headRect, dickRect); // percent of headArea overlapped by dickArea
        if (percent < 0.1) {
          var resistance = 0
        } else {
          var resistance = percent * 3.5
        }
        this.dragResistance = resistance
      },
      bounds: {
        minX: containerSize * -0.0055,
        maxX: containerSize * 0.0055,
        // minX: containerSize * -0.5,
        // maxX: containerSize * 0.5,
        minY: containerSize * -0.07,
        maxY: containerSize * 0.3
      },
      dragResistance: 0,
      zIndexBoost: false,
      onDragEnd: function () {
        gsap.to("#handBeadsDiv", { opacity: 0, duration: 0.2 })
      }
    });

  }, [mode])

  return (
    <div id='container'>
      <Body />
      <Mouth />
      <Dick />
      <Head />
      <div id='handBeadsDiv'>
        <Hand />
        <HairPullBeads />
      </div>

    </div>
  )
}

export default App
