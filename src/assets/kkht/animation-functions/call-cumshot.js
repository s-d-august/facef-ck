const arrayEligibleMap = [{}]
import { getXY } from "../utils/dom.js"
import { pluckRandomFrom, getRandomFrom } from "../utils/array.js"
import { cumAnimation } from "../animations/cum.js"
import gsap from "gsap"

export const callCumshot = async (args) => {
    const { cumType, untilEmpty, wipeFaceAnimation, origin } = args

    if (typeof cumType === "string") {
        var cumArray = Array.from(document.querySelectorAll(`[id*="${cumType}"]`));
        var typeKey = cumType;
    } else {
        var cumArray = cumType;
        var typeKey = cumType.toString();
    }

    if (!cumArray || cumArray.length === 0) return;

    let cumID;
    if (untilEmpty) {
        cumID = pluckRandomFrom({ array: cumArray, typeKey, arrayEligibleMap });
    } else {
        cumID = getRandomFrom(cumArray);
    }

    const cumshot = document.getElementById("cumshot");
    if (!cumshot || !cumID) return;

    var transformOrigin
    if (cumID.getAttribute("transform-origin")) {
        transformOrigin = (cumID.getAttribute("transform-origin"))
    } else if (origin) {
        transformOrigin = origin
    } else transformOrigin = "center"

    const cumVals = getXY(cumID, transformOrigin);
    cumshot.setAttribute('x2', cumVals.x);
    cumshot.setAttribute('y2', cumVals.y);

    console.log(arrayEligibleMap[typeKey].length)
    await cumAnimation({ cumID, origin: transformOrigin })

    if (arrayEligibleMap[typeKey].length === 0) {
        console.log(cumArray)
        //   wipeFaceAnimation
        cumArray.forEach(el => {
            if (typeof el === "string") el = document.getElementById(el);
            if (el) gsap.set(el, { opacity: 0 })
        })
    }
}