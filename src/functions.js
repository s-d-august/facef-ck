import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin } from 'gsap/all'

export const randomizeArray = (array, idString, bounds) => {
    if (array.length === 0) return

    let index = Math.floor(Math.random() * array.length); // Generates a random index for the array
    let val = array[index]; // Retrieves the value associated with the index
    let element = document.getElementById(idString + val);
    var boundsArea = !bounds ? element : document.getElementById(bounds)
    let defY = boundsArea.getBoundingClientRect().height
    console.log(defY)
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
    console.log('gsap.timeline:', typeof gsap.timeline)
    tl.to(element, defs)
        .to(element, { opacity: "0", duration: 0.3 })
        .set(element, { y: 0, opacity: 0 }); // When animation is completed, element is reset to origin
    array.splice(0, 0, val) // Adds the element back to the array so it can be called again
}


export const random = () => {
    if (Math.random() > 0.5) {
        return true
    } else return false
}

export const valChange = (ids, upDown) => {
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