import gsap from "gsap"

export const endingDialogue = (index) => {

    return endingScripts[0]
}

const eyeCenters = ["#eyeCenterRight", "#eyeCenterLeft"]

function lookDown() {
    gsap.timeline()
        .to(eyeCenters, {
            y: 17,
            duration: 1
        })
}

function lookLeft() {
    gsap.timeline()
        .to(eyeCenters, {
            x: 10,
            duration: 1
        })
}

function lookRight() {
    gsap.timeline()
        .to(eyeCenters, {
            x: -20,
            duration: 1
        })
}

function callSmile() {
    console.log("callSmile fired")
    gsap.to(eyeCenters, {
        y: 0,
        x: 0,
        duration: 1.5
    })
    gsap.to("#faceBack", {
        morphSVG: "#faceSmile",
        duration: 2
    })
    gsap.to("#mouth", {
        morphSVG: "#mouthSmile",
        duration: 2
    })
}

const endingScripts = [
    [
        {
            line: '"You always do warm to it."',
            jp: '"結局あなたはアタタメテきていました。いつも通りにね。"',
            function: lookDown
        },
        {
            line: '"You just need a little...persuasion, sometimes."',
            jp: '"ただ、時には多少の説得には必要があります。"',
            function: lookLeft
        },
        {
            line: '"Isn\'t that right?"',
            jp: '"そうでしょう？"',
            function: lookRight
        },
        {
            line: '"...❤"',
            jp: '"...❤"',
            color: "blue",
            function: callSmile
        },
        {
            line: '"That\'s my good boy ❤"',
            jp: '"何と良い子、あなたってのは ❤"',
        },
        /* 
        {
            line: '"You know, I wouldn\'t mind stopping now."',
            jp: '"これで終わりにしても、僕は別に構いませんよ。"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"But you don\'t seem like you\'ve quite had your fill yet."',
            jp: '"だが、あなたはまだまだ満足していなさそうね。"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"...please don\'t do this."',
            jp: '"お願いだから..."',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"What, are you going to <em>pretend</em> to be scared again?"',
            jp: '"何、まだ怖がるフリをするつもりか？"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"Well, I can\'t say I mind."',
            jp: '"まあ、それでも結構です。"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"It\'s a <em>very</em> cute look on you ❤"',
            jp: '"可愛くてよく似合いますよ ❤"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"But you know you can stop me any time."',
            jp: '"でもさあ、いつでも僕を辞めさられるのだと分かっているでしょう？"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"You just have to say the word."',
            jp: '"ただ、そう言って。"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"..."',
            jp: '"..."',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"Well, if you\'re so <em>eager</em>..."',
            jp: '"まあ、それほど熱心ならば..."',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"I\'d better not keep you waiting ❤"',
            jp: '"待たせばいけませんね ❤"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
    ], [
        {
            line: '"You\'re adorable when you forget yourself ❤"',
            jp: '"身を和すれば、何と可愛い ❤"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"Please say you\'ve had enough. <em>Please.</em>"',
            jp: '"これで満足したと言って下さい。お願いだから..."',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"Why are you asking me? You know it\'s your decision."',
            jp: '"なぜ僕に聞いていますか？あなたの判断だと分かっているでしょう？"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"...you\'re a bastard."',
            jp: '"...おまえ、最悪だ。"',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"And you\'re too stubborn for your own good."',
            jp: '"そしてあなたは頑固過ぎていますね。"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"You know we keep going until <em>you</em> say <em>you\'ve</em> had enough."',
            jp: '"アナタが満足していると言うまで続くってこと、知っているでしょう？"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"And I know what <em>you\'ll</em> do if I say it."',
            jp: '"言えばおまえがどうするって事も知っている。"',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"Oh, I\'m sure you do ❤"',
            jp: '"確かにね ❤"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
    ], [
        {
            line: '"You can\'t <em>still</em> want to continue."',
            jp: '"まさか続けようと..."',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"Oh, but you know I do."',
            jp: '"よく承知していますね。"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"...how much more do you want me to..."',
            jp: '"どこまで俺を..."',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"I gave you a choice; you said you wanted to do this."',
            jp: '"これを選んだのはあなたでしょう？"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"That was <em>not</em> a <em>choice</em>."',
            jp: '"選択などなかったぞ。"',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"Of course it was."',
            jp: '"もちろん選択でしたよ"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"You don\'t have to like the options for it to be a choice."',
            jp: '"選びたくない選択でも選択である。"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"And you made yours."',
            jp: '"あなたは選びました。"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"So unless you\'ve changed your mind..."',
            jp: '"その選びを変わりたいですか？"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"<em>No</em>."',
            jp: '"イヤだ。"',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"Then we keep going ❤"',
            jp: '"じゃあ、続きましょう ❤"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
    ], [
        {
            line: '"I can\'t take this. I can\'t take this..."',
            jp: '"もうできない、これ以上..."',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"Don\'t put yourself down, now."',
            jp: '"自分を悪く言わないでくだいさいよ。"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"I\'d say you\'ve gotten quite good at taking it."',
            jp: '"ここから見ると、結構上手にやっています。"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"Go to hell."',
            jp: '"貴様..."',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"You know, there are <em>other things</em> I wouldn\'t mind doing."',
            jp: '"僕はして見たいこと、他にもありますよ。"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"In fact, I think I <em>am</em> starting to get bored of this."',
            jp: '"そういえば、これはちょっと退屈になっていました。"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"So unless you <em>really</em> want to continue..."',
            jp: '"ですので、本当に続きたいのでなければ..."',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"...fine."',
            jp: '"...分かった。"',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"Are you sure?"',
            jp: '"確かですか？"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"You know I\'d never want to make you do anything you didn\'t want to do."',
            jp: '"したくない事をさせますなど..."',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"Yes I\'m sure...!"',
            jp: '"確かだぞ...!"',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"Yes <em>what</em>?"',
            jp: '"何が？"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '".......yes please."',
            jp: '"...続きたい。"',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"Well, if you\'re asking so nicely..."',
            jp: '"まあ、そうご丁寧に頼められたら..."',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"How can I refuse?"',
            jp: '"断れませんね ❤"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
    ], [
        {
            line: '"Do you want to keep going?"',
            jp: '"続きたいですか？"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"...yes."',
            jp: '"...うん。"',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '".......please."',
            jp: '"...お願いします。"',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"See? It\'s really not so difficult."',
            jp: '"ほら、そんなに難しい事ではありませんよ。"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
    ], [
        {
            line: '"Had enough yet?"',
            jp: '"続きましょうか？"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"...not unless you have."',
            jp: '"...おまえが終わりたくなければ..."',
            color: "blue",
            visible: ["boyBarWrap", "progressBarsDiv"]
        },
        {
            line: '"A good answer from a good boy ❤"',
            jp: '"良い子からの良い答え ❤"',
            visible: ["boyBarWrap", "progressBarsDiv"]
        }, */
    ]
]

