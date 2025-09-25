import * as kkht from "../../kkht/index"
import gsap from "gsap"
import { useRef } from "react"
import { endingDialogue } from "./ending-dialogue"

export const endingHandler = ({ maxArousal, JP, setArousal, setInterruptUI }) => {
    const messageBox = document.getElementById("messageBox")
    const messageYes = document.getElementById("messageYes")
    const messageNo = document.getElementById("messageNo")
    const messageLine = document.getElementById("messageLine")

    const index = useRef(0)
    const callIndex = useRef(0)

    const endingSteps = endingDialogue()

    const decreaseBy = maxArousal.boyd / (endingSteps.length)

    console.log(maxArousal.boyd, endingSteps.length, decreaseBy)

    const callIndexLines = [
        {
            en: '"Just look at you..."',
            jp: '"何と顔ですね..."'
        },
        {
            en: '"What a sight you are."',
            jp: '"すごい景色ですよ。"'
        },
        {
            en: '"Having fun?"',
            jp: '"楽しんでいますか？"'
        },
    ]

    startMessage()

    function startMessage() {

        const bodyVisible = [
            "body", "head", "mouthFull", "armsSvg", "positioning"
        ]

        setInterruptUI(true)
        document.getElementById("waitIcon").style.display = "none"

        messageYes.style.display = "none"
        messageNo.style.display = "none"

        messageBox.removeEventListener("click", runMessageHandler);
        messageBox.addEventListener("click", runMessageHandler);

        messageBox.style.cursor = "pointer"


        Array.from(document.getElementsByClassName("message")).forEach(el => {
            el.style.display = "block"
        })

        messageLine.innerHTML = JP ? callIndexLines[callIndex].jp : callIndexLines[callIndex].en

        if (callIndexLines[callIndex++]) callIndex++

        bodyVisible.forEach((el) => {
            document.getElementById(el).classList.add("messageVisible")
        })

        return () => {
            messageBox.removeEventListener("click", runMessageHandler)
        }
    }

    function runMessageHandler() {

        kkht.valChange(["boyd"], "down", maxArousal, setArousal, 0, decreaseBy, true)

        console.log(decreaseBy)

        if (endingSteps[index - 1]) {
            kkht.dismountMessage({ messageSteps: endingSteps, index })
        }
        if (endingSteps[index]) {
            kkht.advanceMessage({ messageSteps: endingSteps, index, JP, messageBox })
            index++
        } else {
            messageBox.removeEventListener("click", runMessageHandler)
            kkht.endMessage()
            setInterruptUI(false)
        }
    }
}