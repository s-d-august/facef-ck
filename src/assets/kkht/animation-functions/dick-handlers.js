import gsap from "gsap"
import { Draggable } from "gsap/all"
import { valChange } from "../utils/stats"
gsap.registerPlugin(Draggable)

export const isApproachOrOn =
    (args) => {
        // Neither approach nor on
        const {
            percent, startApproach, startOn, setApproach, setMouthOn,
            affectedIDs, lick, maxArousal, setArousal, whileOff, whileApproach, whileOn
        } = args;
        if (percent <= startApproach) {
            setApproach(false)
            if (whileOff) whileOff
        } else setApproach(true)

        if (percent <= startOn) { // Dick isn't in mouth
            setMouthOn(false)
            if (whileApproach) whileApproach
            if (Draggable.hitTest(lick.tongue, lick.tip, lick.percent)) {
                valChange(affectedIDs, "up", maxArousal, setArousal);
            }
            return 0
        } else { // Dick is in mouth
            setMouthOn(true)
            if (whileOn) whileOn
            valChange(affectedIDs, "up", maxArousal, setArousal);
            return percent
        }
    }

var maxYLoggedRef = {};
var multRef = {};

export const trainingMultiplier = (id, y, maxY, initial, end, hits, increaseBy) => {
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
