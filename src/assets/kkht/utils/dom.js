import gsap from "gsap"
import { Draggable } from "gsap/all"
gsap.registerPlugin(Draggable)

export const callState = (setter, sec) => {
    setter(true)

    // Wait, then enable
    setTimeout(() => {
        setter(false)
    }, (sec * 1000));
}


export const matchID = (el, startString, endString) => {
    const startID = el.id.toString()
    const stateless = startID.replace(startString, "")
    const endID = stateless + endString
    if (document.getElementById(endID)) {
        return document.getElementById(endID)
    } else return
}

export const getSVGParent = (element) => {
    while (element.nodeName !== ("svg" || "SVG")) {
        element = element.parentElement;
    }
    return element;
}

export const getXY = (id, origin) => {
    const element = typeof id === 'object' ? id : document.getElementById(id);
    if (!element) return { x: 0, y: 0 };

    const svg = getSVGParent(element);
    if (!svg) return { x: 0, y: 0 };

    const rect = element.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();

    // Store initial SVG position and window size only once per session
    if (!svg._initialRect) {
        svg._initialRect = { left: svgRect.left, top: svgRect.top };
        svg._initialWindowSize = { width: window.innerWidth, height: window.innerHeight };
        window._svgInitialRects = window._svgInitialRects || {};
        if (svg.id) window._svgInitialRects[svg.id] = svg._initialRect;
        window._svgInitialWindowSizes = window._svgInitialWindowSizes || {};
        if (svg.id) window._svgInitialWindowSizes[svg.id] = svg._initialWindowSize;
    }

    const initialWindowSize = window._svgInitialWindowSizes && window._svgInitialWindowSizes[svg.id];
    let deltaX = 0, deltaY = 0;
    let windowResized = false;

    if (
        initialWindowSize &&
        (initialWindowSize.width !== window.innerWidth ||
            initialWindowSize.height !== window.innerHeight)
    ) {
        // Update initialRect and window size to current values
        svg._initialRect = { left: svgRect.left, top: svgRect.top };
        svg._initialWindowSize = { width: window.innerWidth, height: window.innerHeight };
        if (svg.id) {
            window._svgInitialRects[svg.id] = svg._initialRect;
            window._svgInitialWindowSizes[svg.id] = svg._initialWindowSize;
        }
        windowResized = true;
        deltaX = 0;
        deltaY = 0;
    } else {
        deltaX = svgRect.left - svg._initialRect.left;
        deltaY = svgRect.top - svg._initialRect.top;
    }

    const pt = svg.createSVGPoint();
    if (origin === "top left" || origin === "left top") {
        pt.x = rect.left;
        pt.y = rect.top;
    } else if (origin === "top right" || origin === "right top") {
        pt.x = rect.right;
        pt.y = rect.top;
    } else if (origin === "top center" || origin === "center top" || origin === "top") {
        pt.x = rect.left + rect.width / 2;
        pt.y = rect.top;
    } else { // Origin defaults to center
        pt.x = rect.left + rect.width / 2;
        pt.y = rect.top + rect.height / 2;
    }

    // Only add delta if window has NOT been resized
    if (!windowResized) {
        pt.x += deltaX;
        pt.y += deltaY;
    }

    const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());
    return { x: svgPt.x, y: svgPt.y };
}

export const getScreenXY = (id, origin) => {
    const element = typeof id === 'object' ? id : document.getElementById(id);
    if (!element) return { x: 0, y: 0 };

    const rect = element.getBoundingClientRect();


    if (origin === "top left" || origin === "left top") {
        return { x: rect.left, y: rect.top };
    } else if (origin === "top right" || origin === "right top") {
        return { x: rect.right, y: rect.top };
    } else if (origin === "top center" || origin === "center top" || origin === "top") {
        return { x: rect.left + rect.width / 2, y: rect.top };
    } else { // Origin defaults to center
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
}

export const getOverlapPercent = (rectA, rectB, extraY) => {
    const x_overlap = Math.max(
        0,
        Math.min(rectA.right, rectB.right) - Math.max(rectA.left, rectB.left)
    );
    const y_overlap = Math.max(
        0,
        Math.min((rectA.bottom + extraY), rectB.bottom) - Math.max(rectA.top, rectB.top)
    );
    const overlapArea = x_overlap * y_overlap;
    const areaA = (rectA.right - rectA.left) * ((rectA.bottom + extraY) - rectA.top)
    const percent = areaA ? (overlapArea / areaA) : 0;
    return percent;
}

export const renderProgress = (element, attr, stat, max) => {
    const newVal = function (stat) {
        if (stat >= max) { return 100 }
        else return stat / max * 100
    }
    element.style[attr] = (newVal(stat) || 0) + '%'
}

export const renderTimelineProgress = (tl, progress) => {
    tl.progress(progress);
};


export const hideOnOverlap = ({ running, element1, element2 }) => {

    const new2 = Array.isArray(element2) ? element2 : [element2]

    element1.forEach(el1 => {
        new2.forEach(el2 => {
            if (Draggable.hitTest(el1, el2, 1)) {
                gsap.to(el1, { opacity: 0, duration: 0.35 });
            }
        });
    });

    if (running) {
        requestAnimationFrame(() => hideOnOverlap({ running, element1, element2 }));
    }
}