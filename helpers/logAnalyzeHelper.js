const convertBytesToType = (bytes, type) => {
  let buf = new ArrayBuffer(Math.max(4, bytes.length))
  let view = new DataView(buf)
  if (bytes.length === 2) {
    bytes.forEach((b, i) => {
      view.setUint8(i + 2, b)
    })
  } else {
    bytes.forEach((b, i) => {
      view.setUint8(i, b)
    })
  }
  if (type === "int") {
    return view.getUint32(0)
  } else if (type === "float") {
    return view.getFloat32(0)
  } else if (type === "double") {
    return view.getFloat64(0)
  }
}

const convertBytesToMerc = (bytes) => {
  let buf = new ArrayBuffer(4)
  let view = new DataView(buf)
  bytes.forEach((b, i) => {
    view.setUint8(i, b)
  })
  return view.getUint32(0)
}

const convertMercToLoc = (mercx, mercy) => {
  let px = mercx
  let py = mercy
  let loc = new Array(2)
  const temp = 2147483648
  loc[0] = px / temp * 180.0 - 180.0
  loc[1] = Math.atan(Math.sinh(Math.PI * (1.0 - py / temp))) * 180.0 / Math.PI
  return loc
}

const divideSTT = (bytes) => {
  let temp = bytes.slice(0, 4)
  temp.reverse()
  let distance = convertBytesToType(temp, "float")
  distance = parseFloat(distance.toFixed(2))

  temp = bytes.slice(4, 8)
  temp.reverse()
  let ascent = convertBytesToType(temp, "float")
  ascent = parseFloat(ascent.toFixed(2))

  temp = bytes.slice(8, 12)
  temp.reverse()
  let descent = convertBytesToType(temp, "float")
  descent = parseFloat(descent.toFixed(2))

  temp = bytes.slice(12, 16)
  temp.reverse()
  let endTime = convertBytesToType(temp, "int")

  temp = bytes.slice(16, 24)
  temp.reverse()
  let longitude = convertBytesToType(temp, "double")

  temp = bytes.slice(24, 32)
  temp.reverse()
  let latitude = convertBytesToType(temp, "double")

  temp = bytes.slice(32, 36)
  temp.reverse()
  let ridingTime = Math.round(convertBytesToType(temp, "float"))

  let result = {
    "distance": distance,
    "ascentAltitude": ascent,
    "descentAltitude": descent,
    "endTime": endTime,
    "longitude": longitude,
    "latitude": latitude,
    "ridingTime": ridingTime
  }
  return result
}

const divideLOG = (bytes, fileName) => {
  let result = []
  let temp = bytes.slice(0, 4)
  temp.reverse()
  let headerVersion = convertBytesToType(temp, "int")

  temp = bytes.slice(4, 12)
  temp.reverse()
  let headerStartTime = convertBytesToType(temp, "int") * 1000 + 978307200000
  let logObject = { "version": headerVersion, "startTime": headerStartTime, "fileName": fileName }
  result.push(logObject)

  let index = 12
  let logData = []
  while (index < bytes.length) {
    logObject = { "distance": 0.0, "longitude": 0.0, "latitude": 0.0, "speed": 0.0, "time": 0.0, "altitude": 0.0, "type": "Log", "calorie": 0.0, "cadence": NaN, "heartrate": NaN, "power": NaN, "torque": 0.0, "balance": 0.0 }

    temp = bytes.slice(index, index + 4)
    temp.reverse()
    let time = convertBytesToType(temp, "float")
    logObject.time = time
    index += 4

    let status = 0
    if (time === 0) {
      temp = bytes.slice(index, index + 4)
      temp.reverse()
      let eventType = convertBytesToType(temp, "int")
      if (eventType !== 1 && eventType !== 2 && eventType !== 3) {
        status = 0
      }
      else {
        status = 1
      }
    }

    if (time < 0 || status === 1) {
      temp = bytes.slice(index, index + 4)
      temp.reverse()
      let eventType = convertBytesToType(temp, "int")
      if (eventType === 3) {
        logObject.type = "Lap"
        logData.push(logObject)
      }
      index += 4
    } else {
      temp = bytes.slice(index, index + 4)
      index += 4
      temp.reverse()
      let flag = convertBytesToType(temp.slice(0, 2), "int")
      let speed = convertBytesToType(temp.slice(2, 4), "int") / 256 * 3.6
      speed = parseFloat(speed.toFixed(2))
      logObject.speed = speed
      let bitArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      for (let i = 0; i < 16; i++) {
        bitArray[15 - i] = flag % 2
        flag = parseInt(flag / 2)
        if (flag === 0) {
          break
        }
      }

      if (bitArray[1] === 1) {
        temp = bytes.slice(index, index + 4)
        temp.reverse()
        index += 4
        let distance = convertBytesToType(temp, "float")
        distance = parseFloat(distance.toFixed(2))
        logObject.distance = distance
      } if (bitArray[2] === 1) {
        temp = bytes.slice(index, index + 4)
        temp.reverse()
        let altitude = convertBytesToType(temp, "float")
        altitude = parseFloat(altitude.toFixed(2))
        index += 4
        logObject.altitude = altitude
      } if (bitArray[3] === 1) {
        temp = bytes.slice(index, index + 4)
        temp.reverse()
        let cadence = convertBytesToType(temp, "float") * 60
        cadence = parseFloat(cadence.toFixed(2))
        index += 4
        logObject.cadence = cadence
      } if (bitArray[4] === 1) {
        temp = bytes.slice(index, index + 4)
        temp.reverse()
        let heartRate = convertBytesToType(temp, "float")
        heartRate = parseFloat(heartRate.toFixed(2))
        index += 4
        logObject.heartrate = heartRate
      } if (bitArray[5] === 1) {
        temp = bytes.slice(index, index + 4)
        temp.reverse()
        let power = convertBytesToType(temp, "float")
        power = parseFloat(power.toFixed(2))
        index += 4
        logObject.power = power
      } if (bitArray[6] === 1) {
        temp = bytes.slice(index, index + 4)
        temp.reverse()
        let calorie = convertBytesToType(temp, "float")
        calorie = parseFloat(calorie.toFixed(2))
        index += 4
        logObject.calorie = calorie
      } if (bitArray[0] === 1) {
        temp = bytes.slice(index, index + 8)
        let x = temp.slice(0, 4)
        x.reverse()
        let y = temp.slice(4, 8)
        y.reverse()
        let mercX = convertBytesToMerc(x) // mercpoint convert need
        let mercY = convertBytesToMerc(y)
        let location = convertMercToLoc(mercX, mercY)
        logObject.longitude = location[0]
        logObject.latitude = location[1]
        index += 8
      }
      if (logObject.distance === 0) {
        continue
      }
      logData.push(logObject)
    }
  }

  result = result.concat(logData)

  return result
}

const getBytesFromStorage = (storage, sttFilePath) => {
  return new Promise((resolve, reject) => {
    storage.child(sttFilePath).getDownloadURL().then((url) => {
      let xhr = new XMLHttpRequest()
      xhr.responseType = "blob"
      xhr.onload = (event) => {
        let blob = xhr.response
        let reader = new FileReader()
        reader.readAsArrayBuffer(blob)
        reader.onload = () => {
          let arrayBuffer = reader.result
          let bytes = new Uint8Array(arrayBuffer)
          resolve(bytes)
        }
      }
      xhr.open("GET", url)
      xhr.send()
    })
  })
}

const convertSttBytesToFile = (bytes, fileName) => {
  const stt = divideSTT(bytes)
  stt.fileName = fileName
  stt.endTimeInDate = new Date(fileName * 1000 + 978307200000)
  return stt
}

const convertLogBytesToFile = (bytes, fileName) => {
  return divideLOG(bytes, fileName)
}

export const analyzeFile = async (storage, firebaseToken, fileName) => {
  const result = []
  const sttFilePath = firebaseToken + "/stt" + fileName + ".stt"
  await getBytesFromStorage(storage, sttFilePath).then((sttBytes) => {
    const sttFile = convertSttBytesToFile(sttBytes, fileName)
    result.push(sttFile)
  })

  const logFilePath = firebaseToken + "/log" + fileName + ".log"
  await getBytesFromStorage(storage, logFilePath).then((logBytes) => {
    const logFile = convertLogBytesToFile(logBytes, fileName)
    result.push(logFile)
  })
  return result
}

export const analyzeSttFile = async (storage, firebaseToken, fileName) => {
  let result = null
  const sttFilePath = firebaseToken + "/stt" + fileName + ".stt"
  await getBytesFromStorage(storage, sttFilePath).then((sttBytes) => {
    result = convertSttBytesToFile(sttBytes, fileName)
  })

  return result
}

export const analyzeLogFile = async (storage, firebaseToken, fileName) => {
  let result = null
  const logFilePath = firebaseToken + "/log" + fileName + ".log"
  await getBytesFromStorage(storage, logFilePath).then((logBytes) => {
    result = convertLogBytesToFile(logBytes, fileName)
  })

  return result
}

