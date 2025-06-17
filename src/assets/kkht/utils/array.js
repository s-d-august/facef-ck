import gsap from "gsap";

export const pluckRandomFrom = (args) => {
    const { array, typeKey, arrayEligibleMap } = args

    if (!arrayEligibleMap[typeKey] || arrayEligibleMap[typeKey].length === 0) {
        arrayEligibleMap[typeKey] = gsap.utils.shuffle(array.slice(0));
    }
    return arrayEligibleMap[typeKey].pop();
}

export const getRandomFrom = (array) => {
    var selected = array.selected;
    while (
        selected === (array.selected = Math.floor(Math.random() * array.length))
    ) { }
    return array[array.selected];
}

export const clearDupes = (arr1, arr2) => {
    let a = [...arr1];
    let b = [...arr2];
    for (let i = 0; i < b.length; i++) {
        const idx = a.indexOf(b[i]);
        if (idx !== -1) {
            a.splice(idx, 1);
        }
    }
    return [a];
}

/* Selects a random element from an array, removes it from that array while animation is running,
and returns it to the array so it can be selected again once the animation is complete
*/

// Add this at module scope
const activeElements = []

export const randomizeArray = async (args) => {
    const { idString, animation, areaHeight } = args;

    var arrayName = document.getElementById(`${idString}Group`);
    var array = [...arrayName.children];

    // Filter out elements currently being animated
    if (!activeElements[idString]) {
        activeElements[idString] = new Set()
    }

    array = array.filter(el => !activeElements[idString].has(el));

    if (array.length === 0 || !document.hasFocus()) return;

    var index = Math.floor(Math.random() * array.length);
    var element = array[index];

    // Mark as active

    activeElements[idString].add(element);

    await animation(element, areaHeight);

    // Animation done, mark as available again
    activeElements[idString].delete(element);
};