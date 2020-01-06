export const setCategory = (logData) => {
    let categoryStatus = [false, false, false, false, false, false, false, false, false]
    let result = []
    if (typeof (logData) == "undefined" || logData == null) {
        return categoryStatus
    }
    for (let i = 1; i < logData.length; i++) {
        if (logData[i].type === "Resume") {
            continue
        }
        if (!categoryStatus[0]) {
            if (!isNaN(logData[i].speed) && logData[i].speed !== 0.0 && logData[i].speed != null) {
                categoryStatus[0] = true
            }
        }
        if (!categoryStatus[1]) {
            if (!isNaN(logData[i].altitude) && logData[i].altitude !== 0.0 && logData[i].altitude != null) {
                categoryStatus[1] = true
            }
        }
        if (!categoryStatus[2]) {
            if (!isNaN(logData[i].calorie) && logData[i].calorie !== 0.0 && logData[i].calorie != null) {
                categoryStatus[2] = true
            }
        }
        if (!categoryStatus[3]) {
            if (!isNaN(logData[i].cadence) && logData[i].cadence !== 0.0 && logData[i].cadence != null) {
                categoryStatus[3] = true
            }
        }
        if (!categoryStatus[4]) {
            if (!isNaN(logData[i].power) && logData[i].power !== 0.0 && logData[i].power != null) {
                categoryStatus[4] = true
            }
        }
        if (!categoryStatus[5]) {
            if (!isNaN(logData[i].heartrate) && logData[i].heartrate !== 0.0 && logData[i].heartrate != null) {
                categoryStatus[5] = true
            }
        }
        if (!categoryStatus[6]) {
            if (!isNaN(logData[i].torque) && logData[i].torque !== 0.0 && logData[i].torque != null) {
                categoryStatus[6] = true
            }
        }
        if (!categoryStatus[7]) {
            if (!isNaN(logData[i].balance) && logData[i].balance !== 0.0 && logData[i].balance != null) {
                categoryStatus[7] = true
            }
        }
        if (!categoryStatus[8]) {
            if (logData[i].type === "Lap") {
                categoryStatus[8] = true
            }
        }
    }

    if (categoryStatus[0]) {
        result.push("speed")
    }
    if (categoryStatus[1]) {
        result.push("altitude")
    }
    if (categoryStatus[2]) {
        result.push("calorie")
    }
    if (categoryStatus[3]) {
        result.push("cadence")
    }
    if (categoryStatus[4]) {
        result.push("power")
    }
    if (categoryStatus[5]) {
        result.push("heartrate")
    }
    if (categoryStatus[6]) {
        result.push("torque")
    }
    if (categoryStatus[7]) {
        result.push("balance")
    }
    if (categoryStatus[8]) {
        result.push("lap")
    }

    return result
}