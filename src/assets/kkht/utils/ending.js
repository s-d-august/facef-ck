import * as kkht from "../index"

export const endingHandler = ({ maxArousal, JP, setArousal }) => {
    const messageBox = document.getElementById("messageBox")
    const messageYes = document.getElementById("messageYes")
    const messageNo = document.getElementById("messageNo")
    const messageLine = document.getElementById("messageLine")
    const messageArrow = document.getElementById("messageArrow")

    var index = 0

    const endingSteps = [
        {
            line: '"See? I said you\'d enjoy yourself. You always do."',
            jp: '"ほら、僕が言った通りに楽しみました。いつも通りにね。"'
        },
        {
            line: '"You just need a little...persuasion, sometimes."',
            jp: '"ただ、時には多少の説得には必要があります。"'
        },
        {
            line: '"We can stop now, if you want. But I have a feeling you\'re up for more."',
            jp: '"これで終わりにしても、僕は別に構いませんよ。だが、あなたはまだ続けたがっているみたいですね。"'
        },
        {
            line: '"Isn\'t that right?"',
            jp: '"そうですよね？"'
        },
        {
            line: '"...please don\'t do this."',
            jp: '"お願いだから..."',
            color: "blue"
        },
        {
            line: '"What, are you going to <em>pretend</em> to be scared again?"',
            jp: '"何、まだ怖がるフリをするつもりか？"'
        },
        {
            line: '"Well, I can\'t say I mind. It\'s a <em>very</em> cute look on you ❤"',
            jp: '"まあ、それでも良いのですよ。可愛くてよく似合いますよ ❤"'
        },
        {
            line: '"If you want me to stop, just say so."',
            jp: '"辞めたいなら、そう言って。"'
        },
        {
            line: '"..."',
            jp: '"..."',
            color: "blue"
        },
        {
            line: '"That\'s what I thought ❤"',
            jp: '"ですよね～❤"'
        },
    ]

    const decreaseBy = maxArousal.boyd / (endingSteps.length)

    kkht.startMessage({
        line: "",
        yesNo: false,
        messageYes,
        messageNo,
        messageArrow,
        messageBox,
        messageLine,
        runMessageHandler
    })

    function runMessageHandler() {

        kkht.valChange(["boyd"], "down", maxArousal, setArousal, null, decreaseBy)

        if (endingSteps[index - 1]) {
            kkht.dismountMessage({ endingSteps, index })
        }
        if (endingSteps[index]) {
            kkht.advanceMessage({ endingSteps, index, JP, messageBox })
            index++
        } else {
            kkht.endTutorial
            messageBox.removeEventListener("click", runMessageHandler)
        }
    }
}