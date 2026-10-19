import gsap from "gsap";

export function eyeMovement({ moveEls, bounds, type }) {
    let tween, duration, delay

    const toFro = (type === "toFro")

    delay = toFro ? gsap.utils.random(1, 2) : gsap.utils.random(0.3, 0.6)
    duration = toFro ? gsap.utils.random(1.5, 3) : gsap.utils.random(1, 2)

    function randomTarget() {
        let x, y;
        do {
            x = Math.random() * (bounds.maxX - bounds.minX) + bounds.minX;
            y = Math.random() * (bounds.maxY - bounds.minY) + bounds.minY;
        } while (Math.abs(x) < 10 && Math.abs(y) < 10); // avoid trivial moves
        return { x, y };
    }

    function moveToRandom() {
        // Pick a single random offset so both move together
        const targetOffset = randomTarget({ x: 0, y: 0 });

        tween = gsap.to(moveEls, {
            x: targetOffset.x,
            y: targetOffset.y,
            duration: duration,
            delay: delay,
            ease: "none",
            repeat: toFro ? 1 : 0,
            repeatDelay: toFro ? delay : 0,
            yoyo: toFro ? true : false,
            onComplete: moveToRandom
        })
    }

    toFro ? gsap.set(moveEls, { x: 0, y: 0 }) : null
    moveToRandom();

    window.addEventListener("resize", () => {
        // Optionally recalculate bounds or clamp positions here
    });

    // Return a cleanup function to kill the tween
    return () => {
        if (tween) tween.kill();
    };
}


export const bounceBounds = ({ moveEl, bounds }) => {


    let minX = 0;
    let minY = 0;
    let size = moveEl.getBoundingClientRect().width;
    let maxX = bounds.getBoundingClientRect().width - size;
    let maxY = bounds.getBoundingClientRect().height - size;


    gsap.to(moveEl, {
        duration: 20,
        x: 200 * randomSign(),
        y: 200 * randomSign(),
        modifiers: { x: modX, y: modY },
        ease: "none",
        repeat: -1,
        yoyo: true
    });

    function modX(x) {
        x = parseFloat(x);
        if (x > maxX || x < minX) {
            let delta = ((x % maxX) + maxX) % maxX;
            let start = x > maxX ? 1 : 0;
            let ratio = x / maxX + start;
            let even = !(ratio & 1);

            x = even ? maxX - delta : minX + delta;
        }
        return x;
    }

    function modY(y) {
        y = parseFloat(y);
        if (y > maxY || y < minY) {

            let delta = ((y % maxY) + maxY) % maxY;
            let start = y > maxY ? 1 : 0;
            let ratio = y / maxY + start;
            let even = !(ratio & 1);

            y = even ? maxY - delta : minY + delta;
        }
        return y;
    }

    window.addEventListener("resize", () => {
        maxX = bounds.getBoundingClientRect().width - size;
        maxY = bounds.getBoundingClientRect().height - size;
    });

    function randomSign() {
        return Math.random() < 0.5 ? -1 : 1;
    }

}
