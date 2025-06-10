export const renderProgress = (element, attr, stat, max) => {
    const newVal = function (stat) {
        if (stat >= max) { return 100 }
        else return stat / max * 100
    }
    element.style[attr] = (newVal(stat) || 0) + '%'
}

export const clearDupes = (arr1, arr2) => {
    // Make shallow copies to avoid mutating the originals
    let a = [...arr1];
    let b = [...arr2];

    // Remove identical elements from the larger array
    for (let i = 0; i < b.length; i++) {
        const idx = a.indexOf(b[i]);
        if (idx !== -1) {
            a.splice(idx, 1);
        }
    }

    return [a];
}

// Matches an element with the same element type in a different state
export const matchID = (el,
    startString, // The string associated with the start state (ie "Open")
    endString // The string associated with the end state (ie "HalfShut")
) => {
    const startID = el.id.toString() // Gets the ID of the original element
    const stateless = startID.replace(startString, "") // Removes the state string from the ID to get the element name
    const endID = stateless + endString // Concats the element name with the end state string to get the ID for the matching element
    if (document.getElementById(endID)) {
        return document.getElementById(endID)
    } else return
}

export const getSVGParent = (element) => {
    while (element.nodeName !== "svg") {
        element = element.parentElement;
    }
    return element;
}

export const getXY = (id, origin) => {

    if (typeof (id) === 'object') {
        var element = id
    } else var element = document.getElementById(id)

    var svg = getSVGParent(element)

    const rect = element.getBoundingClientRect();

    const pt = svg.createSVGPoint();
    if (origin == "top left" || origin == "left top") {
        pt.x = rect.x
        pt.y = rect.y
    } else if (origin == "top right" || origin == "right top") {
        pt.x = rect.x + rect.width
        pt.y = rect.y
    } else if (origin == "top center" || origin == "center top") {
        pt.x = rect.x + rect.width / 2;
        pt.y = rect.y
    } else {
        pt.x = rect.x + rect.width / 2;
        pt.y = rect.y + rect.height / 2;
    }

    const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());

    return { x: svgPt.x, y: svgPt.y }
}

// Randomly returns true or false
export const random = () => {
    if (Math.random() > 0.5) {
        return true
    } else return false
}

// Returns a random number in the given range, to the specified number of decimal points
export const randomRange = (min, max, points) => {
    var random = min + ((max - min) * Math.random())
    if (points) random = random.toFixed(points)
    return random
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

export const pluckRandomFrom = (array, typeKey) => {
    if (!arrayEligibleMap[typeKey] || arrayEligibleMap[typeKey].length === 0) {
        arrayEligibleMap[typeKey] = gsap.utils.shuffle(array.slice(0));
    }
    return arrayEligibleMap[typeKey].pop();
}
export const getRandomFrom = (array) => {
    var selected = array.selected;
    while (
        selected === (array.selected = Math.floor(Math.random() * array.length))
    ) { }
    return array[array.selected];
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

export const pauseDraggable = ([draggableIdentifiers], delay) => {

    draggableIdentifiers.forEach(el => {
        Draggable.get(el)?.disable();
    });

    // Wait, then enable
    setTimeout(() => {
        draggableIdentifiers.forEach(el => {
            Draggable.get(el)?.enable();
        });
    }, 5000);
}