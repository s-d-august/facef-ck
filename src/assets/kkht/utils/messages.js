

export const startMessage = ({ line, yesNo, messageYes, messageNo, messageArrow, messageBox, messageLine }) => {

    setInterruptUI(true)
    document.getElementById("waitIcon").style.display = "none"

    if (!yesNo) {
        messageYes.style.display = "none"
        messageNo.style.display = "none"

        messageBox.addEventListener("click", runMessage)
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

export const advanceMessage = ({ messageSteps, index, JP }) => {
    messageLine.innerHTML = JP ? messageSteps[index].jp : messageSteps[index].line

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