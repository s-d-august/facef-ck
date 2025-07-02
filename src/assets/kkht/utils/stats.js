export const valChange = (ids, upDown, max, setter, sensitivity) => {

    console.log(sensitivity)
    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    ids.forEach((key) => {
        setter((prev) => {
            const newVal = upDown === "up" ? prev[key] + sensitivity[key] : prev[key] - sensitivity[key];
            if (upDown === "up") {
                if (newVal > max[key]) {
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