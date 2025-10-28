import gsap from "gsap"
import * as kkht from "../index"

const bodyVisible = [
    "body", "head", "mouthFull", "armsSvg", "positioning"
]

export const resetPosition = ({
    hairPullDraggable,
    hairPullBeads,
    body,
    headParts,
    boydNutRef,
    mouthArgs,
    setApproach,
    setMouthOn,
    setHoldMouthOpen,
    setMouthOpen,
    func
}) => {

    console.log(hairPullDraggable,
        hairPullBeads,
        body,
        headParts,
        boydNutRef,
        mouthArgs,
        setApproach,
        setMouthOn,
        setHoldMouthOpen,
        setMouthOpen,
        func)

    gsap.to(hairPullDraggable.current.target, {
        y: -10,
        duration: 2
    })

    gsap.to(hairPullBeads.current, {
        y: -10,
        duration: 2
    })

    gsap.to(body.current, {
        y: -10,
        duration: 2
    })

    gsap.to(headParts.current, {
        y: -10,
        duration: 2
    })

    hairPullDraggable.current.update();


    if (!boydNutRef) {

        setTimeout(() => {
            kkht.mouthCloseFunction({ ...mouthArgs.current, duration: 1 })
            setApproach(false)
            setMouthOn(false)
            setMouthOpen(false)
            setHoldMouthOpen(false)
        }, 500)

        func()

        boydNutRef = true;
    }

    else {
        boydNutRef = false; // Reset if below threshold
    }
}

export const startMessage = ({ line, yesNo, runMessageHandler, messageYes, messageNo, messageArrow, messageBox, messageLine, setInterruptUI }) => {

    setInterruptUI(true)
    document.getElementById("waitIcon").style.display = "none"

    if (!yesNo) {
        messageYes.style.display = "none"
        messageNo.style.display = "none"

        messageBox.removeEventListener("click", runMessageHandler);
        messageBox.addEventListener("click", runMessageHandler);

        messageBox.style.cursor = "pointer"
    } else {

        messageArrow.style.display = "none"

        messageBox.style.paddingBottom = "1vh"

        messageNo.addEventListener("click", messageNoHandler)

        messageYes.addEventListener("click", messageYesHandler)
    }

    Array.from(document.getElementsByClassName("message")).forEach(el => {
        el.style.display = "block"
    })

    messageLine.innerHTML = line

    bodyVisible.forEach((el) => {
        document.getElementById(el).classList.add("messageVisible")
    })

    return () => {
        messageBox.removeEventListener("click", runMessageHandler)
    }
}

export const runMessage = ({ messageSteps, index, endFunc }) => {
    console.log(messageSteps, index, endFunc)
    if (messageSteps[index - 1]) {
        dismountMessage({ messageSteps, index })
    }
    if (messageSteps[index]) {
        advanceMessage({ messageSteps, index })
        index++
    } else {
        endFunc()
        messageBox.removeEventListener("click", runMessage)
    }
}

export const dismountMessage = ({ messageSteps, index }) => {
    if (messageSteps[index - 1].visible) {
        messageSteps[index - 1].visible.forEach((el) => {
            var element = document.getElementById(el)
            element.classList.remove("messageVisible")
            if (messageSteps[index - 1].display) element.style.display = "none"
            if (messageSteps[index - 1].opacity) element.style.opacity = 0

        })
    }

    if (messageSteps[index - 1].zBoost) {
        messageSteps[index - 1].zBoost.forEach((el) => {
            var element = document.getElementById(el)
            element.classList.remove("messageZBoost")
            if (messageSteps[index - 1].display) element.style.display = "none"
            if (messageSteps[index - 1].opacity) element.style.opacity = 0

        })
    }

    if (messageSteps[index - 1].shade) {
        messageSteps[index - 1].shade.forEach((el) => {
            if (!el.style) return
            el.style.opacity = 1
        })
    }
}

export const advanceMessage = ({ messageSteps, index, JP, messageBox }) => {
    messageLine.innerHTML = JP ? messageSteps[index].jp : messageSteps[index].line

    if (messageSteps[index].function) messageSteps[index].function()

    if (messageSteps[index].color) {
        messageBox.style.backgroundColor = "#87aade"
        messageBox.style.color = "#10104d"
    } else {
        messageBox.style.backgroundColor = "#a00"
        messageBox.style.color = "white"
    }

    if (messageSteps[index].type) {
        document.getElementById("depthModeSet").value = messageSteps[index].type
    }

    if (messageSteps[index].collapseOn) {
        messageSteps[index].collapseOn.forEach((el) => {
            document.getElementById(el).classList.add("collapsed")
        })
    }
    if (messageSteps[index].collapseOff) {
        messageSteps[index].collapseOff.forEach((el) => {
            document.getElementById(el).classList.remove("collapsed")
        })
    }

    if (messageSteps[index].shade) {
        messageSteps[index].shade.forEach((el) => {
            if (!el.style) return
            el.style.opacity = 0.2
        })
    }

    if (messageSteps[index].visible) {
        messageSteps[index].visible.forEach((el) => {
            var element = document.getElementById(el)
            element.classList.add("messageVisible")
            if (messageSteps[index].display) {
                element.style.display = (element.id === "hairPullDiv") ? "flex" : "block"
            }
            if (messageSteps[index].opacity) {
                element.style.opacity = 1
            }
        })
    }

    if (messageSteps[index].zBoost) {
        messageSteps[index].zBoost.forEach((el) => {
            var element = document.getElementById(el)
            element.classList.add("messageZBoost")
            if (messageSteps[index].display) {
                element.style.display = "block"
            }
            if (messageSteps[index].opacity) element.style.opacity = 1
        })
    }
}

export const messageNoHandler = ({ func, messageBox, messageNo, messageArrow }) => {
    messageBox.style.cursor = "pointer"
    messageNo.removeEventListener("click", messageNoHandler)
    messageBox.style.paddingBottom = "0"
    messageArrow.style.display = "block"
    func()
}

export const messageYesHandler = (args) => {
    const { func, messageBox, messageYes, messageNo, messageArrow, funcArgs } = args;
    console.log(args)
    let actualFunc = func;
    if (func === "runMessage") actualFunc = runMessage;
    messageBox.style.cursor = "pointer";
    messageBox.addEventListener("click", actualFunc);
    messageYes.removeEventListener("click", messageYesHandler);
    messageBox.style.paddingBottom = "0";
    messageArrow.style.display = "block";
    messageYes.style.display = "none";
    messageNo.style.display = "none";
    actualFunc(funcArgs);
}

export const endMessage = () => {

    const displayNone = ["messageBox", "message"]
    displayNone.forEach((el) => {
        document.getElementById(el).style.display = "none"
    })

    bodyVisible.forEach((el) => {
        document.getElementById(el).classList.remove("messageVisible")
    })

    const blockVisible = ["dickHandFingers", "dick", "dickHandGrab", "dickHandSvg", "armsSvg"]
    blockVisible.forEach((el) => {
        document.getElementById(el).style.display = "block"
    })

    document.getElementById("settersDiv").style.display = "grid"

    const opacityVisible = ["dick", "settersDiv", "dickHandGrab"]
    opacityVisible.forEach((el) => {
        document.getElementById(el).style.opacity = 1
    })

    const faintVisible = ["dickHandSvg", "dickHandFingers", "hairPullDiv"]
    faintVisible.forEach((el) => {
        document.getElementById(el).style.opacity = 0.2
    })

    gsap.to("#armsSvg", {
        y: 0,
        duration: 1
    })

    messageBox.removeEventListener("click", endMessage)

    document.getElementById("waitIcon").style.display = "block"
}