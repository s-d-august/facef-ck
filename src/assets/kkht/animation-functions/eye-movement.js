import gsap from "gsap";

/**
 * Moves two elements together in the same direction.
 * If either hits its bounds, both stop. When both have stopped, both move again in a new random direction.
 */
export function eyeMovementToFro({ moveEls, bounds }) {
    console.log("toFro")
    const [el1, el2] = moveEls;
    let tween;

    function randomTarget() {
        let x, y;
        do {
            x = Math.random() * (bounds.maxX - bounds.minX) + bounds.minX;
            y = Math.random() * (bounds.maxY - bounds.minY) + bounds.minY;
        } while (Math.abs(x) < 10 && Math.abs(y) < 10); // avoid trivial moves
        return { x, y };
    }

    function moveToRandomAndBack() {
        // Pick a single random offset so both move together
        const targetOffset = randomTarget({ x: 0, y: 0 });

        const duration = Math.random() * (2 - 1) + 1;
        const delay = Math.random() * (2 - 1) + 1;


        tween = gsap.to([el1, el2], {
            x: targetOffset.x,
            y: targetOffset.y,
            duration: duration,
            delay: delay,
            ease: "none",
            repeat: 1,
            repeatDelay: delay,
            yoyo: true,
            onComplete: moveToRandomAndBack
        })
    }

    moveToRandomAndBack();

    window.addEventListener("resize", () => {
        // Optionally recalculate bounds or clamp positions here
    });

    // Return a cleanup function to kill the tween
    return () => {
        if (tween) tween.kill();
    };
}

export function eyeMovementRandom({ moveEls, bounds }) {
    console.log("random")
    const [el1, el2] = moveEls;
    let tween1, tween2;

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

        function onAnyComplete() {
            if (!completed) {
                completed = true;
                tween1 && tween1.kill();
                tween2 && tween2.kill();
                setTimeout(moveTogether, 0);
            }
        }

        const duration = Math.random() * (1.5 - 1) + 1;
        const delay = Math.random() * (0.5 - 0.2) + 0.2;

        tween1 = gsap.to(el1, {
            x: target1.x,
            y: target1.y,
            duration: duration,
            delay: delay,
            ease: "none",
            onComplete: onAnyComplete
        });
        tween2 = gsap.to(el2, {
            x: target2.x,
            y: target2.y,
            duration: duration,
            delay: delay,
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

    // Return a cleanup function to kill the tweens
    return () => {
        if (tween1) tween1.kill();
        if (tween2) tween2.kill();
    };
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
