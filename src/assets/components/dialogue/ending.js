import * as kkht from "../../kkht/index"
import gsap from "gsap"
import { useRef } from "react"
import { endingDialogue } from "./ending-dialogue"

let runMessageHandler; // module scope
let endingActive = false;


export const endingHandler = ({ maxArousal, JP, setArousal, setInterruptUI, endLineRef, endCallRef }) => {
    const messageBox = document.getElementById("messageBox")
    const messageYes = document.getElementById("messageYes")
    const messageNo = document.getElementById("messageNo")
    const messageLine = document.getElementById("messageLine")

    const endingSteps = endingDialogue(endCallRef.current)

    const decreaseBy = maxArousal.boyd / (endingSteps.length)

    console.log(maxArousal.boyd, endingSteps.length, decreaseBy)

    const callIndexLines = [
        {
            en: '"What a sight you are."',
            jp: '"すごい景色ですよ。"'

        },
        /* 
        {
            en: '"You always do warm to it."',
            jp: '"結局あなたはアタタメテきていました。いつも通りにね。"'
        },
        {
            en: '"Having fun?"',
            jp: '"楽しんでいますか？"'
        },
        {
            en: '"How are you feeling?"',
            jp: '"気分はどうですか？"'
        },
        {
            en: '"You\'re starting to look a bit run down."',
            jp: '"少々くたびれているようですね。"'
        },
        {
            en: '"You look quite the mess."',
            jp: '"少々くたびれているようですね。"'
        },*/
    ]

    if (endingActive) return;
    endingActive = true;

    startMessage()

    function startMessage() {

        const bodyVisible = [
            "body", "head", "mouthFull", "armsSvg", "positioning"
        ]

        setInterruptUI(true)
        messageBox.onclick = null;
        document.getElementById("waitIcon").style.display = "none"

        messageYes.style.display = "none"
        messageNo.style.display = "none"

        runMessageHandler = function () {
            const currentIndex = endLineRef.current;
            //   kkht.valChange(["boyd"], "down", maxArousal, setArousal, 0, decreaseBy, true)

            console.log(currentIndex)

            if (endingSteps[currentIndex - 1]) {
                kkht.dismountMessage({ messageSteps: endingSteps, index: currentIndex })
            }
            if (endingSteps[currentIndex]) {
                kkht.advanceMessage({ messageSteps: endingSteps, index: currentIndex, JP, messageBox });
                endLineRef.current = endLineRef.current + 1
            } else {
                endLineRef.current = 0
                messageBox.onclick = null;
                kkht.endMessage()
                setInterruptUI(false)
            }
        };

        messageBox.onclick = runMessageHandler;


        messageBox.style.cursor = "pointer"


        Array.from(document.getElementsByClassName("message")).forEach(el => {
            el.style.display = "block"
        })

        messageLine.innerHTML = JP ? callIndexLines[endCallRef.current].jp : callIndexLines[endCallRef.current].en

        endCallRef.current = false

        bodyVisible.forEach((el) => {
            document.getElementById(el).classList.add("messageVisible")
        })

        return () => {
            messageBox.onclick = null;
        }
    }
}