export const valChange = (ids, upDown, max, setter, sensitivity) => {

    if (!Array.isArray(ids)) {
        ids = [ids];
    }
    ids.forEach((key) => {
        setter((prev) => {
            const newVal = upDown === "up" ? prev[key] + sensitivity[key] : prev[key] - 1;
            if (upDown === "up") {
                if (newVal - 5 > max[key]) {
                    return { ...prev, [key]: max[key] };
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