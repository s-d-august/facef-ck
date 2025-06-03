import { gsap } from 'gsap'
import { Draggable } from 'gsap/dist/Draggable'
import { InertiaPlugin } from 'gsap/all'

function valUp() {
    setIves((prevIves) => {
        const newIves = prevIves + 1;
        if (newIves > maxIves) {
            return 0; // Do not increment further if max is reached
        }
        return newIves; // Increment Ives
    });
    setBoyd((prevBoyd) => {
        const newBoyd = prevBoyd + 1;
        if (newBoyd > maxBoyd) {
            return prevBoyd; // Do not increment further if max is reached
        }
        return newBoyd; // Increment Boyd
    });
};

function getDroolVals(id, overlapId) {
    const head = document.getElementById(overlapId);
    const drool = document.getElementById(id);
    const droolRect = drool.getBoundingClientRect();
    const headRect = head.getBoundingClientRect();
    return {
        drool,
        droolBottom: droolRect.bottom,
        headBottom: headRect.bottom,
        defY: droolRect.top
    };
}

export const random = () => {
    if (Math.random() > 0.5) {
        return true
    } else return false
}

export const valChange = (ids, upDown) => {
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    ids.forEach((key) => {
        setArousal((prev) => {
            const newVal = upDown === "up" ? prev[key] + 1 : prev[key] - 1;
            if (upDown === "up") {
                if (newVal > maxArousal[key]) {
                    return { ...prev, [key]: prev[key] };
                }
                return { ...prev, [key]: newVal };
            } else if (upDown === "down") {
                if (newVal < 0) {
                    return { ...prev, [key]: 0 };
                }
                return { ...prev, [key]: newVal };
            }
            return prev;
        });
    });
}

export const updateFollowers = (itemsArray, x, y, ease, init, increase) => {

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


export const getOverlapPercent = (rectA, rectB) => {
    const x_overlap = Math.max(
        0,
        Math.min(rectA.right, rectB.right) - Math.max(rectA.left, rectB.left)
    );
    const y_overlap = Math.max(
        0,
        Math.min(rectA.bottom, rectB.bottom) - Math.max(rectA.top, rectB.top)
    );
    const overlapArea = x_overlap * y_overlap;
    const areaA = (rectA.right - rectA.left) * (rectA.bottom - rectA.top);
    return areaA ? (overlapArea / areaA) : 0; // percent of A overlapped by B
}