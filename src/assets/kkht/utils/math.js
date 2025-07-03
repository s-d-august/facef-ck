export const random = () => {
    return Math.random() > 0.5;
}

export const randomRange = (min, max, points) => {
    let random = min + ((max - min) * Math.random())
    if (points) random = random.toFixed(points)
    return random
}