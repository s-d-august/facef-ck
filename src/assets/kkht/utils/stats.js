export const valChange = (ids, upDown, max, setter, sensitivity, value, log) => {

    if (log) console.log(ids, upDown, max, setter, sensitivity, value)

    if (!Array.isArray(ids)) {
        ids = [ids];
    }

    ids.forEach((key) => {
        setter((prev) => {
            var newVal
            if (value) {
                newVal = upDown === "up" ? prev[key] + value : prev[key] - value;
            } else newVal = upDown === "up" ? prev[key] + sensitivity[key] : prev[key] - sensitivity[key];

            if (upDown === "up") {
                if (newVal - 2 > max[key]) {
                    return { ...prev, [key]: max[key] };
                }

                return { ...prev, [key]: newVal };
            } else if (upDown === "down") {

                if (newVal < 0) {
                    return { ...prev, [key]: 0 };
                }
                if (log) console.log({ ...prev, [key]: newVal })
                return { ...prev, [key]: newVal };
            }
            return prev;
        });
    });
}