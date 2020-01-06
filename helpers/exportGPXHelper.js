export const makeGPXBlob = (logData) => {
    let stringBuffer = []

    stringBuffer.push(
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
        "<gpx creator=\"StravaGPX\" version=\"1.1\" xmlns=\"http://www.topografix.com/GPX/1/1\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n" +
        "  <metadata>\n" +
        // "    <time>" + convertRatioTimeToGpxTime(logData[0].startTime) + "</time>\n" +
        "    <time>" + convertRatioTimeToGpxTime(logData[0].fileName * 1000 + 978307200000) + "</time>\n" +
        "  </metadata>\n" +
        "  <trk>\n" +
        "    <name>" + logData[0].fileName + "</name>\n" +
        "    <trkseg>\n")

    for (let i = 1; i < logData.length; i++) {
        if (logData[i].type !== "Log") {
            continue
        }
        stringBuffer.push(
            `<trkpt lat="${logData[i].latitude.toFixed(7)}" lon="${logData[i].longitude.toFixed(7)}">
                <ele>${logData[i].altitude.toFixed(1)}</ele>
                <time>${convertRatioTimeToGpxTime(logData[0].fileName * 1000 + 978307200000 + i * 1000)}</time>
            </trkpt>
            `
        )
    }

    stringBuffer.push("    </trkseg>\n  </trk>\n</gpx>")

    let blob = new Blob(stringBuffer, { type: "text/plain" })

    return blob
}

export const saveFile = (fileName, blob) => {
    let gpxFileName = fileName + ".gpx"
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, gpxFileName)
    } else {
        let elem = window.document.createElement("a")
        elem.href = window.URL.createObjectURL(blob)
        elem.download = gpxFileName
        document.body.appendChild(elem)
        elem.click()
        document.body.removeChild(elem)
    }
}

const convertRatioTimeToGpxTime = (time) => {
    let gpxTime = new Date(time)

    return format(gpxTime)
}

const format = (gpxTime) => {
    let year = gpxTime.getFullYear()
    let month = gpxTime.getMonth() + 1 + ""
    let day = gpxTime.getDate() + ""
    let hours = gpxTime.getHours() + ""
    let minutes = gpxTime.getMinutes() + ""
    let seconds = gpxTime.getSeconds() + ""

    let result = ""

    result += year + "-"
    if (month.length < 2) {
        month = "0" + month
    }
    result += month + "-"

    if (day.length < 2) {
        day = "0" + day
    }
    result += day + "T"

    if (hours.length < 2) {
        hours = "0" + hours
    }
    result += hours + ":"

    if (minutes.length < 2) {
        minutes = "0" + minutes
    }
    result += minutes + ":"

    if (seconds.length < 2) {
        seconds = "0" + seconds
    }
    result += seconds + "Z"

    return result
}