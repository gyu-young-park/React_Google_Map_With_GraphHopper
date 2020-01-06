import React from 'react';
import HomeCarousel from '../components/HomeCarousel';
import HomeToast from '../components/HomeToast';
import HomeTextFragment from '../components/HomeTextFragment';
import HomeImageTextFragment from '../components/HomeImageTextFragment';
import WeatherWidget from '../components/Weather';
import './css-folder/home.css';

const Home = () => {

  return(
    <div className="container-fluid" style={{ paddingLeft:"20px" , backgroundColor:"#f5f5fa"}}>
      <div className="row" >
        <div className="col-md-3">
          <div className="left-component">
            <HomeTextFragment
              title={"Board"}
              content={"NOW TRIMM 20% DISCOUNT!"}
              buttonText={"BUY NOW"}
              btnClass={"btn-danger"} />
            <HomeToast
              title={"Activity Page Updated!!"}
              content={"Now you can enjoy watching your activity page -Trimm"}
              day={"2019-12-04"}/>
            <HomeToast
              title={"Plan Page Updated!!"}
              content={"Now you can enjoy Planning your activity route -Trimm"}
              day={"2019-12-04"}/>
            <HomeToast
              title={"Strava"}
              content={"Trimm can be linked to Strava -Trimm"}
              day={"2019-12-04"}/>
            <HomeToast
              title={"It's your first login!!"}
              content={"Hello!! How do you do? -Trimm"}
              day={"2019-12-04"}/>
          </div>
          <div className="left-component">
            <HomeImageTextFragment
                title={"Facebook"}
                content={"Enjoy Trimm"}
                buttonText={"facebook"}
                src={"./images/facebook.png"}
                btnClass={"btn-primary"}/>
          </div>
        </div>
        <div className="col-xs-12 col-md-4">
          <div className="center-component">
            <HomeCarousel/>
            <HomeTextFragment
                title={"TRIMM의 환상적인 Activity"}
                content={"Activity 확인하러 가기"}
                buttonText={"ACTIVITY"}
                btnClass={"btn-outline-primary"}/>
            <HomeTextFragment
                title={"이제 경로 계획을 TRIMM에서"}
                content={"경로 계획하러 가기"}
                buttonText={"PLAN"}
                btnClass={"btn-outline-primary"}/>
          </div>
          <div className="center-component">
            <HomeImageTextFragment
                title={"instagram"}
                content={"더 많은 이들과 Trimm을 즐겨보세요"}
                buttonText={"Instagram"}
                src={"./images/instagram.png"}
                btnClass={"btn-info"}/>
          </div>
        </div>
        <div className="col-md-4">
          <div className="right-component">
            <WeatherWidget/>
          </div>
          <div className="right-component">
            <HomeImageTextFragment
                title={"TRIMM"}
                content={"trimm앱 다운로드"}
                buttonText={"Download"}
                src={"./images/smartphone.png"}
                btnClass={"btn-primary"}/>
            </div>
        </div>
      </div>
    </div>
  );
};


export default Home;
