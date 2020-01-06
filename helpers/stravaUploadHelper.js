//https://github.com/brianwthomas/strava_js publish 를 기다려라 !
import { stravaConfig } from "../configs/strava-config"
import { getFireDB, getStravaTokenFirebase, saveStravaTokenFirebase } from "./firebaseHelper"
import axios from "axios"


export const uploadStrava = (fileName, gpxBlob, userToken) => {
    let fireDB = getFireDB()
    getStravaTokenFirebase(fireDB, userToken).then((stravaToken) => {
        if (stravaToken === null) {
            authStrava()
        } else {
            if (stravaToken.expires_at * 1000 < new Date().getTime()) { // strava Token is expired
                getStravaTokenWithRefreshToken(stravaToken.refresh_token).then((stravaToken) => {
                    uploadGPXToStrava(fileName, gpxBlob, stravaToken.access_token) // strava Token is not expired 
                })
            } else {
                uploadGPXToStrava(fileName, gpxBlob, stravaToken.access_token) // strava Token is not expired 
            }
        }
    }, (error) => {
        console.error(error)
    })
}

export const uploadStravaWithCode = (fileName, gpxBlob, stravaCode, userToken) => {
    let fireDB = getFireDB()
    // get Token with code
    getStravaTokenWithCode(stravaCode).then((result) => {
        let data = result.data
        let stravaToken = {
            access_token: data.access_token,
            expires_at: data.expires_at,
            expires_in: data.expires_in,
            refresh_token: data.refresh_token
        }
        // save token in firebase
        // upload file with token
        Promise.all([
            saveStravaTokenFirebase(fireDB, userToken, stravaToken), uploadGPXToStrava(fileName, gpxBlob, data.access_token)
        ]).then((result) => {
            console.log(result)
        })
    }).catch((error) => {
        console.error(error)
    })
}

const authStrava = () => {
    let authURL = "https://www.strava.com/oauth/authorize?client_id=" + stravaConfig.client_id + "&redirect_uri=" + stravaConfig.redirect_uri + "&scope=" + stravaConfig.scope + "&response_type=code&approval_propt=auto"
    window.location.href = authURL
}

const uploadGPXToStrava = (fileName, gpxBlob, access_token) => {
    let name = new Date(fileName * 1000 + 978307200000).toLocaleString()
    let data_type = "gpx"
    let description = "From TrimmOne"
    gpxBlob.lastModifiedDate = new Date()

    let form = new FormData()
    form.append("name", name)
    form.append("data_type", data_type)
    form.append("file", gpxBlob)
    form.append("external_id", name)
    form.append("description", description)

    let uploadURL = "https://www.strava.com/api/v3/uploads"
    let authorization = "Bearer " + access_token

    return new Promise((resolve, reject) => {
        axios.post(uploadURL, form, { headers: { "Authorization": authorization } }).then((response) => {
            alert("완료")
            resolve(response)
        }).catch((error) => {
            console.error(error)
        })
    })
}

const getStravaTokenWithCode = (stravaCode) => {
    let tokenURL = "https://www.strava.com/oauth/token?client_id=" + stravaConfig.client_id + "&client_secret=" + stravaConfig.client_secret + "&code=" + stravaCode + "&grant_type=authorization_code"
    return new Promise((resolve, reject) => {
        axios.post(tokenURL, {}).then((response) => {
            resolve(response)
        }).catch((error) => {
            console.error(error)
        })
    })
}

const getStravaTokenWithRefreshToken = (userToken, refreshToken) => {
    let fireDB = getFireDB()
    let tokenURL = "https://www.strava.com/oauth/token?client_id=" + stravaConfig.client_id + "&client_secret=" + stravaConfig.client_secret + "&code=" + refreshToken + "&grant_type=refresh_token"
    return new Promise((resolve, reject) => {
        axios.post(tokenURL, {}).then((response) => {
            saveStravaTokenFirebase(fireDB, userToken, response).then(() => {
                resolve(response)
            })
        }).catch((error) => {
            console.error(error)
        })
    })
}

export const getStravaCodeFromURL = () => {
    const qs = new URLSearchParams(window.location.search);
    return qs.get('code');
}
