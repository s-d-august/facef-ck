import { useState, useEffect } from 'react'
import './App.css'
import Dick from './assets/dick'
import Hand from './assets/hand'
import Body from './assets/body'
import Mouth from './assets/mouth'
import Head from './assets/head'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin } from 'gsap/all'

function App() {

  gsap.registerPlugin(Draggable, InertiaPlugin);

  useEffect(() => {

    const headParts = gsap.utils.toArray(".headParts");

    const body = document.getElementById("body");

    const containerSize = document.getElementById("container").getBoundingClientRect().height

    const followers = [headParts, body].map(
      (el, i) => follower(el, 0.25 + i * 0.1)
    );

    console.log(followers)

    function updateFollowers() {
      followers.forEach(f => f(this.x, this.y));
    }

    function follower(target, duration) {
      let xTo = gsap.quickTo(target, "x", { duration: duration, ease: "back" }),
        yTo = gsap.quickTo(target, "y", { duration: duration, ease: "back" });
      return (x, y) => { xTo(x); yTo(y) };
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

    const [headArea] = Draggable.create("#headArea");
    var resistance


    Draggable.create("#hand", {
      onDrag: function () {
        updateFollowers.call(this)
        const dickRect = document.getElementById("dickArea").getBoundingClientRect();
        const headRect = document.getElementById("headArea").getBoundingClientRect();
        const percent = getOverlapPercent(headRect, dickRect); // percent of headArea overlapped by dickArea
        if (percent < 0.1) {
          resistance = 0
        } else {
          resistance = percent * 3
        }
        this.dragResistance = resistance
        console.log(percent)
      },
      bounds: {
        minX: containerSize * -0.0055,
        maxX: containerSize * 0.0055,
        minY: containerSize * -0.022,
        maxY: containerSize * 0.3
      },
      dragResistance: 0
    });
  }, [])




  return (
    <div id='container'>
      <Body />
      <Mouth />
      <Dick />
      <Head />
      <Hand />
    </div>
  )
}

export default App
