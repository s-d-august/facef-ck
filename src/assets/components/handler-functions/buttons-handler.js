import * as kkht from '../../kkht/index'

export const buttonStatesHandler = (armsButton, mouthButton, buttonStates) => {
    const buttons = [armsButton, mouthButton]
    console.log(buttonStates.armsButton)
    buttons.forEach((button) => {
        button.classList.remove("inactive", "hide")
    })

    if (buttonStates.armsButton !== "active")
        armsButton.classList.add(buttonStates.armsButton)

    if (buttonStates.mouthButton !== "active")
        mouthButton.classList.add(buttonStates.mouthButton)

}

export const buttonsInactive = ({ mouthOn, approach, buttonStates, setButtonStates }) => {
    // If mouth is on, all buttons are inactive
    if (mouthOn || approach) {
        kkht.setAllTo({ state: buttonStates, setter: setButtonStates, value: "inactive" })
    }
}

export const armsButtonHandler = ({ armsUp, armsButton, cumOnFace, armsSvg, cloth, setArmsUp, setInterruptUI, setButtonStates }) => {
    // When the page loads
    if (armsUp) {
        console.log(armsButton)
        armsButton.addEventListener("click", lowerArmsHandler)
        armsButton.innerText = '"Now now, don\'t be shy."'
    }
    // After having him lower his arms the first time
    else {
        armsButton.removeEventListener("click", lowerArmsHandler)
        armsButton.addEventListener("click", faceWipeHandler)
        armsButton.innerText = '"Wipe the mess off your face."'
    }

    // Hides wipe button when face is clean
    if (!cumOnFace && !armsUp) {
        setButtonStates(prev => ({ ...prev, armsButton: "hide" }))
    }

    function faceWipeHandler() {
        kkht.faceWipe({
            elements: armsSvg,
            cloth: cloth,
            animationSetter: setInterruptUI
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

export const mouthButtonHandler = ({ arousalTier, setInterruptBreath, setInterruptUI, browLeft, browRight,
    maxArousal, setArousal, sensitivity, mouthArgs, hesitation, armsUp, mouthButton, mouthOpen, cumOnTongue, holdMouthOpen, setButtonStates
}) => {
    // When the page loads, mouthButton is hidden
    if (armsUp) {
        console.log("armsUp noted")
        setButtonStates(prev => ({ ...prev, mouthButton: "hide" }))
    } else mouthButton.addEventListener("click", openCloseHandler)

    // If mouth isn't set to hold open
    if (!holdMouthOpen) mouthButton.innerText = '"Open your mouth."'

    // If mouth isn't set to hold open, but currently is open due to position
    if (!holdMouthOpen && mouthOpen) setButtonStates(prev => ({ ...prev, mouthButton: "inactive" }))

    if (holdMouthOpen) {
        // if mouth is set to hold open and cum is on tongue
        if (cumOnTongue) { mouthButton.innerText = '"Swallow for me."' }
        // if mouth is set to hold open, but there's no cum on tongue
        else mouthButton.innerText = '"Close your mouth."'
    }

    function openCloseHandler() {
        if (!holdMouthOpen) { // if setting mouth to open
            kkht.hesitation({
                deepBreath: (arousalTier === 1) ? "true" : "false",
                animationSetter: [setInterruptUI, setInterruptBreath],
                duration: hesitation.sec,
                playDuring: {
                    name: kkht.browRaise,
                    args: {
                        browLeft,
                        browRight
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
                    duration: (hesitation.sec * 3),
                    playDuring: [{
                        name: kkht.browRaise,
                        args: {
                            browLeft: browLeft,
                            browRight: browRight
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
                        console.log("hesitation.sec: ", hesitation.sec)
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

    return () => {
        mouthButton.removeEventListener("click", openCloseHandler);
    };
}


export const faceWipeHandler = ({ armsSvg, cloth, setInterruptUI }) => {
    kkht.faceWipe({
        elements: armsSvg,
        cloth: cloth,
        animationSetter: setInterruptUI
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

export const OpenCloseHandler = ({ holdMouthOpen, arousalTier, setInterruptBreath, setInterruptUI, browLeft, browRight,
    maxArousal, setArousal, sensitivity, mouthArgs, cumOnTongue, hesitation
}) => {
    if (!holdMouthOpen) { // if setting mouth to open
        kkht.hesitation({
            deepBreath: (arousalTier === 1) ? "true" : "false",
            animationSetter: [setInterruptUI, setInterruptBreath],
            duration: hesitation.sec,
            playDuring: {
                name: kkht.browRaise,
                args: {
                    browLeft,
                    browRight
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
                duration: (hesitation.sec * 3),
                playDuring: [{
                    name: kkht.browRaise,
                    args: {
                        browLeft: browLeft,
                        browRight: browRight
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
                    console.log("hesitation.sec: ", hesitation.sec)
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
    OpenCloseHandler
};
