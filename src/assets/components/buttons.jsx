import react, { useEffect } from "react"

function Buttons({ approach, armsButton, armsSvg, armsUp, arousalTier,
    browLeft, browRight, buttonStates, cloth, cumOnFace, cumOnTongue,
    hesitation, holdMouthOpen, maxArousal, mouthArgs, mouthButton, mouthOn,
    mouthOpen, sensitivity, setArmsUp, setArousal, setButtonStates,
    setHoldMouthOpen, setInterruptBreath, setInterruptUI
}) {

    useEffect(() => { // Renders button states

        const buttons = [armsButton, mouthButton]
        console.log(buttons)

        buttons.forEach((button) => {
            console.log
            button.classList.remove("inactive", "hide")
        })

        if (buttonStates.armsButton !== "active")
            armsButton.classList.add(buttonStates.armsButton)

        if (buttonStates.mouthButton !== "active")
            mouthButton.classList.add(buttonStates.mouthButton)
    }, [buttonStates])

    return (

    )
}

export default Buttons