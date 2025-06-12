const arrayEligibleMap = [{}]
import { getXY } from "../utils/dom.js"
import { pluckRandomFrom, getRandomFrom } from "../utils/array.js"

export const callCumshot = async (cumType, origin, untilEmpty, cumshotAnimation, wipeFaceAnimation) => {

    if (typeof cumType === "string") {
        var cumArray = Array.from(document.querySelectorAll(`[id*="${cumType}"]`));
        var typeKey = cumType;
    } else {
        var cumArray = cumType;
        var typeKey = cumType.toString();
    }

    if (!cumArray || cumArray.length === 0) return;

    let cumId;
    if (untilEmpty) {
        cumId = pluckRandomFrom(cumArray, typeKey);
    } else {
        cumId = getRandomFrom(cumArray);
    }
    console.log(cumId)


    const cumshot = document.getElementById("cumshot");
    if (!cumshot || !cumId) return;

    const cumVals = getXY(cumId, origin);
    cumshot.setAttribute('x2', cumVals.x);
    cumshot.setAttribute('y2', cumVals.y);

    await cumshotAnimation

    if (arrayEligibleMap[typeKey].length === 0) {
        wipeFaceAnimation
        cumArray.forEach(el => {
            if (typeof el === "string") el = document.getElementById(el);
            if (el) gsap.set(el, { opacity: 0 })
        })
    }
}