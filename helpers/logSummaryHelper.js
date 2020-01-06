const summaryLog = (log) => {
    let result = {
        "avgSpeed": 0, "maxSpeed": 0,
        "avgPower": 0, "maxPower": 0,
        "avgCadence": 0, "maxCadence": 0,
        "avgHeartrate": 0, "maxHeartrate": 0,
        "maxCalorie": 0,
        "avgTorque": 0, "maxTorque": 0,
        "avgBalance": 0, "maxBalance": 0
    }

    let countSpeed = 0
    let sumSpeed = 0
    let maxSpeed = 0

    let countPower = 0
    let sumPower = 0
    let maxPower = 0

    let countCadence = 0
    let sumCadence = 0
    let maxCadence = 0

    let countHeartrate = 0
    let sumHeartrate = 0
    let maxHeartrate = 0

    let countTorque = 0
    let sumTorque = 0
    let maxTorque = 0

    let countBalance = 0
    let sumBalance = 0
    let maxBalance = 0

    let maxCalorie = 0
    for (let i = 1; i < log.length; i++) {
        if (log[i].type !== "Log") {
            continue
        }

        if (log[i].speed !== null && log[i].speed !== 0 && !isNaN(log[i].speed)) {
            countSpeed += 1
            sumSpeed += log[i].speed
            if (maxSpeed < log[i].speed) {
                maxSpeed = log[i].speed
            }
        }

        if (log[i].power !== null && log[i].power !== 0 && !isNaN(log[i].power)) {
            countPower += 1
            sumPower += log[i].power
            if (maxPower < log[i].power) {
                maxPower = log[i].power
            }
        }

        if (log[i].cadence !== null && log[i].cadence !== 0 && !isNaN(log[i].cadence)) {
            countCadence += 1
            sumCadence += log[i].cadence
            if (maxCadence < log[i].cadence) {
                maxCadence = log[i].cadence
            }
        }

        if (log[i].heartrate !== null && log[i].heartrate !== 0 && !isNaN(log[i].heartrate)) {
            countHeartrate += 1
            sumHeartrate += log[i].heartrate
            if (maxHeartrate < log[i].heartrate) {
                maxHeartrate = log[i].heartrate
            }
        }

        if (log[i].calorie !== null && log[i].calorie !== 0 && !isNaN(log[i].calorie)) {
            if (maxCalorie < log[i].calorie) {
                maxCalorie = log[i].calorie
            }
        }

        if (log[i].toruqe !== null && log[i].toruqe !== 0 && !isNaN(log[i].toruqe)) {
            countTorque += 1
            sumTorque += log[i].toruqe
            if (maxTorque < log[i].toruqe) {
                maxTorque = log[i].toruqe
            }
        }

        if (log[i].balance !== null && log[i].balance !== 0 && !isNaN(log[i].balance)) {
            countBalance += 1
            sumBalance += log[i].balance
            if (maxBalance < log[i].balance) {
                maxBalance = log[i].balance
            }
        }
    }

    result.avgSpeed = sumSpeed / countSpeed
    result.maxSpeed = maxSpeed

    result.avgPower = sumPower / countPower
    result.maxPower = maxPower

    result.avgCadence = sumCadence / countCadence
    result.maxCadence = maxCadence

    result.avgHeartrate = sumHeartrate / countHeartrate
    result.maxHeartrate = maxHeartrate

    result.maxCalorie = maxCalorie

    result.avgTorque = sumTorque / countTorque
    result.maxTorque = maxTorque

    result.avgBalance = sumBalance / countBalance
    result.maxBalance = maxBalance

    return result
}

export const makeSummaryData = (sttData, log) => {
    let summaryLogResult = summaryLog(log)
    let result = {
        ...summaryLogResult,
        distance: sttData.distance,
        ascentAltitude: sttData.ascentAltitude,
        descentAltitude: sttData.descentAltitude,
        ridingTime: sttData.ridingTime,
        endTime: sttData.endTime
    }
    return result
}