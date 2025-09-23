import './Tutorial.css'
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import * as kkht from "../src/assets/kkht/index"

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

        const messageSteps = [

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

        const messageBox = document.getElementById("messageBox")
        const messageYes = document.getElementById("messageYes")
        const messageNo = document.getElementById("messageNo")
        const messageLine = document.getElementById("messageLine")
        const messageArrow = document.getElementById("messageArrow")

        var index = 0

        function messageNoHandler() {
            messageBox.style.cursor = "pointer"
            messageNo.removeEventListener("click", messageNoHandler)
            messageBox.style.paddingBottom = "0"
            messageArrow.style.display = "block"
            skipTutorial()
        }

        function messageYesHandler() {
            messageBox.style.cursor = "pointer"
            messageBox.addEventListener("click", runMessage)
            messageYes.removeEventListener("click", messageYesHandler)
            messageBox.style.paddingBottom = "0"
            messageArrow.style.display = "block"
            messageYes.style.display = "none"
            messageNo.style.display = "none"
            runMessage()
        }

        function runMessage() {
            if (messageSteps[index - 1]) {
                kkht.dismountMessage({ messageSteps, index })
            }
            if (messageSteps[index]) {
                kkht.advanceMessage({ messageSteps, index })
                index++
            } else {
                endTutorial()
                messageBox.removeEventListener("click", runMessage)
            }
        }

        function messageButtonHandler() {
            var string = JP ? '"なあに、忘れました？"' : '"What, do you need a reminder?"'
            startTutorial(string, false)
        }

        function startTutorial(line, yesNo) {

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


            var height = document.getElementById("messageBackground").getBoundingClientRect().height
            gsap.set("#armsSvg", {
                y: (height * 0.065)
            })

            messageLine.innerHTML = line

            bodyVisible.forEach((el) => {
                document.getElementById(el).classList.add("messageVisible")
            })

            index = 0
        }

        function endTutorial() {

            Array.from(document.getElementsByClassName("message")).forEach(el => {
                el.style.display = "none"
            })

            bodyVisible.forEach((el) => {
                document.getElementById(el).classList.remove("messageVisible")
            })

            const blockVisible = ["dickHandFingers", "dick", "dickHandGrab", "dickHandSvg", "armsSvg"]
            blockVisible.forEach((el) => {
                document.getElementById(el).style.display = "block"
            })

            document.getElementById("settersDiv").style.display = "grid"
            document.getElementById("hairPullDiv").style.display = "none"

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

            messageBox.removeEventListener("click", endTutorial)

            setInterruptUI(false)
            document.getElementById("waitIcon").style.display = "block"
        }



        function skipTutorial() {
            messageLine.innerHTML = JP ? '"あら、何と熱心ですね ❤"' : '"My, aren\'t you eager ❤"'
            messageYes.style.display = "none"
            messageNo.style.display = "none"
            messageBox.addEventListener("click", endTutorial)
        }

        document.getElementById("messageButton").addEventListener("click", messageButtonHandler)

        var messageString = JP ? "“これから何が起こる事、説明してあげましょうか？”" : '"Shall I explain how this is going to work?"'

        if (tutorialFired === false) {
            startTutorial(messageString, true)
            setTutorialFired(true)
        }

        return () => {
            document.getElementById("messageButton").removeEventListener("click", messageButtonHandler)

        };

    }, [JP])


    return (
        <div id='message' className='message'>

            <div id='messageContents'>
                <div id='messageYes' className='messageReply '>
                    <p>{JP ? "何が．．．" : "What...?"} </p>
                    <p className='right'>{JP ? "(コントロールの説明)" : "(read an explanation of the controls)"}</p>
                </div>

                <div id='messageNo' className='messageReply '>
                    <p>{JP ? "お願いだから、早く終わらせてくださいよ．．．" : "Please, just...hurry up and get it over with."}</p>
                    <p className='right'>{JP ? "(説明をスキップ)" : "(skip the explanation)"}</p>
                </div>
            </div>

            <div id="messageBackground"></div>
        </div>

    )
}

export default Tutorial