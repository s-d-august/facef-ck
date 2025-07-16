import gsap from "gsap"
import Draggable from "gsap/Draggable"
import * as kkht from '../../kkht/index'

gsap.registerEffect(Draggable)

export const setUpJODrag = ({ dickHandParts, containerSize, container, maxArousal, setArousal, sensitivity }) => {

    return Draggable.create(dickHandParts, {
        trigger: "#dickHandGrab",
        zIndexBoost: false,
        type: "y",
        cursor: "ns-resize",
        bounds: {
            minY: containerSize * -0.07,
            maxY: containerSize * 0.07,
        },
        inertia: {
            y: {
                end: 0,
            }
        },
        edgeResistance: 0.9,
        onDrag: function () {
            container.style.cursor = "ns-resize"
            if (this.getDirection("start") === ("up" || "down")) {
                kkht.valChange("ives", "up", maxArousal, setArousal, sensitivity)
            }

        },
        onDragEnd: () => {
            container.style.cursor = "auto"
        }
    })
}

export const setUpHairPullDrag = ({
    body, container, containerSize, depthMethod, hairPullBeads, headParts,
    maxArousal, sensitivity, setApproach, setArousal, setHairPullDragging, setMouthOn
}) => {

    var drag = Draggable.create("#hairPullHand", {
        trigger: "#hairPullHandGrab",
        cursor: "ns-resize",
        onDragStart: function () {
            setHairPullDragging(true);
        },
        onDrag: function () {

            kkht.valChange(["ives", "boyd"], "up", maxArousal, setArousal, sensitivity)

            container.style.cursor = "ns-resize"

            kkht.updateFollowers({
                itemsArray: [headParts, body],
                x: this.x,
                y: this.y,
                ease: "back",
                init: 0.25,
                increase: 0.2
            })
            kkht.updateFollowers({
                itemsArray: hairPullBeads,
                x: this.x,
                y: this.y,
                ease: "back",
                init: 0.1,
                increase: 0.05
            })
            // THESE HAVE TO BE IN onDrag!!! The values aren't current otherwise
            const dickRect = document.getElementById("dickArea").getBoundingClientRect();
            const headRect = document.getElementById("faceArea").getBoundingClientRect();
            const percent = kkht.getOverlapPercent(headRect, dickRect, 50); // percent of headArea overlapped by dickArea

            //    var resistance

            const args = {
                affectedIDs: ["ives", "boyd"],
                direction: this.getDirection("start"),
                lick: {
                    tongue: "#tongue",
                    tip: "#dickTip",
                    percent: "20%"
                },
                maxArousal: maxArousal,
                percent: percent,
                sensitivity: sensitivity,
                setApproach,
                setArousal,
                setMouthOn,
                startApproach: 0.05,
                startOn: 0.3,

            };

            // Handles approach and mouthOn states
            this.dragResistance = percent <= 0.3 ? 0 : percent

            approachMouthOnHandler(args)

            if (depthMethod === "Training") {
                this.applyBounds({
                    minX: containerSize * -0.0055,
                    maxX: containerSize * 0.0055,
                    minY: containerSize * -0.07,
                    maxY: containerSize * kkht.trainingMultiplier(
                        {
                            id: "#hairPullHand",
                            y: this.y,
                            maxY: (this.maxY || containerSize * 0.1),
                            initial: 0.2,
                            end: 0.4,
                            hits: 5,
                            increaseBy: 0.001
                        })
                });
            } else {
                kkht.trainingMultiplier(
                    {
                        id: "#hairPullHand",
                        reset: true
                    })
                this.applyBounds({
                    minX: containerSize * -0.0055,
                    maxX: containerSize * 0.0055,
                    minY: containerSize * -0.07,
                    maxY: containerSize * 0.4
                }
                )
            }
        },
        dragResistance: 0,
        zIndexBoost: false,
        onDragEnd: function () {
            container.style.cursor = "auto"
            setHairPullDragging(false);

        }
    });

    return drag[0]

}

export const approachMouthOnHandler =
    (args) => {
        // Neither approach nor on
        const {
            affectedIDs, direction, lick, maxArousal, sensitivity, setApproach, setArousal,
            setMouthOn, startApproach, startOn, percent
        } = args;
        if (percent <= startApproach) {
            setApproach(false)

        } else setApproach(true)

        if (percent <= startOn) { // Dick isn't in mouth
            setMouthOn(false)

            if (Draggable.hitTest(lick.tongue, lick.tip, lick.percent)) {
                kkht.valChange(affectedIDs, "up", maxArousal, setArousal, sensitivity);
            }

        } else { // Dick is in mouth
            setMouthOn(true)

            if (direction && (direction === ("up" || "down"))) {
                kkht.valChange(affectedIDs, "up", maxArousal, setArousal, sensitivity);
            }

        }
    }

export default {
    setUpHairPullDrag,
    setUpJODrag
};