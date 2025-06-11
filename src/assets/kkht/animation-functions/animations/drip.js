/* Selects a random element from an array, removes it from that array while animation is running,
and returns it to the array so it can be selected again once the animation is complete
*/

export const randomizeArray = async (idString, animation, boundsHeight) => {

    var arrayName = document.getElementById(`${idString}Group`)
    var array = [...arrayName.children]

    if (array.length === 0 || !document.hasFocus()) return

    var index = Math.floor(Math.random() * array.length); // Generates a random index for the array
    var element = array[index]; // Retrieves the value associated with the index

    array.splice(index, 1) // Removes the selected element from the array
    await animation(element, boundsHeight)

    array.splice(0, 0, element) // Adds the element back to the array so it can be called again
}

/* Makes an element move slowly down the page until it hits the bounds */
export const drip = (element, boundsHeight) => {

    return new Promise((resolve) => {
        gsap.set(element, { opacity: 1 });
        var initials = {
            transformOrigin: "top center",
            y: boundsHeight,
            scaleY: (Math.random() + 1),
            duration: boundsHeight / (4 + (2 * Math.random())) // Divided by a random number between 4 and 6
        };
        if (Math.random() < 0.5) {
            gsap.set(element, { transformOrigin: "center", scaleX: -1 });
        }
        let tl = gsap.timeline({
            onComplete: resolve // resolve the promise when timeline is done
        });
        tl.to(element, initials)
            .to(element, { opacity: 0, duration: 0.3 })
            .set(element, { y: 0, opacity: 0 });
    });
};