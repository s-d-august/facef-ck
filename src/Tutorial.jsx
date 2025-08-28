import './Tutorial.css'
import { useEffect } from 'react';
import gsap from 'gsap';

const Tutorial = () => {

    useEffect(() => {
        const bodyVisible = [
            "body", "head", "mouthFull", "armsSvg"
        ]

        const tutorialSteps = [

            {
                line: '"If I tell you to do something, you will do it."',
                visible: ["ordersDiv"]
            },
            {
                line: '"If move you around, you will stay where I put you."',
                visible: ["hairPullHand", "moveBead1", "moveBead2", "moveBead3", "moveBead4", "moveBead5", "moveBead6"],
                display: "none",
                opacity: "0"
            },
            {
                line: '"If I bring myself off on your face, you will leave it there until I say otherwise."',
                zBoost: ["dickHandFingers", "dick", "dickHandGrab", "dickHandSvg"],
                display: "none",
                opacity: "0"
            },
            {
                line: '"You may not be able to <em>take</em> me very far at first, but I\'m sure you\'ll get better with some training."',
                visible: ["modeSetterDiv"],
                collapseOff: ["settersDiv", "settingsContents"],
                collapseOn: ["settingsIcon"],
                value: "Training",
                display: "none",
                opacity: "0"
            },
            {
                line: '"Or maybe as you come to enjoy it."',
                visible: ["modeSetterDiv"],
                value: "Arousal",
                display: "none",
                opacity: "0"
            },
            {
                line: '"Because you <em>will</em> come to enjoy it, in your own way."',
                visible: ["boydBarWrap", "progressBarsDiv"],
                collapseOn: ["settersDiv", "settingsContents"],
                collapseOff: ["settingsIcon"]
            },
            { line: '"So don\'t look so scared, alright?"' },
            { line: '"This is going to be fun ❤"' }
        ];

        const tutorialBox = document.getElementById("tutorialBox")

        const tutorialLine = document.getElementById("tutorialLine")

        var index

        function startTutorial(line, yesNo) {


            if (!yesNo) {
                document.getElementById("tutorialYes").style.display = "none"
                document.getElementById("tutorialNo").style.display = "none"

                tutorialBox.addEventListener("click", advanceTutorial)
            } else {
                document.getElementById("tutorialArrow").style.display = "none"

                document.getElementById("tutorialBox").style.paddingBottom = "10px"

                document.getElementById("tutorialNo").addEventListener("click", () => {
                    document.getElementById("tutorialBox").style.paddingBottom = "0"
                    document.getElementById("tutorialArrow").style.display = "block"
                    skipTutorial()
                })

                document.getElementById("tutorialYes").addEventListener("click", () => {
                    document.getElementById("tutorialBox").style.paddingBottom = "0"
                    document.getElementById("tutorialArrow").style.display = "block"
                    tutorialBox.addEventListener("click", advanceTutorial)
                    document.getElementById("tutorialYes").style.display = "none"
                    document.getElementById("tutorialNo").style.display = "none"
                    advanceTutorial()
                })
            }

            document.getElementById("tutorial").style.display = "block"

            gsap.set("#armsSvg", {
                y: 75
            })

            tutorialLine.innerHTML = line

            bodyVisible.forEach((el) => {
                document.getElementById(el).classList.add("tutorialVisible")
            })

            index = 0
        }

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

            if (tutorialSteps[index].zBoost) {
                tutorialSteps[index].zBoost.forEach((el) => {
                    var element = document.getElementById(el)
                    element.classList.remove("tutorialZBoost")
                    if (tutorialSteps[index].display) element.style.display = "none"
                    if (tutorialSteps[index].opacity) element.style.opacity = 0

                })
            }

            // increases index to current step
            index++

            // updates line and makes elements visible
            if (tutorialSteps[index]) {
                tutorialLine.innerHTML = tutorialSteps[index].line

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

                if (tutorialSteps[index].zBoost) {
                    tutorialSteps[index].zBoost.forEach((el) => {
                        var element = document.getElementById(el)
                        element.classList.add("tutorialZBoost")
                        if (tutorialSteps[index].display) element.style.display = "block"
                        if (tutorialSteps[index].opacity) element.style.opacity = 1
                    })
                }
            }
            else {
                endTutorial()
            }
        }

        function endTutorial() {
            document.getElementById("tutorial").style.display = "none"

            bodyVisible.forEach((el) => {
                document.getElementById(el).classList.remove("tutorialVisible")
            })

            const blockVisible = ["dickHandFingers", "dick", "dickHandGrab", "dickHandSvg", "armsSvg"]
            blockVisible.forEach((el) => {
                document.getElementById(el).style.display = "block"
            })

            const opacityVisible = ["dickHandSvg", "dick"]
            opacityVisible.forEach((el) => {
                document.getElementById(el).style.opacity = 1
            })

            tutorialBox.removeEventListener("click", endTutorial)

            gsap.to("#armsSvg", {
                y: 0,
                duration: 1
            })
        }

        startTutorial('"Shall I explain how this is going to work?"', true)

        function skipTutorial() {
            tutorialLine.innerHTML = '"My, aren\'t you eager ❤"'
            document.getElementById("tutorialYes").style.display = "none"
            document.getElementById("tutorialNo").style.display = "none"
            tutorialBox.addEventListener("click", endTutorial)
        }

        document.getElementById("tutorialButton").addEventListener("click", () => {
            startTutorial('"What, do you need a reminder?"')
        })

    }, [])


    return (
        <div id='tutorial'>

            <div id='tutorialContents'>
                <div id='tutorialBox'>
                    <div id='tutorialLine'></div>
                    <p className='right' id='tutorialArrow'>► </p>
                </div>

                <div id='tutorialYes' className='tutorialReply'>
                    <p>What...? </p>
                    <p className='right'>(read an explanation of the controls)</p>
                </div>

                <div id='tutorialNo' className='tutorialReply'>
                    <p>Please, just...hurry up and get it over with.</p>
                    <p className='right'>(skip the explanation)</p>
                </div>
            </div>

            <div id="tutorialBackground"></div>
        </div>

    )
}

export default Tutorial