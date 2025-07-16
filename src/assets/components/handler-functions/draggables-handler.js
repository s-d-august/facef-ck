import gsap from "gsap"
import Draggable from "gsap/Draggable"
import * as kkht from '../../kkht/index'

gsap.registerEffect(Draggable)

export const setUpJODrag = ({ dickHandParts, containerSize, container, maxArousal, setArousal, sensitivity }) => {
    console.log({ dickHandParts, containerSize, container, maxArousal, setArousal, sensitivity })

    Draggable.create(dickHandParts, {
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

export default {
    setUpJODrag
};