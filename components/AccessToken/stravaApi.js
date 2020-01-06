import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { setStravaAuthCode } from '../../reducers/User'
import * as ROUTES from '../../constants/routes';
import Router from 'next/router'
import { saveStravaTokenFirebase } from '../../helpers/firebaseHelper'

const StravaApi = () => {
  const userStorage = useSelector(state => (state.User))

  useEffect(() => {
    if (!userStorage.auth) {
      console.log("No authorization, redirecting to landing page")
      Router.push(ROUTES.LANDING)
    }
  })

  return userStorage.stravaAuthCode ? <UploadPageAuth /> : <UploadPageNonAuth />
}

const UploadPageNonAuth = () => {
  const userStorage = useSelector(state => (state.User))
  const dispatch = useDispatch()

  const getStravaAuthCode = () => {
    const qs = new URLSearchParams(window.location.search);
    return qs.get('code');
  }

  useEffect(() => {
    const stravaCode = getStravaAuthCode()
    if (stravaCode) {
      /*
      TODO: 토큰과 코드의 차이 구분하기
      코드는 맨 처음 1회 용도인가?
      그러면 code받아서 getStravaTokenWithCode를 실행하면 되는 것인가?
      */
      saveStravaTokenFirebase(userStorage.auth.uid, stravaCode)
      dispatch(setStravaAuthCode(stravaCode))
      Router.push(ROUTES.STRAVA_PAGE)
    }
  })

  return (
    <div>
      <p>경로를 업로드 하려면 인증이 필요합니다</p>
      <Button type="primary" href={ROUTES.STRAVA_AUTHORIZATION_PAGE}>
        인증 받기
      </Button>
      <style jsx="true">{style}</style>
    </div>
  )
}

const UploadPageAuth = () => {
  const userStorage = useSelector(state => (state.User))
  const [code, setCode] = useState(null);
  const [uploads, setUploadsInfo] = useState({
    fileName: null,
    access_token: null
  });
  const [inputList, setInputList] = useState([]);

  const [input, setInput] = useState({
    name: '',
    description: '',
    activity_type: ''
  });

  const [editIndex, setEditIndex] = useState(null);


  useEffect(() => {
    onAccessInfo()
  }, [uploads.access_token])


  const onAccessInfo = (e) => {
    //업로드를 위한 access_token 얻어오기
    //e.preventDefault();
    axios.post('https://www.strava.com/oauth/token', {
      client_id: '39824',
      client_secret: '7bf051192f5177265bf088ac4461293c053e84e1',
      code: userStorage.stravaAuthCode,
      grant_type: 'authorization_code'
    }).then(function (response) {
      setUploadsInfo({
        ...uploads,
        access_token: response.data.access_token
      })
    });
  }




  const onShareGpxInfo = (e) => {
    e.preventDefault();
    //다중업로드
    console.log(uploads.files.length);

    //파일갯수만큼 입력하지 않은 경우
    var confirmResult = true;

    if (uploads.files.length != inputList.length) {
      confirmResult = confirm('파일 개수만큼 정보를 입력 안 하실 건가요?');
    }

    if (confirmResult) {
      for (var i = 0; i < uploads.files.length; i++) {
        const fd = new FormData();
        //에러 처리를 위해 작성된 if문
        if (i >= inputList.length) {
          fd.append('name', 'trimm 업로드');
          fd.append('description', 'trimm 웹페이지에서 업로드한 gpx입니다');
          fd.append('activity_type', 'trimm 업로드한 activity type');
        } else {
          fd.append('name', inputList[i].name);
          fd.append('description', inputList[i].description);
          fd.append('activity_type', inputList[i].activity_type);
        }
        fd.append('data_type', 'gpx');
        fd.append('file', uploads.files[i]);
        axios.post('https://www.strava.com/api/v3/uploads', fd, {
          headers: {
            'Authorization': 'Bearer ' + uploads.access_token,
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(function (response) {
            console.log(response);
          });
      }
      alert("Strava에 업로드가 완료되었습니다");
    }
  }



  const onInputFile = (e) => {
    //gpx 파일 올리는 곳
    e.preventDefault();
    const fileArray = [];
    console.log(e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      fileArray.push(e.target.files[i]);
    }
    setUploadsInfo({
      ...uploads,
      files: fileArray
    })
  }


  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (editIndex == null) {
      if (uploads.files.length > inputList.length) {
        console.log(input);
        const nextInputList = inputList.concat(input);
        setInputList(nextInputList);

        setInput({
          name: '',
          description: '',
          activity_type: ''
        })
      } else {
        //에러메세지 출력
        alert("파일 개수 보다 많은 정보를 입력하셨습니다");
      }
    } else {
      inputList[editIndex].name = input.name;
      inputList[editIndex].description = input.description;
      inputList[editIndex].activity_type = input.activity_type;
      setEditIndex(null);

      setInput({
        name: '',
        description: '',
        activity_type: ''
      })
    }
  }

  const onUpdate = (index) => {
    //index값이 넘어온다
    console.log(index);

    setEditIndex(index);

    setInput({
      name: inputList[index].name,
      description: inputList[index].description,
      activity_type: inputList[index].activity_type
    })
  }

  if (uploads.files == null) {
    return (
      <form>
        <div align="left" style={{ width: '80vw', height: "90vh" }}>
          <div className="Share">
            <input type="file" name="files[]" onChange={onInputFile} multiple />
          </div>
        </div>
      </form>
    );
  }
  else {
    return (
      <form onSubmit={onSubmit}>
        <div align="left" style={{ width: '80vw', height: "90vh" }}>
          <h5>파일이 {uploads.files.length}개 입력되었습니다</h5>
          <br />

          <h5>NAME</h5>
          <input type="text" size="100" value={input.name} onChange={onChange} name="name" />

          <h5 style={{ marginTop: "10px" }}>DESCRIPTION</h5>
          <textarea cols="100" rows="3" value={input.description} onChange={onChange} name="description" />

          <h5 style={{ marginTop: "10px" }}>ACTIVITY TYPE</h5>
          <select name="activity_type" onChange={onChange}>
            <option value="run">달리기</option>
            <option value="ride">라이딩</option>
            <option value="swim">수영</option>
            <option value="hike">하이킹</option>
            <option value="walk">걷기</option>
            <option value="alpineski">알파인 스키</option>
            <option value="backcountryski">백컨트리 스키</option>
            <option value="nordicski">노르딕 스키</option>
            <option value="iceskate">스케이트</option>
            <option value="inlineskate">인라인 스케이트</option>
            <option value="kitesurf">카이트서핑</option>
            <option value="rollerski">카이트서핑</option>
            <option value="windsurf">윈드서핑</option>
            <option value="snowboard">스노우보드</option>
            <option value="snowshoe">스노우슈</option>
            <option value="E-Bike 라이딩">E-Bike 라이딩</option>
          </select>
          <br />
          <Button className="btnSubmit" style={{ marginBottom: "10px", marginRight: "10px" }} icon="team" onClick={onSubmit}>입력</Button>
          <Button className="btnShare" style={{ marginTop: "10px", marginRight: "10px" }} icon="upload" onClick={onShareGpxInfo}>Share</Button>

          <hr />

          <div>
            {inputList.map((value, index) => (
              <div key={index} style={{ padding: '8px', margin: '8px' }}>
                <div><b>{uploads.files[index].name}&nbsp;</b> <Button onClick={() => onUpdate(index)}>수정</Button></div>
                <div>&nbsp; Name: {value.name}</div>
                <div>&nbsp; Description: {value.description}</div>
              </div>
            ))}
          </div>
          <hr />
        </div>
      </form>
    );
  }
}

const style = `
#GetAuthButton {
  background-color: rgba(255, 255, 255, 0.0);
  border: 0;
  margin-left: 10;
  font-size: 20;
  color: #08c;
}
`
export default StravaApi;
