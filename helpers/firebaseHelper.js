import firebase from "firebase"
// firebase/storage 삭제하지 마세요. 에러 납니다
import 'firebase/storage'
import { devConfig, prodConfig } from '../configs/firebase-config'

const config = process.env.NODE_ENV === 'production' ?
    prodConfig : devConfig; !firebase.apps.length ?
        firebase.initializeApp(config) : firebase.app();

const database = firebase.database();
const storage = firebase.storage();
const auth = firebase.auth();

export const getFireDB = () => {
    return database
}

export const getFireStorage = () => {
    return storage.ref()
}

export const getFireAuth = () => {
    return auth
}

export const getStravaTokenFirebase = (userToken) => {
    return new Promise((resolve, reject) => {
        let path = "/" + userToken + "/stravaToken"
        database.ref(path).once("value").then((snapshot) => {
            let stravaToken = snapshot.val()
            resolve(stravaToken)
        }).catch((error) => {
            console.error(error)
        })
    })
}

export const saveStravaTokenFirebase = (userToken, stravaToken) => {
    return new Promise((resolve, reject) => {
        let path = "/" + userToken + "/stravaToken"
        database.ref(path).set(stravaToken).then(() => {
            resolve("complete")
        }).catch((error) => {
            console.error(error)
        })
    })
}

export const getFileList = (userToken) => {
    return new Promise((resolve, reject) => {
        let path = "/" + userToken + "/files"
        database.ref(path).once("value").then((snapshot) => {
            let logData = snapshot.val()
            resolve(logData)
        }).catch((error) => {
            console.error(error)
        })
    })
}
