import gsap from "gsap";

/**
 * Moves two elements together in the same direction.
 * If either hits its bounds, both stop. When both have stopped, both move again in a new random direction.
 * @param {Object} params
 * @param {HTMLElement[]} params.moveEls - Array of two elements to move
 * @param {HTMLElement[]} params.bounds - Array of two bounding elements (same order as moveEls)
 */
export function eyeMovementPair({ moveEls, bounds }) {
    const [el1, el2] = moveEls;

    function moveTogether() {

        const rel1 = {
            x: gsap.getProperty(el1, "x"),
            y: gsap.getProperty(el1, "y")
        };
        const rel2 = {
            x: gsap.getProperty(el2, "x"),
            y: gsap.getProperty(el2, "y")
        };

        const angle = Math.random() * Math.PI * 2;

        function maxDist(rel, b) {
            const minX = b.minX, minY = b.minY;
            const dx = angle < Math.PI ? b.maxX - rel.x : rel.x - minX;
            const dy = (angle > Math.PI / 2 && angle < 3 * Math.PI / 2) ? rel.y - minY : b.maxY - rel.y;
            const distX = Math.abs(dx / Math.cos(angle));
            const distY = Math.abs(dy / Math.sin(angle));
            return Math.min(distX, distY);
        }
        const dist1 = maxDist(rel1, bounds);
        const dist2 = maxDist(rel2, bounds);
        const maxDistAll = Math.max(20, Math.min(dist1, dist2, 100)); // Clamp to at least 20px, at most 100px

        const dx = Math.cos(angle) * maxDistAll;
        const dy = Math.sin(angle) * maxDistAll;

        function clamp(val, min, max) {
            return Math.max(min, Math.min(max, val));
        }
        const target1 = {
            x: clamp(rel1.x + dx, bounds.minX, bounds.maxX),
            y: clamp(rel1.y + dy, bounds.minY, bounds.maxY)
        };
        const target2 = {
            x: clamp(rel2.x + dx, bounds.minX, bounds.maxX),
            y: clamp(rel2.y + dy, bounds.minY, bounds.maxY)
        };

        let completed = false;
        let tween1, tween2;

        function onAnyComplete() {
            if (!completed) {
                completed = true;
                tween1 && tween1.kill();
                tween2 && tween2.kill();
                // Start the next move after a short delay for visual clarity
                setTimeout(moveTogether, 0);
            }
        }

        tween1 = gsap.to(el1, {
            delay: "random(0.2, 0.5)",
            x: target1.x,
            y: target1.y,
            duration: "random(1, 1.5)",
            ease: "none",
            onComplete: onAnyComplete
        });
        tween2 = gsap.to(el2, {
            delay: "random(0.2, 0.5)",
            x: target2.x,
            y: target2.y,
            duration: "random(1, 1.5)",
            ease: "none",
            onComplete: onAnyComplete
        });
    }

    // Initialize positions
    gsap.set([el1, el2], { x: 0, y: 0 });

    moveTogether();

    // Optionally, handle resize
    window.addEventListener("resize", () => {
        // You may want to reset or clamp positions here
    });
}

export const eyeMovement = ({ moveEl, bounds }) => {

    console.log(moveEl.getBoundingClientRect(), bounds.getBoundingClientRect())

    let minX = -17;
    let minY = 0;
    let size = moveEl.getBoundingClientRect().width;
    let maxX = bounds.getBoundingClientRect().width - (size * 1.5);
    let maxY = bounds.getBoundingClientRect().height - size;

    console.log("maxX: ", maxX, "maxY: ", maxY)

    function moveToRandom() {
        const x = Math.random() * (maxX - minX) + minX;
        const y = Math.random() * (maxY - minY) + minY;
        gsap.to(moveEl, {
            delay: 0.5,
            duration: 3,
            x,
            y,
            ease: "none",
            onComplete: moveToRandom
        });
    }
    moveToRandom();

    window.addEventListener("resize", () => {
        maxX = bounds.getBoundingClientRect().width - size;
        maxY = bounds.getBoundingClientRect().height - size;
    });

    function randomSign() {
        return Math.random() < 0.5 ? -1 : 1;
    }

    function random(min, max) {
        if (max == null) { max = min; min = 0; }
        return Math.random() * (max - min) + min;
    }
}

export const bounceBounds = ({ moveEl, bounds }) => {

    console.log(moveEl.getBoundingClientRect().width)

    let minX = 0;
    let minY = 0;
    let size = moveEl.getBoundingClientRect().width;
    let maxX = bounds.getBoundingClientRect().width - size;
    let maxY = bounds.getBoundingClientRect().height - size;

    console.log("maxX: ", maxX, "maxY: ", maxY)

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
            console.log("modX fired")
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
            console.log("modY fired")

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

    function random(min, max) {
        if (max == null) { max = min; min = 0; }
        return Math.random() * (max - min) + min;
    }
}
