import React, {useState,useEffect,useCallback} from 'react';
import {GoogleMap, withScriptjs ,withGoogleMap , Marker, InfoWindow, Polyline} from 'react-google-maps';
import * as parksData from '../../public/data/skateboard-parks.json';
import mapStyles from "../../public/data/mapStyles.js";
import {Button} from 'antd';
import PropTypes from 'prop-types';
import {useDispatch , useSelector} from 'react-redux';
import {navigationPageSetGoogleMapRoutingDisplayTrue,navigationPageSetGoogleMapRoutingDisplayFalse,
  navigationPageFlushSelectedInstruction,
  navigationPageFlushJsonResponse, NAVIGATION_PAGE_FILL_JSON_RESPONSE,
   NAVIGATION_PAGE_FILL_SELECTED_INSTRUCTION, NAVIGATION_PAGE_SET_MARKER_STATE } from '../../reducers/googleMap';


const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");
require('graphhopper-js-api-client');

import axios from 'axios';

//라우팅 reponse를 data에 넣어서 reducer에 전달할 액션 객체
var navigationPageFillJsonResponse = {
  type: NAVIGATION_PAGE_FILL_JSON_RESPONSE,
  data: {
    jsonResponse: {}
  }
};

/*
* 2019-10-09 niklas jang
* graphhopper API를 사용하기 위해 아래의 링크에서 추천하는 방법을 적용
* <https://github.com/graphhopper/directions-api-js-client>
*/

// If you only need e.g. Routing, you can only require the needed parts
//var GraphHopperRouting = require('graphhopper-js-api-client/src/GraphHopperRouting');
//var GHInput = require('graphhopper-js-api-client/src/GHInput');

const GoogleMaps = ({changeMapTheme,isMakePolyLineToMap}) => {
  const [selectedPark, setSelectedPark] = useState(null);
  const [isMarkerExists,setIsMarkerExists] = useState(false);
  const [markerArray,setMarkerArray] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [center, setCenter] = useState({ lat: 45.4211, lng: -75.6903 });
  const [polylinePath, setPolylinePath] = useState([]);
  const dispatch = useDispatch();
  const {centerData} = useSelector(state => state.googleMap);
  const refs = {};

  useEffect(()=>{
    if(centerData){
      console.log(centerData)
      setCenter(new google.maps.LatLng(centerData[1],centerData[0]));
    }
  },[centerData])

  useEffect(()=>{
    if(markerArray.length <2){
      dispatch(navigationPageFlushSelectedInstruction);
    }else{
      var navigationPageSetMarkerState = {
        type: NAVIGATION_PAGE_SET_MARKER_STATE,
        data: markerArray
      };
      dispatch(navigationPageSetMarkerState);
    }

  },[markerArray])



  //검색 시 첫 번째로 실행이 된다.
  const onSearchBoxMounted = (ref) => {
    refs.searchBox = ref;
  }

  //검색어가 입력되어 엔터키를 받으면 두번째로 실행
  const onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    });
    const nextMarkers = places.map(place => ({
      position: place.geometry.location,
    }));
    const nextCenter = nextMarkers[0].position
    setCenter(nextCenter);
  }
  //검색사용시 렌더링된다.
  const onMapMounted = (ref) => {
    refs.map = ref;
  }
  //화면이 움직일 때마다 사용됨 -> 가장 마지막에 사용됨
  const onBoundsChanged = () => {
    if(refs){
      //setBounds(refs.map.getBounds());
      //setCenter(refs.map.getCenter());
    }
  }

  //graph hopper -> axios 로 비동기 호출 promise-then 문법으로 비동기 제어
  const makeDirectionFunc = () => {

    /*
    * 2019-10-09 niklas jang
    */
    var defaultKey = "7a201926-118f-46d5-b0ec-5ab1b5094a0f";
    var profile = "car";
    var host;
    var ghRouting = new GraphHopper.Routing({key: defaultKey, host: host, vehicle: profile, elevation: false, points_encoded:false});

    if(isMarkerExists && markerArray.length >= 2){ //두 개 이상의 마커가 존재하는 경우
      for(let i = 0; i < markerArray.length; i++){
        // console.log(markerArray[i].lat,markerArray[i].lng);
        ghRouting.addPoint(new GHInput((Number)(markerArray[i].lat), (Number)(markerArray[i].lng)));
      }
      ghRouting.doRequest()
      .then(function(json){
        console.log(json);
        navigationPageFillJsonResponse = {
          type: NAVIGATION_PAGE_FILL_JSON_RESPONSE,
          data: {
            jsonResponse: json,
          }
        };
        dispatch(navigationPageFillJsonResponse);
        var path = []; //클릭한 routing response의 {경도,위도}가 들어갈 배열
        var numberOfPoints = json.paths[0].points.coordinates.length; //O(N^2)을 막기 위함
        for(let i=0; i<numberOfPoints; i++){
          path.push(
            {lat:Number(json.paths[0].points.coordinates[i]["1"]), lng: Number(json.paths[0].points.coordinates[i]["0"])}
            );
        }
        // console.log(path);
        setPolylinePath(path);
      })
      .catch(function(err){
        console.error('GraphHopper Routing API Error : '+err.message);
      });
    }else{
      dispatch(navigationPageFlushJsonResponse);
      dispatch(navigationPageSetGoogleMapRoutingDisplayFalse);
    }
  }

  useEffect(()=>{
    if(markerArray.length <2){
      dispatch(navigationPageFlushJsonResponse);
    }else{
      makeDirectionFunc();
    }
  },[markerArray.length])

  useEffect(()=>{
    var navigationPageSetMarkerState = {
      type: NAVIGATION_PAGE_SET_MARKER_STATE,
      data: markerArray
    };
    dispatch(navigationPageSetMarkerState);
  },[markerArray])

  // useEffect(()=>{

  //   alert("123"+selectedInstruction[0]);
  // },[selectedInstruction])

  const onMapRightClick = (e) => {
    const geolocation = e.latLng;
    //console.log(geolocation.lat(), geolocation.lng());
    setMarkerArray([...markerArray,{lat: Number(geolocation.lat()), lng: Number(geolocation.lng())}])
    setIsMarkerExists(true);
    // console.log(boundValue)
  }
  //주의 default로 시작하는 props는 값을 바꾸어도 리렌더링이 안된다. options , center같은 속성은 바뀐다.
  /* 2019/11/19 chart기능의 마커를 추가하도록 하자
  *
  */
  return (
    <div>
      <GoogleMap
        ref={onMapMounted}
        onBoundsChanged={onBoundsChanged}
        center={center}
        defaultZoom={15}
        /* 2019-10-09 niklas jang
        * TODO 사용자의 locale 정보 받아서 default center 바꾸기
        */
        options={changeMapTheme ? {styles : mapStyles} : {styles : null}}
        onRightClick={onMapRightClick}
        >
        {isMakePolyLineToMap && <Polyline path={polylinePath}
        geodesic={true}
        options={{
            strokeColor: "#ff2527",
            strokeOpacity: 0.75,
            strokeWeight: 2,
        }}
        />}
        {/* {selectedInstruction.map((value,index) =>{
         return (
          <Marker
            key={index}
            position={{
              lat: value[0],
              lng: value[1]
            }}
            onClick={()=>{
              //삭제
              alert("clicked");
            }}
            />
          )
        })} */}
        {isMarkerExists && markerArray.map((value,index) => {
          return (
            <Marker
              key={index}
              position={{
                lat: value.lat,
                lng: value.lng
              }}
              onClick={()=>{
                //삭제
                setMarkerArray([...markerArray.slice(0,index),...markerArray.slice(index+1,markerArray.length)])
              }}
              />
          )
        })}
        {parksData.features.map( park =>(
          <Marker
            key={park.properties.PARK_ID}
            position={{
              lat: park.geometry.coordinates[1],
              lng: park.geometry.coordinates[0]
            }}
            icon={{
              url: "https://lh3.googleusercontent.com/bECXZ2YW3j0yIEBVo92ECVqlnlbX9ldYNGrCe0Kr4VGPq-vJ9Xncwvl16uvosukVXPfV=w300",
              scaledSize: new window.google.maps.Size(40, 40)
            }}
            onClick={()=>{
              setSelectedPark(park);
            }}
            />
        ))}
        {selectedPark && (
          <InfoWindow
            position={{
              lat: selectedPark.geometry.coordinates[1],
              lng: selectedPark.geometry.coordinates[0]
            }}
            onCloseClick={()=>{
              setSelectedPark(null);
            }}
            >
            <div>
              <h2>{selectedPark.properties.NAME}</h2>
              <p>{selectedPark.properties.DESCRIPTIO}</p>
            </div>
          </InfoWindow>
        )}
        <SearchBox
          ref={onSearchBoxMounted}
          bounds={bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={onPlacesChanged}
        >
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              marginTop: `27px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
            }}
          />
        </SearchBox>
      </GoogleMap>
    </div>
  )
}

const WrappedMap = withScriptjs((withGoogleMap(GoogleMaps)))

//리듀서로 isMakePolyLine 제어
const Map = () =>{
  const [isDisplayDarkMode,setIsDisplayDarkMode] = useState(false);
  const [center, setCenter] = useState({ lat: 45.4211, lng: -75.6903 });
  const [bounds, setBounds] = useState(null);
  const {isMakePolyLine, jsonResponse, selectedInstruction, markerState} = useSelector(state => state.googleMap);
  const dispatch = useDispatch();
  const refs = {};

  //const code = name;
  const onChangeDisplayMode = useCallback((e) => {
    e.preventDefault();
    //console.log(isDisplayDarkMode)
    setIsDisplayDarkMode(!isDisplayDarkMode);
  },[isDisplayDarkMode]);

  const onChangeRoutingMode = (e) => {
    e.preventDefault();
    //console.log(isMakePolyLine)
    isMakePolyLine ?  dispatch(navigationPageSetGoogleMapRoutingDisplayFalse) : dispatch(navigationPageSetGoogleMapRoutingDisplayTrue)
  }

  //검색 시 첫 번째로 실행이 된다.
  const onSearchBoxMounted = (ref) => {
    refs.searchBox = ref;
  }

  //검색어가 입력되어 엔터키를 받으면 두번째로 실행
  const onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    });
    const nextMarkers = places.map(place => ({
      position: place.geometry.location,
    }));
    const nextCenter = nextMarkers[0].position
    setCenter(nextCenter);
  }
  //검색사용시 렌더링된다.
  const onMapMounted = (ref) => {
    refs.map = ref;
  }
  //화면이 움직일 때마다 사용됨 -> 가장 마지막에 사용됨
  const onBoundsChanged = () => {
    if(refs){
      //setBounds(refs.map.getBounds());
      //setCenter(refs.map.getCenter());
    }
  }

  const onSaveJsonResponse = () => {
    //isMakePolyLine ?  dispatch(navigationPageFlushJsonResponse) : dispatch(navigationPageFillJsonResponse);
    if( JSON.stringify(jsonResponse) === JSON.stringify({})){
      alert("Do not exist reponse to save as gpx.\nYou have marked only "+markerState.length+" markers.");
    }else{
      const fileData = JSON.stringify(jsonResponse);
      const blob = new Blob([fileData], {type: "text/plain"});
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'filename.json';
      link.href = url;
      link.click();
    }
  }

  const onSaveGpxResponse = () =>{
    console.log("niklasjang", markerState);
    if(markerState.length < 2){
      alert("Do not exist reponse to save as gpx.\nYou have marked only "+markerState.length+" markers.");
    }
    else if(markerState.length < 6){
      let rountingURL = 'https://graphhopper.com/api/1/route?';
      for(let i=0; i<markerState.length-1; i++){
        rountingURL = rountingURL +'point='+ markerState[i].lat+","+markerState[i].lng + '&'
      }
      rountingURL = rountingURL + 'point=' + markerState[markerState.length-1].lat+","+markerState[markerState.length-1].lng;
      console.log(rountingURL);
      axios.get(rountingURL, {
        params: {
          type :'gpx',
          vehicle: 'car',
          debug : true,
          key : '7a201926-118f-46d5-b0ec-5ab1b5094a0f',
          points_encoded : false
        }}).then( response => {
          console.log("niklasjang",response.data);
          const blob = new Blob([response.data], {type: "text/html"});
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = 'filename.gpx';
          link.href = url;
          link.click();
        } ) // SUCCESS
      .catch( response => { console.log(response); } ); // ERROR
    }
  }

  return (
    <div style={{height:"500px"}}>
      <Button className="btnTheme" style={{marginBottom:"10px"}} icon="eye" onClick={onChangeDisplayMode}>Theme</Button>
      <Button className={isMakePolyLine ? "active" : ""} style={{marginBottom:"10px"}} icon="eye" onClick={onChangeRoutingMode}>Make Route</Button>
      <Button className="SaveJsonResponse" icon="eye" onClick={onSaveJsonResponse}>Save Json Response</Button>
      <Button className="SaveGpxResponse" icon="eye" onClick={onSaveGpxResponse}>Save GPX Response</Button>
      <WrappedMap
        id="wrapped-map"
        changeMapTheme = {isDisplayDarkMode}
        isMakePolyLineToMap = {isMakePolyLine}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_DEV_GOOGLE_MAP_API_KEY}`}
        loadingElement={<div style={{height : "100%"}}></div>}
        containerElement={<div style={{height : "100%"}}></div>}
        mapElement={<div style={{height : "100%"}}></div>}
        />

    </div>
  )
}

export default Map;


GoogleMaps.propTypes = {
  changeMapTheme : PropTypes.bool,
  isMakePolyLineToMap : PropTypes.bool
}
