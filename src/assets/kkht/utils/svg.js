import * as React from "react";
import ffkSvg from "../../FFK.svg?raw";

// Parse FFK.svg once, in-memory (never attached to the page)
const ffkDoc = new DOMParser().parseFromString(ffkSvg, "image/svg+xml")

// Returns the *contents* of the FFK.svg group with the given id, as JSX
// renderable inside another <svg>. Returns null when no match.
// `domToJsx` is defined below and reused here.
export const insertGroup = (id) => {
    const group = ffkDoc.getElementById(id)
    if (!group || group.tagName !== "g") {
        console.warn(`insertGroup: no <g> with id "${id}" found in FFK.svg`)
        return null
    }
    return Array.from(group.childNodes)
        .map((child, i) => domToJsx(child, `${id}-${i}`))
        .filter(Boolean)
}

export const getPath = (id) => {
    const el = ffkDoc.getElementById(id).getAttribute("d")
    return el
}

export const svgDefs = () => {
    return domToJsx(ffkDoc.getElementById("defs1"))
}

// Attributes that must be renamed to their React prop equivalents
const jsxAttrMap = {
    class: "className",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "stroke-dasharray": "strokeDasharray",
    "stroke-dashoffset": "strokeDashoffset",
    "stroke-miterlimit": "strokeMiterlimit",
    "stroke-opacity": "strokeOpacity",
    "fill-opacity": "fillOpacity",
    "fill-rule": "fillRule",
    "clip-rule": "clipRule",
    "clip-path": "clipPath",
    "paint-order": "paintOrder",
    "stop-color": "stopColor",
    "stop-opacity": "stopOpacity",
    "font-size": "fontSize",
    "font-family": "fontFamily",
    "font-weight": "fontWeight",
    "text-anchor": "textAnchor",
    "xlink:href": "xlinkHref",
    "xml:space": "xmlSpace",
    "vector-effect": "vectorEffect"
}

const isSvgTag = (name) => [
    "g", "path", "rect", "circle", "ellipse", "line", "polyline", "polygon",
    "text", "tspan", "use", "defs", "symbol", "clipPath", "mask", "pattern",
    "linearGradient", "radialGradient", "stop", "image", "title", "desc"
].includes(name)

// Recursively converts a DOM SVG subtree into a React element.
export const domToJsx = (node, key) => {
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue.trim()
        return text ? text : null
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return null

    const tag = node.tagName
    if (!isSvgTag(tag)) return null // strip metadata, foreignObject, scripts, etc.

    const props = { key }
    for (const attr of node.attributes) {
        if (attr.name === "style") {
            // Parse the inline style string into a React style object,
            // stripping Inkscape/Sodipodi custom properties
            props.style = {}
            attr.value.split(";").forEach(decl => {
                const idx = decl.indexOf(":")
                if (idx === -1) return
                const name = decl.slice(0, idx).trim()
                const value = decl.slice(idx + 1).trim()
                if (!name || !value || name.includes(":")) return
                const camel = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
                props.style[camel] = value
            })
            continue
        }
        if (attr.name.includes(":") && attr.name !== "xlink:href") continue // skip namespaced attrs
        props[jsxAttrMap[attr.name] ?? attr.name] = attr.value
    }

    const children = Array.from(node.childNodes)
        .map((child, i) => domToJsx(child, i))
        .filter(child => child !== null)

    return React.createElement(tag, props, ...children)
}

