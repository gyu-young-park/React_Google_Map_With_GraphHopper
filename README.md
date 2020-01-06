# React google map으로 구현된 rounting 웹입니다.  
날씨 제공, strava 연동, Google Map , Search, 고도 정보, 경로 탐색, firebase 연동 등의 기능이 담겨져 있습니다.  
2020 01 06, 현재 회사에서 웹을 사용 중이라 2019의 일부 개발 내용들을 삭제했고, 다시 Repo를 만들었습니다.  
해당 부분들은 회사에서 허락한 부분으로 문제가 되지 않습니다.  

또한, 위의 코드들은 다른 코드들을 배끼지 않고 만들어서 어떠한 저작권 문제도 없습니다.

## How to build

-해당 code에서 사용하지 않은 package들이 있을 수 있습니다.  
이 부분들은 이전에 사용했던 코드에서 있던 부분이므로 삭제해주고 설치해주세요(ex - typescript)  

1. node_modules를 제외해서 넣었으니 npm install로 설치해주세요.->package.json의 정보를 통해 설치되니 만약 필요한 라이브러리가 있다면 package.json에 추가해주세요. ex) npm install jest --save(--save를 하면 자동으로 package.json에 dependency가 추가됩니다. 만약 개발 시에만 사용하는 dependency라면 --save-dev로 넣어주세요.)      
    ```bash
    $ npm install
    ```
1. redux devtools를 설치하지 않았다면 [여기](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)에서 설치합니다.
1. 서버 실행 -> next.js를 사용하므로  next cli를 통해 실행을 시켰습니다.
  npm run dev 명령어로 실행할 수 있습니다. -> localhost:3000 으로 접속하세요.  

   -테스트 시
   ```bash
   $ npm run dev
   ```

   -빌드 시
   ```bash
   $ npm run build
   ```

   -배포 시
   ```bash
   $ npm run start
   ```
   개발 할 때에는 테스트 모드이므로 ```$ npm run dev``` 만 써주세요.   

2. 만약 eslint 오류가 나는 경우 ex) cannot find module 'eslint-plugin-import' 이런 에러가 나온다면
   package-lock.json과 node_modules을 완전히 지운 뒤에, 다음 명령어로 node_modules을 다시 설치해주세요.
   ```bash
   $ npm install
   ```

   그럼에도 해결되지 않는다면 해당 module을 global로 설치해주세요.
   ex)
   ```bash
   $ npm install -g eslint-plugin-import
   ```

   global로 설치했는데도 module을 찾지 못한다면, cmd를 관리자 모드로 켜서 local로 설치해주세요.
   ex)
   ```bash
   $ npm install eslint-plugin-import --save-dev
   ```

3. 사용 기술
  -react를 사용하되 docs에서 공식 구현 방법으로 제시한 react-hooks 방식을 이용합니다.  
  -데이터 관리는 redux 모델을 이용합니다.  
  -next.js로 SSR를 지원합니다. code spliting을 잘하시면 하실 필요없습니다.   
  -css 프레임워크로는 antd를 사용했습니다. semantic ui, bootstrap react , Material 아무거나 편하고 이쁜거 사용해도 상관없습니다.  
  -eslint로 코딩 스타일을 강제합니다. 원하는 대로 옵션을 추가해도 되지만, 추가할 경우 모두에게 알려주셔야 합니다.  
  -redux를 이용하고 redux 데이터들이 비동기 제어가 필요할 때가 있다면 redux-saga를 사용합니다.  
  -테스팅 기술로는 jest와 enzyme를 사용합니다.  
  -google map으로 react-google-maps 라이브러리를 사용합니다. 딱히 특별한 기능은 없고 google map docs에 있는 기능들을 react스타일에 따라똑같이 사용하면 됩니다.  


## Architecture

웹 개발 프로젝트 입니다.  
초기 폴더의 구성은 다음과 같습니다.    

- .eslintrc                  : eslint를 설정해놓는 부분입니다.  
- /components                : 재사용 가능한 컴포넌트들을 모아놓는 폴더입니다.  
  - /AppLayer.js             : 화면의 기본 레이아웃 부분입니다. - side menu, header 부분 컴포넌트가 여기에 구현되어있습니다.  
- /pages                     : next.js에서 제공하는 폴더로 이름을 바꾸어서는 안됩니다. 여기서 페이지 라우팅을 하게되며 SSR 방식을 이용합니다.  
  - /_app.js_                : 모든 페이지가 공유하는 부분으로 head 역할을 합니다.  
  - /index.js                : 구현할 페이지입니다.  
- /reducers                  : 리덕스의 store를 구현해 놓는 폴더입니다.  
  - /index.js                : 각 store를 묶어서 하나로 합치는 파일입니다.  
  - /user.js                 : user에 대한 정보가 담긴 store입니다.  

## 문서 변경사항(2019 10/6)  
  - components 폴더에는 각 component별로 따로 폴더를 갖습니다.  
    ex) AppLayer 폴더에는 AppLayer을 export하는 index.js와 index.css, 테스팅에 사용되는 spec.js가 있습니다.  
  - spec.js는 jest와 enzyme를 사용합니다. it으로 선언된 부분은 integration test, unit test 이고 test로 사용된 부분은 snapshot테스트로 해주세요.  
  - public 폴더에는 assets을 담습니다. 마음대로 폴더를 구성해주시면 됩니다.  

## Config 

.env 파일을 추가하셔야 합니다.
```
REACT_APP_PROD_API_KEY=
REACT_APP_PROD_AUTH_DOMAIN=
REACT_APP_PROD_DATABASE_URL=
REACT_APP_PROD_PROJECT_ID=
REACT_APP_PROD_STORAGE_BUCKET=
REACT_APP_PROD_MESSAGING_SENDER_ID=
REACT_APP_PROD_ID=
REACT_APP_PROD_MEASUREMENT_ID=
REACT_APP_PROD_GOOGLE_MAP_API_KEY=
REACT_APP_PROD_OPEN_WEATHER_API_KEY=
REACT_APP_DEV_API_KEY=
REACT_APP_DEV_AUTH_DOMAIN=
REACT_APP_DEV_DATABASE_URL=
REACT_APP_DEV_PROJECT_ID=
REACT_APP_DEV_STORAGE_BUCKET=
REACT_APP_DEV_MESSAGING_SENDER_ID=
REACT_APP_DEV_ID=
REACT_APP_DEV_MEASUREMENT_ID=
REACT_APP_DEV_OPEN_WEATHER_API_KEY=
REACT_APP_DEV_GOOGLE_MAP_API_KEY=

```
root에 configs 폴더를 추가한 다음 파일들을 만들어주세요.  

-configs
firebase-config.js   
google-map-key.js   
strava-config.js   

firebase-config.js   
```
// 개발용 firebase config입니다.
export const devConfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_DEV_APP_ID,
  measurementId: process.env.REACT_APP_DEV_MEASUREMENT_ID
};

// 배표용 firebase config입니다.
export const prodConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PROD_APP_ID,
  measurementId: process.env.REACT_APP_PROD_MEASUREMENT_ID
};
```

google-map-key.js  
```
export const googleApiKey = process.env.REACT_APP_DEV_GOOGLE_MAP_API_KEY

```   

strava-config.js (id와 secret을 입력해주세요) 
```
export const stravaConfig = {
    "access-token": "",
    "client_id": "",
    "client_secret": "",
    "redirect_uri": "http://localhost:3000/",
    "scope": "activity:write"
};

```




