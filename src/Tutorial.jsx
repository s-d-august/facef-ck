import './Tutorial.css'
import { useEffect, useState } from 'react';
import gsap from 'gsap';

const Tutorial = ({ setInterruptUI, JP }) => {

    const [tutorialFired, setTutorialFired] = useState(false)

    useEffect(() => {

        function getAllSettingsChildren() {

            const getChildren = ["settingsContents", "flexRow", "depthSecret"]

            const result = [];

            getChildren.forEach(el => {
                document.getElementById(el).childNodes.forEach((child) => {

                    if ((child.id !== "flexRow")
                        && (child.id !== "depthSecret")
                        && (child.id !== "modeSetterDiv")) {
                        result.push(child);
                    }
                });
            })
            return result;
        }

        getAllSettingsChildren()
        const settingsChildren = getAllSettingsChildren()

        const bodyVisible = [
            "body", "head", "mouthFull", "armsSvg", "positioning"
        ]

        const tutorialSteps = [

            {
                line: '"If I tell you to do something, you will do it."',
                jp: '"僕に指示されたら、あなたは言う通りにします。"',
                visible: ["ordersDiv"]
            },
            {
                line: '"If move you around, you will stay where I put you."',
                jp: '"動かされたら、そのままにしておきます。"',
                visible: ["hairPullDiv"],
                display: "none",
                opacity: true
            },
            {
                line: '"That includes if I bring myself off on your face."',
                jp: '"僕がその顔を彩ってもね。"',
                zBoost: ["dickHandFingers", "dick", "dickHandGrab", "dickHandSvg"],
                display: "none",
                opacity: true
            },
            {
                line: '"You may not be able to <em>take</em> me very far at first, but I\'m sure you\'ll get better with some training."',
                jp: '"最初に僕のをあまり深くいただけないが、多少の教習で上手になるはずです。"',
                visible: ["settersDiv"],
                shade: settingsChildren,
                collapseOff: ["settersDiv", "settingsContents"],
                collapseOn: ["settingsIcon"],
                type: JP ? "教習" : "Training",
                display: "none",
                opacity: true
            },
            {
                line: '"Or maybe as you come to enjoy it."',
                jp: '"または、あなたが好きになりますうちにね。"',
                shade: settingsChildren,
                visible: ["settersDiv"],
                type: JP ? "興奮" : "Arousal",
                display: "none",
                opacity: true
            },
            {
                line: '"Because you <em>will</em> come to enjoy it, in your own way."',
                jp: '"いずれ好きになりますよ、あなたなりに。きっと。"',
                visible: ["boydBarWrap", "progressBarsDiv"],
                collapseOn: ["settersDiv", "settingsContents"],
                collapseOff: ["settingsIcon"],
                type: JP ? "教習" : "Training",
            },
            {
                line: '"So don\'t look so scared, alright?"',
                jp: '"だから、そう怖がらなくてもいいのですよ？"'
            },
            {
                line: '"This is going to be fun ❤"',
                jp: '"楽しみましょう ❤"'
            }
        ];

        const tutorialBox = document.getElementById("tutorialBox")
        const tutorialYes = document.getElementById("tutorialYes")
        const tutorialNo = document.getElementById("tutorialNo")
        const tutorialLine = document.getElementById("tutorialLine")
        const tutorialArrow = document.getElementById("tutorialArrow")

        var index

        function tutorialNoHandler() {
            tutorialBox.style.cursor = "pointer"
            tutorialNo.removeEventListener("click", tutorialNoHandler)
            tutorialBox.style.paddingBottom = "0"
            tutorialArrow.style.display = "block"
            skipTutorial()
        }

        function tutorialYesHandler() {
            tutorialBox.style.cursor = "pointer"
            tutorialBox.addEventListener("click", runTutorial)
            tutorialYes.removeEventListener("click", tutorialYesHandler)
            tutorialBox.style.paddingBottom = "0"
            tutorialArrow.style.display = "block"
            tutorialYes.style.display = "none"
            tutorialNo.style.display = "none"
            runTutorial()
        }

        function tutorialButtonHandler() {
            var string = JP ? '"なあに、忘れました？"' : '"What, do you need a reminder?"'
            startTutorial(string, false)
        }

        function startTutorial(line, yesNo) {

            setInterruptUI(true)
            document.getElementById("waitIcon").style.display = "none"

            if (!yesNo) {
                tutorialYes.style.display = "none"
                tutorialNo.style.display = "none"

                tutorialBox.addEventListener("click", runTutorialReset)
                tutorialBox.style.cursor = "pointer"
            } else {

                tutorialArrow.style.display = "none"

                tutorialBox.style.paddingBottom = "1vh"

                tutorialNo.addEventListener("click", tutorialNoHandler)

                tutorialYes.addEventListener("click", tutorialYesHandler)
            }

            Array.from(document.getElementsByClassName("tutorial")).forEach(el => {
                el.style.display = "block"
            })


            var height = document.getElementById("tutorialBackground").getBoundingClientRect().height
            gsap.set("#armsSvg", {
                y: (height * 0.065)
            })

            tutorialLine.innerHTML = line

            bodyVisible.forEach((el) => {
                document.getElementById(el).classList.add("tutorialVisible")
            })

            index = 0
        }

        function runTutorialReset() {
            if (tutorialSteps[index - 1]) {
                dismountTutorial()
            }
            if (tutorialSteps[index]) {
                advanceTutorial()
                index++
            } else {
                endTutorial()
                tutorialBox.removeEventListener("click", runTutorialReset)
            }
        }

        function runTutorial() {
            if (tutorialSteps[index - 1]) {
                dismountTutorial()
            }
            if (tutorialSteps[index]) {
                advanceTutorial()
                index++
            } else {
                endTutorial()
                tutorialBox.removeEventListener("click", runTutorial)
            }
        }

        function dismountTutorial() {

            if (tutorialSteps[index - 1].visible) {
                tutorialSteps[index - 1].visible.forEach((el) => {
                    var element = document.getElementById(el)
                    element.classList.remove("tutorialVisible")
                    if (tutorialSteps[index - 1].display) element.style.display = "none"
                    if (tutorialSteps[index - 1].opacity) element.style.opacity = 0

                })
            }

            if (tutorialSteps[index - 1].zBoost) {
                tutorialSteps[index - 1].zBoost.forEach((el) => {
                    var element = document.getElementById(el)
                    element.classList.remove("tutorialZBoost")
                    if (tutorialSteps[index - 1].display) element.style.display = "none"
                    if (tutorialSteps[index - 1].opacity) element.style.opacity = 0

                })
            }

            if (tutorialSteps[index - 1].shade) {
                tutorialSteps[index - 1].shade.forEach((el) => {
                    if (!el.style) return
                    el.style.opacity = 1
                })
            }

        }

        function advanceTutorial() {

            tutorialLine.innerHTML = JP ? tutorialSteps[index].jp : tutorialSteps[index].line

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
                    if (tutorialSteps[index].display) {
                        element.style.display = (element.id === "hairPullDiv") ? "flex" : "block"
                    }
                    if (tutorialSteps[index].opacity) {
                        element.style.opacity = 1
                    }
                })
            }

            if (tutorialSteps[index].zBoost) {
                tutorialSteps[index].zBoost.forEach((el) => {
                    var element = document.getElementById(el)
                    element.classList.add("tutorialZBoost")
                    if (tutorialSteps[index].display) {
                        if (tutorialSteps[index].display) {
                            element.style.display = "block"
                        }
                    }
                    if (tutorialSteps[index].opacity) element.style.opacity = 1
                })
            }
        }

        function endTutorial() {

            Array.from(document.getElementsByClassName("tutorial")).forEach(el => {
                el.style.display = "none"
            })

            bodyVisible.forEach((el) => {
                document.getElementById(el).classList.remove("tutorialVisible")
            })

            const blockVisible = ["dickHandFingers", "dick", "dickHandGrab", "dickHandSvg", "armsSvg"]
            blockVisible.forEach((el) => {
                document.getElementById(el).style.display = "block"
            })

            document.getElementById("settersDiv").style.display = "grid"
            document.getElementById("hairPullDiv").style.display = "none"

            const opacityVisible = ["dickHandSvg", "dick", "settersDiv"]
            opacityVisible.forEach((el) => {
                document.getElementById(el).style.opacity = 1
            })

            const faintVisible = ["dickHandFingers", "dickHandGrab", "hairPullDiv"]
            faintVisible.forEach((el) => {
                document.getElementById(el).style.opacity = 0.2
            })

            gsap.to("#armsSvg", {
                y: 0,
                duration: 1
            })

            tutorialBox.removeEventListener("click", endTutorial)

            setInterruptUI(false)
            document.getElementById("waitIcon").style.display = "block"
        }



        function skipTutorial() {
            tutorialLine.innerHTML = JP ? '"あら、何と熱心ですね ❤"' : '"My, aren\'t you eager ❤"'
            tutorialYes.style.display = "none"
            tutorialNo.style.display = "none"
            tutorialBox.addEventListener("click", endTutorial)
        }

        document.getElementById("tutorialButton").addEventListener("click", tutorialButtonHandler)

        var tutorialString = JP ? "“これから何が起こる事、説明してあげましょうか？”" : '"Shall I explain how this is going to work?"'

        if (tutorialFired === false) {
            startTutorial(tutorialString, true)
            setTutorialFired(true)
        }

        return () => {
            document.getElementById("tutorialButton").removeEventListener("click", tutorialButtonHandler)

        };

    }, [JP])


    return (
        <div id='tutorial' className='tutorial'>

            <div id='tutorialContents'>
                <div id='tutorialYes' className='tutorialReply'>
                    <p>{JP ? "何が．．．" : "What...?"} </p>
                    <p className='right'>{JP ? "(コントロールの説明)" : "(read an explanation of the controls)"}</p>
                </div>

                <div id='tutorialNo' className='tutorialReply'>
                    <p>{JP ? "お願いだから、早く終わらせてくださいよ．．．" : "Please, just...hurry up and get it over with."}</p>
                    <p className='right'>{JP ? "(説明をスキップ)" : "(skip the explanation)"}</p>
                </div>
            </div>

            <div id="tutorialBackground"></div>
        </div>

    )
}

export default Tutorial