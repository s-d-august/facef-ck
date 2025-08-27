import './Tutorial.css'
import { useEffect } from 'react';

const Tutorial = () => {

    const bodyVisible = [
        "body", "head", "mouthFull"
    ]

    const tutorialSteps = [
        { line: "Allow me explain how this is going to work." },
        {
            line: "If I tell you to do something, you will do it.",
            visible: ["ordersDiv"]
        },
        {
            line: "If move you around, you will stay where I put you.",
            visible: ["hairPullHand"],
            display: "none",
            opacity: "0"
        },
        {
            line: "If I bring myself off on your face, you will leave it there until I say otherwise.",
            visible: ["dickHandFingers", "dick", "dickHandGrab", "dickHandSvg"],
            display: "none",
            opacity: "0"
        },
        {
            line: "You may not be able to *take* me very far at first, but I'm sure you'll get better with some training.",
            visible: ["modeSetterDiv"],
            collapseOff: ["settersDiv", "settingsContents"],
            collapseOn: ["settingsIcon"],
            value: "Training",
            display: "none",
            opacity: "0"
        },
        {
            line: "Or maybe as you come to enjoy it.",
            visible: ["modeSetterDiv"],
            value: "Arousal",
            display: "none",
            opacity: "0"
        },
        {
            line: "Because you *will* come to enjoy it, in your own way.",
            visible: ["boydBarWrap", "progressBarsDiv"],
            collapseOn: ["settersDiv", "settingsContents"],
            collapseOff: ["settingsIcon"]
        },
        { line: "So don't look so scared, alright?" },
        { line: "This is going to be fun ❤" }
    ];

    useEffect(() => {

        document.getElementById("armsSvg").style.display = "none"

        const tutorialLine = document.getElementById("tutorialLine")
        tutorialLine.innerText = tutorialSteps[0].line

        bodyVisible.forEach((el) => {
            document.getElementById(el).classList.add("tutorialVisible")
        })

        var index = 0
        function advanceTutorial() {
            // sets elements from previous step as invisible


            if (tutorialSteps[index].visible) {
                tutorialSteps[index].visible.forEach((el) => {
                    var element = document.getElementById(el)
                    element.classList.remove("tutorialVisible")
                    if (tutorialSteps[index].display) element.style.display = "none"
                    if (tutorialSteps[index].opacity) element.style.opacity = 0

                })
            }

            // increases index to current step
            index++

            // updates line and makes elements visible
            if (tutorialSteps[index]) {
                tutorialLine.innerText = tutorialSteps[index].line

                if (tutorialSteps[index].collapseOn) {
                    tutorialSteps[index].collapseOn.forEach((el) => {
                        document.getElementById(el).classList.add("collapsed")
                    })
                }
                if (tutorialSteps[index].collapseOff) {
                    tutorialSteps[index].collapseOff.forEach((el) => {
                        document.getElementById(el).classList.remove("collapsed")
                    })
                }

                if (tutorialSteps[index].visible) {
                    tutorialSteps[index].visible.forEach((el) => {
                        var element = document.getElementById(el)
                        element.classList.add("tutorialVisible")
                        if (tutorialSteps[index].display) element.style.display = "block"
                        if (tutorialSteps[index].opacity) element.style.opacity = 1
                    })
                }
            }
            else {
                bodyVisible.forEach((el) => {
                    document.getElementById(el).classList.remove("tutorialVisible")
                })
                document.getElementById("tutorial").style.display = "none"
                const blockVisible = ["dickHandFingers", "dick", "dickHandGrab", "dickHandSvg", "armsSvg"]
                blockVisible.forEach((el) => {
                    document.getElementById(el).style.display = "block"
                })
                const opacityVisible = ["dickHandSvg", "dick"]
                opacityVisible.forEach((el) => {
                    document.getElementById(el).style.opacity = 1
                })
            }
        }

        tutorialLine.addEventListener("click", advanceTutorial)

    }, [])


    return (
        <div id='tutorial'>
            <div id='tutorialLine'></div>
            <div id="tutorialDiv"></div>
        </div>

    )
}

export default Tutorial