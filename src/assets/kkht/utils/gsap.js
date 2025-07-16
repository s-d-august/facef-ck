import gsap from "gsap";
import { Draggable } from "gsap/all";
gsap.registerPlugin(Draggable)

export const resetDraggable = (draggable, elements) => {
    console.log(draggable, elements)
    gsap.set(elements, {
        x: 0,
        y: 0,
        opacity: 0
    })
    if (Array.isArray(draggable)) {
        draggable.forEach((drag) => {
            drag.update()
        })
    } else draggable.update()

}

export const updateFollowers = ({ itemsArray, x, y, ease, init, increase }) => {
    function follower(target, duration, ease) {
        let xTo = gsap.quickTo(target, "x", { duration: duration, ease: ease }),
            yTo = gsap.quickTo(target, "y", { duration: duration, ease: ease });
        return (x, y) => { xTo(x); yTo(y) };
    }

    const followers = itemsArray.map(
        (el, i) => follower(el, init + i * increase, ease)
    );

    followers.forEach(f => f(x, y));
}

export const pauseDraggable = ([draggableIdentifiers], delay) => {
    draggableIdentifiers.forEach(el => {
        Draggable.get(el)?.disable();
    });
    setTimeout(() => {
        draggableIdentifiers.forEach(el => {
            Draggable.get(el)?.enable();
        });
    }, delay);
}