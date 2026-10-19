import { trainingMultiplier } from "../../kkht";

export const tutorialDialogue = (arousalTier) => {
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

    console.log(trainingMultiplier(
        {
            id: "#hairPullHandTopmost",
            initial: 0.125,
            output: true
        }))

    var mult = (trainingMultiplier(
        {
            id: "#hairPullHandTopmost",
            output: true
        }))

    return (
        [
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
                zBoost: ["dickHandFingersGroup", "dick", "dickHandGrab", "dickHandSvg"],
                display: "none",
                opacity: true
            },
            {
                line: (mult >= 0.2)
                    ? '"Just a little practice, and you can already take me all the way to the hilt... What a good boy ❤"'
                    : (mult >= 0.1675)
                        ? '"You\'ve gotten better at <em>taking</em> me, but there\'s still room for improvement."'
                        : '"You may not be able to <em>take</em> me very far at first, but I\'m sure you\'ll get better with some training."',
                jp: (mult >= 0.2)
                    ? '"少しだけの練習で、 根元まで飲み込められる... 何と良い子 ❤"'
                    : (mult >= 0.1675)
                        ? '"結構上手になりましたが、まだまだ上達できると信じますよ。"'
                        : '"最初に僕のをあまり深くいただけないが、多少の教習で上手になるはずです。"',
                visible: ["settersDiv"],
                shade: settingsChildren,
                collapseOff: ["settersDiv", "settingsContents"],
                collapseOn: ["settingsIcon"],
                type: "Training",
                display: "none",
                opacity: true
            },
            {
                line: (arousalTier >= 2)
                    ? '"Besides, it seems as though you\'re starting to come around."'
                    : (mult >= 0.1675)
                        ? '"Now if only you could relax and enjoy yourself..."'
                        : '"Or maybe as you come to enjoy it."',
                jp: (arousalTier >= 2)
                    ? '"それに、好きになってきているみたいですよ。"'
                    : (mult >= 0.1675) ? '"あなたがただ安心して楽しめばね..."'
                        : '"または、あなたが好きになりますうちにね。"',
                shade: settingsChildren,
                visible: ["settersDiv"],
                type: "Arousal",
                display: "none",
                opacity: true
            },
            {
                line: (arousalTier >= 3)
                    ? '"In fact, it looks as though you\'re already enjoying yourself quite a bit."'
                    : '"Because you <em>will</em> come to enjoy it, in your own way."',
                jp: (arousalTier >= 3)
                    ? '"結構楽しそう、ここから見ると。"'
                    : '"いずれ好きになりますよ、あなたなりに。きっと。"',
                visible: ["boyBarWrap", "progressBarsDiv"],
                collapseOn: ["settersDiv", "settingsContents"],
                collapseOff: ["settingsIcon"],
                type: "Training",
            },
            {
                line: (arousalTier >= 3)
                    ? '"And to think you were acting so scared at first..."'
                    : '"So don\'t look so scared, alright?"',
                jp: (arousalTier >= 3)
                    ? '"最初にはそう怖がるフリをしていましたのに..."'
                    : '"だから、そう怖がらなくてもいいのですよ？"'
            },
            {
                line: (arousalTier >= 3)
                    ? '"I said this would be fun ❤"'
                    : '"This is going to be fun ❤"',
                jp: (arousalTier >= 3)
                    ? '"楽しくなると言ったのでしょう？ ❤"'
                    : '"楽しみましょう ❤"'
            }
        ])
}