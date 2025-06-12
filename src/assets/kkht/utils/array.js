export const pluckRandomFrom = (array, typeKey, arrayEligibleMap) => {
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

export const randomizeArray = async (idString, animation, args) => {

    var arrayName = document.getElementById(`${idString}Group`)
    var array = [...arrayName.children]

    if (array.length === 0 || !document.hasFocus()) return

    var index = Math.floor(Math.random() * array.length); // Generates a random index for the array
    var element = array[index]; // Retrieves the value associated with the index

    array.splice(index, 1) // Removes the selected element from the array
    await animation(element, args)

    array.splice(0, 0, element) // Adds the element back to the array so it can be called again
}