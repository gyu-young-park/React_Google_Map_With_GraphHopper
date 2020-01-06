import { setCategory } from "./setCategoryHelper"
import { makeSummaryData } from "./logSummaryHelper"

export const makeHistoryStateHelper = (props) => {
    let state = localStorage.getItem("state")
    // localStogra에서 state 가 null 일 경우 null return
    if (!state) return null

    let fileName = localStorage.getItem("fileName") // localStorage 에서 fileName 이 null 일경우 다시 activity page 로 돌아감
    if (fileName == null) {
        props.history.push("activity")
    }

    let sttList = JSON.parse(state).sttList.sttList
    let logList = JSON.parse(state).logList.logList
    let sttData = null
    for (let stt of sttList) {
        if (stt.fileName === fileName) {
            sttData = stt
            break
        }
    }
    let logData = null
    for (let log of logList) { //파일이름 확인해서 로그데이터 확정
        if (log[0].fileName === fileName) {
            logData = log
            break
        }
    }

    let categories = setCategory(logData)

    let summaryData = makeSummaryData(sttData, logData)

    let result = {
        fileName: fileName,
        logData: logData,
        categories: categories,
        sttData: sttData,
        summaryData: summaryData
    }

    return result
}
