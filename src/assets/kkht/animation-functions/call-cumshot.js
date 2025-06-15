const arrayEligibleMap = [{}]
import { getXY } from "../utils/dom.js"
import { pluckRandomFrom, getRandomFrom } from "../utils/array.js"
import { cumAnimation } from "../animations/cum.js"

export const callCumshot = async (args) => {
    const { cumType, untilEmpty, wipeFaceAnimation, origin } = args

    console.log(args)

    if (typeof cumType === "string") {
        var cumArray = Array.from(document.querySelectorAll(`[id*="${cumType}"]`));
        var typeKey = cumType;
    } else {
        var cumArray = cumType;
        var typeKey = cumType.toString();
    }

    console.log(cumArray, typeKey)
    if (!cumArray || cumArray.length === 0) return;

    let cumID;
    console.log(untilEmpty)
    if (untilEmpty) {
        console.log("untilEmpty detected")
        console.log(pluckRandomFrom)
        cumID = pluckRandomFrom({ array: cumArray, typeKey });
    } else {
        console.log("untilEmpty not detected")
        cumID = getRandomFrom(cumArray);
    }
    console.log(cumID)

    const cumshot = document.getElementById("cumshot");
    console.log(cumshot, cumID)
    if (!cumshot || !cumID) return;

    const cumVals = getXY(cumID, origin);
    cumshot.setAttribute('x2', cumVals.x);
    cumshot.setAttribute('y2', cumVals.y);

    console.log(cumID)
    await cumAnimation({ cumID, origin })

    if (arrayEligibleMap[typeKey].length === 0) {
        wipeFaceAnimation
        cumArray.forEach(el => {
            if (typeof el === "string") el = document.getElementById(el);
            if (el) gsap.set(el, { opacity: 0 })
        })
    }
}