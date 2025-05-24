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

    const crossBeads = gsap.utils.toArray(".crossBeads").reverse()

    const body = document.getElementById("body");

    const containerSize = document.getElementById("container").getBoundingClientRect().height

    function updateFollowers(itemsArray, ease) {

      function follower(target, duration, ease) {
        let xTo = gsap.quickTo(target, "x", { duration: duration, ease: ease }),
          yTo = gsap.quickTo(target, "y", { duration: duration, ease: ease });
        return (x, y) => { xTo(x); yTo(y) };
      }

      const followers = itemsArray.map(
        (el, i) => follower(el, 0.25 + i * 0.1, ease)
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

    Draggable.create("#hand", {
      onDrag: function () {
        updateFollowers.call(this, [headParts, body, ...crossBeads], "back");

        const dickRect = document.getElementById("dickArea").getBoundingClientRect();
        const headRect = document.getElementById("headArea").getBoundingClientRect();
        const percent = getOverlapPercent(headRect, dickRect); // percent of headArea overlapped by dickArea
        if (percent < 0.1) {
          var resistance = 0
        } else {
          var resistance = percent * 3.5
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
      dragResistance: 0,
      zIndexBoost: false
    });
  }, [])




  return (
    <div id='container'>
      <Body />
      <Mouth />
      <Dick />
      <Head />
      <Hand />
      <svg
        version="1.1"
        viewBox="0 0 1482.262 1233.252"
        className='noInteract'
      >
        <g
          fill="#2b1100"
          fillOpacity="1"
          fillRule="nonzero"
        >
          <path className="crossBeads" d="M1108.63 337.634v19.08h-19.08v16.959h19.08v49.025h16.96v-49.025h19.08v-16.959h-19.08v-19.08Z"></path>
          <path className="crossBeads" d="M1117.43 312.51c-5.52 0-10 4.476-10 10 0 5.522 4.48 10 10 10s10-4.478 10-10c0-5.524-4.48-10-10-10"></path>
          <path className="crossBeads" d="M1117.43 287.064c-5.52 0-10 4.478-10 10s4.48 10.001 10 10.001 10-4.478 10-10.001-4.48-10-10-10"></path>
          <path className="crossBeads" d="M1117.43 261.619c-5.52 0-10 4.477-10 10s4.48 10.002 10 10.002 10-4.48 10-10.002-4.48-10-10-10"></path>
          <path className="crossBeads" d="M1117.43 236.173c-5.52 0-10 4.478-10 10.001 0 5.524 4.48 10 10 10s10-4.476 10-10c0-5.523-4.48-10.001-10-10.001"></path>
          <path className="crossBeads" d="M1117.43 210.728c-5.52 0-10 4.478-10 10 0 5.524 4.48 10.002 10 10.002s10-4.478 10-10.002c0-5.522-4.48-10-10-10"></path>
        </g>
      </svg>
    </div>
  )
}

export default App
