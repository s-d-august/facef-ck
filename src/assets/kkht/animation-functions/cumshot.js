const arrayEligibleMap = [{}]

export const cumshotCalculator = async (cumType, origin, untilEmpty, cumshotAnimation, wipeFaceAnimation) => {

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
        cumId = util.pluckRandomFrom(cumArray, typeKey);
    } else {
        cumId = util.getRandomFrom(cumArray);
    }
    console.log(cumId)


    const cumshot = document.getElementById("cumshot");
    if (!cumshot || !cumId) return;

    const cumVals = util.getXY(cumId, origin);
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