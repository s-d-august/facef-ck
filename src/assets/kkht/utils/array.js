import * as React from "react";
import gsap from "gsap";

export const getPaths = (svg) => {
    const output = []

    // Raw SVG markup string (e.g. `import src from "./FFK.svg?raw"`):
    // parse in-memory. The document is never attached to the page.
    if (typeof svg === "string") {
        svg = new DOMParser().parseFromString(svg, "image/svg+xml").documentElement
    }

    // DOM node: query directly. Paint values aren't exposed as JS properties,
    // and Inkscape files keep them in the `style` attribute, so read el.style
    // first and fall back to presentation attributes.
    if (svg instanceof Element) {
        const prop = (el, cssName, attr) => el.style[cssName] || el.getAttribute(attr) || undefined
        svg.querySelectorAll("path").forEach(el => {
            if (el.id && !el.id.includes("path")) {
                const stroke = prop(el, "stroke", "stroke")
                output.push({
                    id: el.id,
                    d: el.getAttribute("d"),
                    fill: prop(el, "fill", "fill"),
                    stroke,
                    strokeWidth: stroke !== "none" ? prop(el, "strokeWidth", "stroke-width") : null,
                    strokeLinecap: stroke !== "none" ? prop(el, "strokeLinecap", "stroke-linecap") : null
                })
            }
        })
        return svg
    }

    // React component function -> call it to get the element
    const element = typeof svg === "function" ? svg({}) : svg

    // React element: walk the tree without mounting anything in the DOM
    const walk = (node) => {
        React.Children.forEach(node, (child) => {
            if (!React.isValidElement(child)) return
            if (child.type === "path" && child.props.id && !child.props.id.includes("path")) {
                output.push({
                    id: child.props.id,
                    d: child.props.d,
                    fill: child.props.fill,
                    stroke: child.props.stroke,
                    strokeWidth: child.props.stroke !== "none" ? child.props.strokeWidth : null,
                    strokeLinecap: child.props.stroke !== "none" ? child.props.strokeLinecap : null
                })
            }
            if (child.props?.children) walk(child.props.children)
        })
    }
    walk(element)
    return svg
}

export const getGroups = (svg) => {
    const output = []

    // Raw SVG markup string -> parse in-memory (never attached to the page)
    if (typeof svg === "string") {
        svg = new DOMParser().parseFromString(svg, "image/svg+xml").documentElement
    }

    // DOM node: real elements, movable with appendChild/insertBefore
    if (svg instanceof Element) {
        svg.querySelectorAll("g").forEach(el => {
            output.push({
                id: el.id,
                element: el
            })
        })
        return output
    }

    // React component function -> call it to get the element
    const element = typeof svg === "function" ? svg({}) : svg

    // React element: walk the tree, keeping every <g> (nested ones included).
    // The returned elements are renderable as-is inside another <svg>.
    const walk = (node) => {
        React.Children.forEach(node, (child) => {
            if (!React.isValidElement(child)) return
            if (child.type === "g") output.push(
                {
                    id: child.props.id,
                    element: child
                }
            )
            if (child.props?.children) walk(child.props.children)
        })
    }
    walk(element)
    return output
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
const domToJsx = (node, key) => {
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

// Takes the output of getGroups and returns React elements renderable in JSX.
// React elements (from fullSvg) pass through untouched; DOM nodes (from FFK.svg
// via `?raw`, or any mounted svg) are converted.
export const groupsToJsx = (groups) => {
    return groups.map(({ id, element }, i) => {
        const key = id || i
        if (React.isValidElement(element)) {
            return React.cloneElement(element, { key })
        }
        if (element instanceof Element) {
            return domToJsx(element, key)
        }
        return null
    }).filter(Boolean)
}

export const arrayFrom = (args) => {
    const newArray = []
    args.forEach(el => {
        if (el.includes("id^=")) {
            document.querySelectorAll(el).forEach(newel => {
                newArray.push(newel)
            });
        } else newArray.push(document.getElementById(el))
    });
    return newArray
}

export const setAllTo = ({ state, setter, value }) => {
    setter(
        Object.fromEntries(Object.keys(state).map(key => [key, value]))
    );
}

export const allOpacityZero = (array) => {
    return array.every(el => {
        const opacity = window.getComputedStyle(el).opacity;
        return Number(opacity) === 0;
    });
}

export const pluckRandomFrom = (args) => {
    const { array, typeKey, arrayEligibleMap } = args

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

export const clearDupes = (arr1, arr2) => {
    let a = [...arr1];
    let b = [...arr2];
    for (let i = 0; i < b.length; i++) {
        const idx = a.indexOf(b[i]);
        if (idx !== -1) {
            a.splice(idx, 1);
        }
    }
    return [a];
}

/* Selects a random element from an array, removes it from that array while animation is running,
and returns it to the array so it can be selected again once the animation is complete
*/

// Add this at module scope
const activeElements = [{}]

export const areElementsActive = () => {
    return activeElements
}

export const randomizeArray = async (args) => {
    const { idString, animation, areaHeight } = args;

    var arrayName = document.getElementById(`${idString}Group`);
    var array = [...arrayName.children];

    // Filter out elements currently being animated
    if (!activeElements[idString]) {
        activeElements[idString] = new Set()
    }

    array = array.filter(el => !activeElements[idString].has(el));

    if (array.length === 0 || !document.hasFocus()) return;

    var index = Math.floor(Math.random() * array.length);
    var element = array[index];

    // Mark as active

    activeElements[idString].add(element);

    await animation(element, areaHeight);

    // Animation done, mark as available again
    activeElements[idString].delete(element);
};