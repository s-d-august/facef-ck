import gsap from "gsap"
import { Draggable } from "gsap/all"

gsap.registerPlugin(Draggable)


var maxYLoggedRef = {};
var multRef = {};

export const trainingMultiplier = ({ id, y, maxY, initial, end, hits, increaseBy, reset }) => {

    if (reset) {
        multRef[id] = undefined
        maxYLoggedRef[id] = 0
    }

    if (multRef[id] === undefined) {
        multRef[id] = initial;
    }
    if (maxYLoggedRef[id] === undefined) {
        maxYLoggedRef[id] = 0;
    }

    if (multRef[id] >= end) return end;
    else if (y + 1 >= maxY) {
        maxYLoggedRef[id] += 1;
        if (maxYLoggedRef[id] >= hits) {
            maxYLoggedRef[id] = 0;
            multRef[id] = multRef[id] + increaseBy;
        }
    }
    return multRef[id];
}
