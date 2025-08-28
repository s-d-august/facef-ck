import './Tutorial.css'
import { useEffect } from 'react';
import gsap from 'gsap';

const Tutorial = () => {

    useEffect(() => {

        function getAllSettingsChildren() {
            const settingsContents = document.getElementById("settingsContents");
            if (!settingsContents) return [];

            const result = [];

            settingsContents.childNodes.forEach((child) => {
                if (child.id !== "modeSetterDiv") {
                    result.push(child);
                }
            });

            return result;
        }

        const settingsChildren = getAllSettingsChildren()

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
                visible: ["settersDiv"],
                shade: settingsChildren,
                collapseOff: ["settersDiv", "settingsContents"],
                collapseOn: ["settingsIcon"],
                type: "Training",
                display: "none",
                opacity: "0"
            },
            {
                line: '"Or maybe as you come to enjoy it."',
                shade: settingsChildren,
                visible: ["settersDiv"],
                type: "Arousal",
                display: "none",
                opacity: "0"
            },
            {
                line: '"Because you <em>will</em> come to enjoy it, in your own way."',
                visible: ["boydBarWrap", "progressBarsDiv"],
                collapseOn: ["settersDiv", "settingsContents"],
                collapseOff: ["settingsIcon"],
                type: "Training",
            },
            { line: '"So don\'t look so scared, alright?"' },
            { line: '"This is going to be fun ❤"' }
        ];

        const tutorialBox = document.getElementById("tutorialBox")
        const tutorialYes = document.getElementById("tutorialYes")
        const tutorialNo = document.getElementById("tutorialNo")
        const tutorialLine = document.getElementById("tutorialLine")
        const tutorialArrow = document.getElementById("tutorialArrow")

        var index

        function tutorialNoHandler() {
            tutorialNo.removeEventListener("click", tutorialNoHandler)
            tutorialBox.style.paddingBottom = "0"
            tutorialArrow.style.display = "block"
            skipTutorial()
        }

        function tutorialYesHandler() {
            tutorialBox.addEventListener("click", runTutorial)
            tutorialYes.removeEventListener("click", tutorialYesHandler)
            tutorialBox.style.paddingBottom = "0"
            tutorialArrow.style.display = "block"
            tutorialYes.style.display = "none"
            tutorialNo.style.display = "none"
            runTutorial()
        }

        function tutorialButtonHandler() {
            startTutorial('"What, do you need a reminder?"', false)
        }

        function startTutorial(line, yesNo) {

            console.log(yesNo)

            if (!yesNo) {
                tutorialYes.style.display = "none"
                tutorialNo.style.display = "none"

                tutorialBox.addEventListener("click", runTutorialReset)
            } else {
                tutorialArrow.style.display = "none"

                tutorialBox.style.paddingBottom = "10px"

                tutorialNo.addEventListener("click", tutorialNoHandler)

                tutorialYes.addEventListener("click", tutorialYesHandler)
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

        function runTutorialReset() {
            dismountTutorial()
            if (tutorialSteps[index]) {
                advanceTutorial()
            } else {
                endTutorial()
                resetToBlock()
                tutorialBox.removeEventListener("click", runTutorialReset)
            }
        }

        function runTutorial() {
            dismountTutorial()
            if (tutorialSteps[index]) {
                advanceTutorial()
            } else {
                endTutorial()
                tutorialBox.removeEventListener("click", runTutorial)
            }
        }

        function dismountTutorial() {

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

            if (tutorialSteps[index].shade) {
                tutorialSteps[index].shade.forEach((el) => {
                    if (!el.style) return
                    el.style.opacity = 1
                })
            }
            index++
        }

        function advanceTutorial() {
            tutorialLine.innerHTML = tutorialSteps[index].line

            if (tutorialSteps[index].type) {
                document.getElementById("depthModeSet").value = tutorialSteps[index].type
            }

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

            if (tutorialSteps[index].shade) {
                tutorialSteps[index].shade.forEach((el) => {
                    if (!el.style) return
                    el.style.opacity = 0.2
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

        function resetToBlock() {
            const toBlock = ["hairPullHand", "moveBead1", "moveBead2", "moveBead3", "moveBead4", "moveBead5", "moveBead6"]
            toBlock.forEach(el => {
                document.getElementById(el).style.display = "block"
            })
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

            document.getElementById("settersDiv").style.display = "grid"

            const opacityVisible = ["dickHandSvg", "dick", "settersDiv"]
            opacityVisible.forEach((el) => {
                document.getElementById(el).style.opacity = 1
            })

            gsap.to("#armsSvg", {
                y: 0,
                duration: 1
            })

            tutorialBox.removeEventListener("click", endTutorial)
        }

        startTutorial('"Shall I explain how this is going to work?"', true)

        function skipTutorial() {
            tutorialLine.innerHTML = '"My, aren\'t you eager ❤"'
            tutorialYes.style.display = "none"
            tutorialNo.style.display = "none"
            tutorialBox.addEventListener("click", endTutorial)
        }

        document.getElementById("tutorialButton").addEventListener("click", tutorialButtonHandler)

        return () => {
            document.getElementById("tutorialButton").removeEventListener("click", tutorialButtonHandler)

        };

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