export function whichWindDirecton(degree) {
    if (degree < 22.25 && degree > 337.5) {
        return "North"
    } else if (degree > 22.25 && degree < 67.5) {
        return "Northeast"
    } else if (degree > 67.5 && degree < 112.5) {
        return "East"
    } else if (degree > 112.5 && degree < 157.5) {
        return "Southeast"
    } else if (degree > 157.5 && degree < 202.5) {
        return "South"
    } else if (degree > 202.5 && degree < 247.5) {
        return "Southwest"
    } else if (degree > 247.5 && degree < 292.5) {
        return "Northwest"
    } else if (degree > 292.5 && degree < 337.5) {
        return "Northeast"
    }
};