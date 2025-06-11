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