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

    function updateFollowers() {
      followers.forEach(f => f(this.x, this.y));
    }

    function follower(target, duration) {
      let xTo = gsap.quickTo(target, "x", { duration: duration, ease: "back" }),
        yTo = gsap.quickTo(target, "y", { duration: duration, ease: "back" });
      return (x, y) => { xTo(x); yTo(y) };
    }

    Draggable.create("#hand", {
      onDrag: updateFollowers,
      bounds: {
        minX: containerSize * -0.0055,
        maxX: containerSize * 0.0055,
        minY: containerSize * -0.022,
        maxY: containerSize * 0.3
      },
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
