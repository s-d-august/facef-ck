import './Tutorial.css'
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import * as kkht from "../src/assets/kkht/index"
import { tutorialDialogue } from './assets/components/dialogue/tutorial-dialogue';

const Tutorial = ({
    setInterruptUI,
    JP,
    hairPullDraggable,
    hairPullBeads,
    body,
    headParts,
    boyNutRef,
    mouthArgs,
    setApproach,
    setMouthOn,
    setMouthOpen,
    setHoldMouthOpen,
    arousalTier,
    devMode
}) => {

    const [tutorialFired, setTutorialFired] = useState(devMode)
    const tutorialIndexRef = useRef(0);

    useEffect(() => {

        const bodyVisible = [
            "body", "head", "mouthFull", "armsGroup", "positioning"
        ]



        const messageBox = document.getElementById("messageBox")
        const messageYes = document.getElementById("messageYes")
        const messageNo = document.getElementById("messageNo")
        const messageLine = document.getElementById("messageLine")
        const messageArrow = document.getElementById("messageArrow")

        var index = 0

        function messageNoHandler() {
            console.log("messageNoHandler called from tutorial.js")
            messageBox.style.cursor = "pointer"
            messageNo.onclick = null
            messageBox.style.paddingBottom = "0"
            messageArrow.style.display = "block"
            skipTutorial()
        }

        function messageYesHandler() {
            console.log("messageYesHandler called from tutorial.js")
            messageBox.style.cursor = "pointer"
            messageBox.onclick = runMessage
            messageYes.onclick = null
            messageBox.style.paddingBottom = "0"
            messageArrow.style.display = "block"
            messageYes.style.display = "none"
            messageNo.style.display = "none"
            runMessage()
        }

        function runMessage() {
            const messageSteps = tutorialDialogue(arousalTier)

            if (messageSteps[index - 1]) {
                kkht.dismountMessage({ messageSteps, index })
            }
            if (messageSteps[index]) {
                kkht.advanceMessage({ messageSteps, index, messageBox, JP })
                index++
            } else {
                endTutorial()
                messageBox.onclick = null
            }
        }

        function tutorialButtonHandler() {
            let index = tutorialIndexRef.current;

            const tutorialCallDialogue = [
                {
                    en: '"What, do you need a reminder?"',
                    jp: '"なあに、忘れました？"'
                },
                {
                    en: '"What, do you need <em>another</em> reminder?"',
                    jp: '"なあに、マタ忘れました？"'
                },
                {
                    en: '"How many times do you expect me to go over this?"',
                    jp: '"何回言わせるつもりですか？"'
                },
                {
                    en: '"You know, I\'m starting to think you\'re stalling."',
                    jp: '"これは段々と時間稼ぎのにおいがしますよ。"'
                },
                {
                    en: '"Fine, but this is the last time, understand?"',
                    jp: '"説明は言いますが、これで最後ですよ。"'
                },
            ]
            if (index === tutorialCallDialogue.length - 1) {
                document.getElementById("tutorialButton").style.display = "none"
            }

            const string = JP ? tutorialCallDialogue[index].jp : tutorialCallDialogue[index].en

            kkht.resetPosition(
                {
                    hairPullDraggable,
                    hairPullBeads,
                    body,
                    headParts,
                    boyNutRef,
                    mouthArgs,
                    setApproach,
                    setMouthOn,
                    setHoldMouthOpen,
                    setMouthOpen,
                    func: () => startTutorial(string, false)
                }
            )
            index++;
            tutorialIndexRef.current = index;
        }

        function startTutorial(line, yesNo) {

            setInterruptUI(true)
            document.getElementById("waitIcon").style.display = "none"

            if (!yesNo) {
                messageYes.style.display = "none"
                messageNo.style.display = "none"

                messageBox.onclick = runMessage
                messageBox.style.cursor = "pointer"
            } else {

                messageArrow.style.display = "none"

                messageBox.style.paddingBottom = "1vh"

                messageNo.onclick = messageNoHandler

                messageYes.onclick = messageYesHandler
            }

            Array.from(document.getElementsByClassName("message")).forEach(el => {
                el.style.display = "block"
            })


            var height = document.getElementById("messageBackground").getBoundingClientRect().height
            gsap.set("#armsGroup", {
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

            const blockVisible = ["dickHandFingersGroup", "dickGroup", "dickHandGrab", "dickHandGroup", "armsGroup"]
            blockVisible.forEach((el) => {
                document.getElementById(el).style.display = "block"
            })

            document.getElementById("settersDiv").style.display = "grid"
            document.getElementById("hairPullDiv").style.display = "none"

            const opacityVisible = ["dick", "settersDiv", "dickHandGrab"]
            opacityVisible.forEach((el) => {
                document.getElementById(el).style.opacity = 1
            })

            const faintVisible = ["dickHandGrab", "dickHandFingersGroup", "hairPullGroup"]
            faintVisible.forEach((el) => {
                document.getElementById(el).style.opacity = 0.2
            })

            gsap.to("#armsGroup", {
                y: 0,
                duration: 1
            })

            messageBox.onclick = null

            setInterruptUI(false)
            document.getElementById("waitIcon").style.display = "block"
        }



        function skipTutorial() {
            messageLine.innerHTML = JP ? '"あら、何と熱心ですね ❤"' : '"My, aren\'t you eager ❤"'
            messageYes.style.display = "none"
            messageNo.style.display = "none"
            messageBox.onclick = endTutorial
        }

        document.getElementById("tutorialButton").addEventListener("click", tutorialButtonHandler)

        var messageString = JP ? "“これから何が起こる事、説明してあげましょうか？”" : '"Shall I explain how this is going to work?"'

        if (tutorialFired === false) {
            startTutorial(messageString, true)
            setTutorialFired(true)
        }

        if (tutorialFired === true) {
            endTutorial()
        }

        return () => {
            document.getElementById("tutorialButton").removeEventListener("click", tutorialButtonHandler)

        };

    }, [JP, arousalTier])


    return (
        <div id='message' className='message'>

            <div id='messageContents'>
                <div id='messageYes' className='messageReply '>
                    <p>{JP ? '"何が．．．"' : '"What...?"'} </p>
                    <p className='right'>{JP ? "(コントロールの説明)" : "(read an explanation of the controls)"}</p>
                </div>

                <div id='messageNo' className='messageReply '>
                    <p>{JP ? '"お願いだから、早く終わらせてくださいよ．．．"' : '"Please, just...hurry up and get it over with."'}</p>
                    <p className='right'>{JP ? "(説明をスキップ)" : "(skip the explanation)"}</p>
                </div>
            </div>

            <div id="messageBackground"></div>
        </div>

    )
}

export default Tutorial