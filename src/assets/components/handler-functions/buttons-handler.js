import React, { useState, useEffect } from "react";
import * as kkht from '../../kkht/index'

const ButtonsHandler = ({ buttons, states, default: defaultValue }) => {
    // Initialize state based on buttons
    const [buttonStates, setButtonStates] = useState(
        buttons.reduce((acc, b) => ({ ...acc, [b.id]: defaultValue }), {})
    );

    // BUTTONS
    /* 
        - Mouth (sets holdMouthOpen state)
        - Arms (lowers arms initially, calls faceWipe animation)
    */

    // BUTTON STATES
    /* 
        - Active (visible, opacity full, can be clicked)
        - Inactive (visible, opacity lowered, cannot be clicked)
        - Hide (not visible, cannot be clicked)
    */

    // IMPORTED STATES
    /* 
        - cumOnFace (is cum on face)
        - cumOnTongue (is cum on tongue)
        - mouthOn (is mouthOn)
        - holdMouthOpen
        - mouthOpen
        - armsUp
    */

    useEffect(() => { // ALL BUTTONS

        // If mouth is on, all buttons are inactive
        if (mouthOn || approach) {
            kkht.setAllTo({ state: buttonStates, setter: setButtonStates, value: "inactive" })
        }
    }, [mouthOn, buttonStates])

    useEffect(() => { // ARMS BUTTON

        // When the page loads
        if (armsUp) {
            armsButton.innerText = '"Now now, don\'t be shy."'
        }
        // After having him lower his arms the first time
        else {
            armsButton.innerText = '"Wipe the mess off your face."'
        }

        // Hides wipe button when face is clean
        if (!cumOnFace) {
            setButtonStates(prev => ({ ...prev, armsButton: "hide" }))
        }
    }, [armsUp, cumOnFace, buttonStates])


    useEffect(() => { // MOUTH BUTTON

        // When the page loads, mouthButton is hidden
        if (armsUp) {
            setButtonStates(prev => ({ ...prev, mouthButton: "hide" }))
        }

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
    }, [armsUp, holdMouthOpen, cumOnTongue, buttonStates])
};

export default ButtonsHandler;