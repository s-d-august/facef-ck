import * as kkht from '../../kkht/index'

export const buttonStatesHandler = (args) => {
    const { armsButton, mouthButton, buttonStates } = args
    const buttons = [armsButton, mouthButton]

    console.log("buttonStates: ", buttonStates)

    buttons.forEach((button) => {
        button.classList.remove("inactive", "hide")
    })

    if (buttonStates.armsButton !== "active")
        armsButton.classList.add(buttonStates.armsButton)

    if (buttonStates.mouthButton !== "active")
        mouthButton.classList.add(buttonStates.mouthButton)

}

export const buttonsInactive = ({ mouthOn, approach, setButtonStates }) => {
    // If mouth is on, all buttons are inactive
    if (mouthOn || approach) {
        kkht.setAllTo({ setter: setButtonStates, value: "inactive", skipValue: "hide" })
    }
}

export const armsButtonHandler = ({ approach, armsUp, armsButton, buttonStates, cumOnFace, armsSvg, cloth, mouthOn, setArmsUp, setButtonStates, setCumOnFace, setInterruptUI }) => {
    // When the page loads
    if (armsUp) {
        armsButton.addEventListener("click", lowerArmsHandler)
        armsButton.innerText = '"Now now, don\'t be shy."'
    }
    // After having him lower his arms the first time
    else if (armsButton.innerText !== '"Wipe the mess off your face."') {
        setButtonStates(prev => ({ ...prev, armsButton: "hide" }))
        armsButton.removeEventListener("click", lowerArmsHandler)
        armsButton.addEventListener("click", faceWipeHandler)
        armsButton.innerText = '"Wipe the mess off your face."'
    } else {
        if (buttonStates.armsButton !== "hide") {
            return
        } else {
            if (approach || mouthOn) {
                setButtonStates(prev => ({ ...prev, armsButton: "inactive" }))
            } else {
                if (!cumOnFace) {
                    setButtonStates(prev => ({ ...prev, armsButton: "hide" }))
                }

                if (cumOnFace) {
                    setButtonStates(prev => ({ ...prev, armsButton: "active" }))
                }
            }

        }
    }

    function faceWipeHandler() {
        kkht.faceWipe({
            elements: armsSvg,
            cloth: cloth,
            animationSetter: setInterruptUI,
            setCumOnFace
        });
    }

    function lowerArmsHandler() {
        kkht.lowerArms({
            elements: armsSvg,
            setter: setArmsUp,
            animationSetter: setInterruptUI
        }
        )
    }

    return () => {
        armsButton.removeEventListener("click", lowerArmsHandler);
        armsButton.removeEventListener("click", faceWipeHandler);
    };
}

export const mouthButtonHandler = ({ approach, buttonStates, mouthArgs, armsUp, mouthButton, mouthOn, mouthOpen, cumOnTongue, holdMouthOpen, setButtonStates
}) => {


    // When the page loads, mouthButton is hidden
    if (armsUp) {
        setButtonStates(prev => ({ ...prev, mouthButton: "hide" }))
    } else {
        setButtonStates(prev => ({ ...prev, mouthButton: "active" }))
    }

    // If mouth isn't set to hold open
    if (!holdMouthOpen) mouthButton.innerText = '"Open your mouth."'

    if ((approach || mouthOn) && (buttonStates.mouthButton !== "hide")) {
        setButtonStates(prev => ({ ...prev, mouthButton: "inactive" }))
    } else {
        // If mouth isn't set to hold open, but currently is open due to position
        if (!holdMouthOpen && mouthOpen) setButtonStates(prev => ({ ...prev, mouthButton: "inactive" }))

        // If mouth is set to holdOpen and mouth is open, but not on
        if (holdMouthOpen && mouthOpen) setButtonStates(prev => ({ ...prev, mouthButton: "active" }))

        if (holdMouthOpen) {
            // if mouth is set to hold open and cum is on tongue
            if (cumOnTongue) { mouthButton.innerText = '"Swallow for me."' }
            // if mouth is set to hold open, but there's no cum on tongue
            else mouthButton.innerText = '"Close your mouth."'
        }
    }



}


export const faceWipeHandler = ({ armsSvg, cloth, setInterruptUI }) => {
    kkht.faceWipe({
        elements: armsSvg,
        cloth: cloth,
        animationSetter: setInterruptUI,
        setCumOnFace
    });
}

export const lowerArmsHandler = ({ armsSvg, setArmsUp, setInterruptUI }) => {
    kkht.lowerArms({
        elements: armsSvg,
        setter: setArmsUp,
        animationSetter: setInterruptUI
    }
    )
}

export const openCloseHandler = ({ holdMouthOpen, arousalTier, setInterruptBreath, setInterruptUI, browLeft, browRight,
    maxArousal, setArousal, sensitivity, mouthArgs, cumOnTongue, hesitation, setHoldMouthOpen
}) => {
    if (!holdMouthOpen) { // if setting mouth to open
        kkht.hesitation({
            deepBreath: (arousalTier === 1) ? "true" : "false",
            animationSetter: [setInterruptUI, setInterruptBreath],
            duration: hesitation,
            playDuring: {
                name: kkht.browRaise,
                args: {
                    browLeft,
                    browRight,
                    duration: hesitation
                }
            },
            playAfter: () => {
                kkht.valChange(["boyd"], "up", maxArousal, setArousal, sensitivity, (maxArousal.boyd / 100 * sensitivity.boyd))
                kkht.mouthOpenFunction({ ...mouthArgs });
                setHoldMouthOpen(true)
            }
        })
    } else {
        // if mouth is open and cum is on tongue
        if (cumOnTongue) {
            kkht.hesitation({
                deepBreath: (arousalTier < 4) ? "true" : "false",
                animationSetter: [setInterruptUI, setInterruptBreath],
                duration: (hesitation * 3),
                playDuring: [{
                    name: kkht.browRaise,
                    args: {
                        browLeft,
                        browRight,
                        duration: hesitation
                    }
                },
                {
                    name: kkht.tearsAnimation,
                    args: {
                        tearRight,
                        tearLeft
                    }
                }],
                playAfter: () => {
                    kkht.mouthCloseFunction({ ...mouthArgs, duration: (hesitation.sec * 3) });
                    setHoldMouthOpen(false)
                    setIsTongueCum(false)
                    kkht.valChange(["boyd"], "up", maxArousal, setArousal, sensitivity, (maxArousal.boyd / 15 * sensitivity.boyd))
                    if (arousalTier < 4) kkht.tearsAnimation({ tearLeft, tearRight })
                }
            })
            // if mouth is open, but no cum is on tongue
        } else {
            kkht.mouthCloseFunction({ ...mouthArgs });
            setHoldMouthOpen(false)
        }
    }
}


export default {
    buttonStatesHandler,
    buttonsInactive,
    armsButtonHandler,
    mouthButtonHandler,
    faceWipeHandler,
    lowerArmsHandler,
    openCloseHandler
};
