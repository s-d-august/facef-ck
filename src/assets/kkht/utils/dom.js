import gsap from "gsap"
import { Draggable } from "gsap/all"
gsap.registerPlugin(Draggable)

export const callState = (setter, sec) => {

    if (Array.isArray(setter)) {
        setter.forEach((set) => {
            set(true)

            // Wait, then enable
            setTimeout(() => {
                set(false)
            }, (sec * 1000));
        })
    }
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
    console.log(id)
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
    } else if (origin == "top center" || origin == "center top" || origin == "top") {
        pt.x = rect.x + rect.width / 2;
        pt.y = rect.y
    } else { // Origin defaults to center
        pt.x = rect.x + rect.width / 2;
        pt.y = rect.y + rect.height / 2;
    }
    const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());
    return { x: svgPt.x, y: svgPt.y }
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
    console.log(tl, progress);
    tl.progress(progress);
};


export const hideOnOverlap = ({ running, element1, element2 }) => {

    element1.forEach(el1 => {
        element2.forEach(el2 => {
            if (Draggable.hitTest(el1, el2, 1)) {
                gsap.to(el1, { opacity: 0, duration: 0.2 });
            }
        });
    });

    if (running) {
        requestAnimationFrame(() => hideOnOverlap({ running, element1, element2 }));
    }
}