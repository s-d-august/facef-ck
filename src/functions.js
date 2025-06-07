import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin } from 'gsap/all'
import { useRef } from 'react';

var maxYLoggedRef = {};
var multRef = {};

export const setMult = (id, y, maxY, initial, end, hits, increaseBy) => {

    if (!multRef.id) {
        Object.defineProperty(multRef, id, { value: initial })
    }

    if (!maxYLoggedRef.id) {
        Object.defineProperty(maxYLoggedRef, id, { value: 0 })
    }

    if (multRef >= end) return end;
    else if (y + 1 >= maxY) {
        maxYLoggedRef += 1;
        console.log("maxYLogged:", maxYLoggedRef);
        if (maxYLoggedRef >= hits) {
            maxYLoggedRef = 0;
            multRef = multRef + increaseBy;
        }
    }
    return multRef;
}

var mouthOpenRef = false
var holdMouthOpenRef = false

export const checkHoldMouthOpen = () => {
    return holdMouthOpenRef
}

export const mouthOpenFunction = () => {
    const containerSize = document.getElementById("container").getBoundingClientRect().height
    gsap.to("#mouthGroup", { y: containerSize * 0.045, duration: 1, ease: "power1.out" })
    gsap.to("#tongueGroup", { scaleY: 1, duration: 1, ease: "power1.out" })
    gsap.to("#tongueDrool", { scaleY: 1, duration: 2, transformOrigin: "top center" })
    mouthOpenRef = true
}

export const mouthCloseFunction = () => {
    gsap.to("#mouthGroup", { y: 0, duration: 2, ease: "power1.out" })
    gsap.to("#tongueGroup", { scaleY: 0, duration: 2, ease: "power1.out" })
    gsap.timeline()
        .to("#tongueDrool", { scaleX: 0, duration: 1, ease: "power1.in", transformOrigin: "top center" })
        .set("#tongueDrool", { scaleX: 1, scaleY: 0 })
        .set("#tongueCum", { opacity: 0 })
    mouthOpenRef = false
}

export const mouthOpenClose = () => {
    if (mouthOpenRef !== true) { // if mouth is closed
        mouthOpenFunction();
        holdMouthOpenRef = true
    } else {
        mouthCloseFunction();
        holdMouthOpenRef = false
    }
}

export const getSVGParent = (element) => {
    console.log(element)
    while (element.nodeName !== "svg") {
        element = element.parentElement;
        console.log(element.nodeName)
    }
    return element;
}

export const getXY = (id, origin) => {

    var element = document.getElementById(id)

    var svg = getSVGParent(element)

    const rect = element.getBoundingClientRect();
    console.log(svg)

    const pt = svg.createSVGPoint();
    if (origin == "top left" || origin == "left top") {
        pt.x = rect.x
        pt.y = rect.y
    } else if (origin == "top right" || origin == "right top") {
        pt.x = rect.x + rect.width
        pt.y = rect.y + rect.height
    } else {
        pt.x = rect.x + rect.width / 2;
        pt.y = rect.y + rect.height / 2;
    }

    const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());

    return { x: svgPt.x, y: svgPt.y }
}

export const randomizeArray = (idString, bounds) => {

    var arrayName = document.getElementById(`${idString}Group`)
    var array = [...arrayName.children]

    if (array.length === 0 || !document.hasFocus()) return

    let index = Math.floor(Math.random() * array.length); // Generates a random index for the array
    let element = array[index]; // Retrieves the value associated with the index
    var boundsArea = document.getElementById(bounds)
    let defY = boundsArea.getBoundingClientRect().height
    array.splice(index, 1) // Removes the selected element from the array

    gsap.set(element, { opacity: 1 })
    var defs = {
        transformOrigin: "top center",
        y: defY, // Moves the element down and offscreen
        scaleY: (Math.random() + 1), // Stretches the element down between 100-200%
        duration: defY / (Math.random() * 2 + 4) // Duration is the pixel value of y divided by between 4-6, in seconds
    };
    if (random()) {
        gsap.set(element, { transformOrigin: "center", scaleX: -1 }) // 50% chance of flipping element horizontally
    }
    let tl = gsap.timeline()
    tl.to(element, defs)
        .to(element, { opacity: "0", duration: 0.3 })
        .set(element, { y: 0, opacity: 0 }); // When animation is completed, element is reset to origin
    array.splice(0, 0, element) // Adds the element back to the array so it can be called again
}

export const random = () => {
    if (Math.random() > 0.5) {
        return true
    } else return false
}

export const valChange = (ids, upDown, max, setter) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    ids.forEach((key) => {
        setter((prev) => {
            const newVal = upDown === "up" ? prev[key] + 1 : prev[key] - 1;
            if (upDown === "up") {
                if (newVal > max[key]) {
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

export const updateFollowers = (itemsArray, x, y, ease, init, increase) => {

    function follower(target, duration, ease) {
        let xTo = gsap.quickTo(target, "x", { duration: duration, ease: ease }),
            yTo = gsap.quickTo(target, "y", { duration: duration, ease: ease });
        return (x, y) => { xTo(x); yTo(y) };
    }

    const followers = itemsArray.map(
        (el, i) => follower(el, init + i * increase, ease)
    );

    followers.forEach(f => f(x, y));
}

export const getOverlapPercent = (rectA, rectB) => {
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

export const renderProgress = (element, attr, stat, max) => {
    const newVal = function (stat) {
        if (stat >= max) { return 100 }
        else return stat / max * 100
    }
    element.style[attr] = (newVal(stat) || 0) + '%'
}