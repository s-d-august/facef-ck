// STATES

// set = A state set by specific player input.
// auto = A state updated automatically as things run.
// curtain = A starting state that, once dismissed, never activates again.

// Returns refers to potential values of a state. If not otherwise stated, all are booleans.

/*
  Distance States (auto)
    - approach
    - mouthOn

  Arousal States (auto)
    - arousalTier
      - Returns: [1, 2, 3, 4, 5]

  Mouth States
    - holdMouthOpen (set / auto)
    - mouthOpen (auto)

  Cum States (auto)
    - cumOnTongue
    - cumOnFace

  Arm States
    - armsUp (curtain, auto)
    - wipeActive (auto) // is the faceWipe animation currently running

  Button States (auto)
    - active // the button is visible and can be clicked
    - inactive // the button has lowered opacity and cannot be clicked
    - hide // the button is not visible and cannot be interacted with

  Draggable States (auto)
    - active // the draggable can be dragged
    - hide // the draggable is not visible and cannot be interacted with
    - dragging // the draggable is actively being dragged
    - hover // the cursor is over the draggable, but it's not actively being dragged

  Setter States (set)
    - sensitivity
      - Returns: integer
    - maxArousal
      - Returns: integer

  Depth States (set)
    - none
    - arousal
    - training

  Animation States
    - baseExpression // aka slowMorph. morph animation that renders based on arousal
    - interruptUI // the UI cannot be interacted with while the animation is playing
    - interruptBreath // the breath cycle is paused while the animation is playing
    - noInterrupt // the animation plays without affecting anything else
*/


// BUTTONS (applies to all)
/*
    Defaults:
     - opacity: 0.6

    Inactive when:
     - mouthOn(true)

    onHover:
     - opacity to 1

   FACE WIPE BUTTON (applies to this button only)
     Hide when:
      - cumOnFace(false)

*/

// DRAGGABLES (applies to all)
/*

    Defaults:
     - opacity: 0

    onHover:
     - opacity: 1

    onDrag:
     - opacity: 1

    Hide when:
      - interruptUI

    JOHAND (applies to this draggable only)
     Hide when:
      - hairPullHand isDragging

*/

// MOUTH

/* */