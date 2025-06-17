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
    const areaA = (rectA.right - rectA.left) * ((rectA.bottom + extraY) - rectA.top);
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