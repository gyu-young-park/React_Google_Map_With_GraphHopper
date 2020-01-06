import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import {useDispatch , useSelector} from 'react-redux';
import {navigationPageSetGoogleMapCenterPositionSet} from '../../reducers/googleMap';
import {chartForNavigationIsThereGpxFileTrue,
  chartForNavigationInstructionArraySet
} from '../../reducers/chartForNavigation';
import {navigationPageFlushJsonResponse} from '../../reducers/googleMap';
import axios from 'axios';


//20191119 현재 데이터들은 mock입니다.

const ChartForNavigation = () => {
  const [chartData,setChartData] = useState({});
  const [chartPointArray,setChartPointArray] = useState([]);
  const [labelArray,setLabelArray] = useState([]);
  const chartState = useSelector(state => state.chart)
  const {centerData, jsonResponse ,isMakePolyLine} = useSelector(state => state.googleMap);
  const dispatch = useDispatch();


  //맨 처음 올 때만 이 값을 갖는다.
  useEffect(()=>{
    //gpx파일이 생성된다면
    if(JSON.stringify(jsonResponse) === JSON.stringify({}) || !isMakePolyLine){
      setLabelArray([]);
      setChartPointArray([]);
      dispatch(chartForNavigationInstructionArraySet([]));
    }else{
      dispatch(chartForNavigationIsThereGpxFileTrue);
      const tempLabelArray =[];
      const tempInstructionsMarkerArray = [];

      jsonResponse.paths[0].instructions.forEach((val,i)=>{
        if(val.distance === 0){tempLabelArray.push(" ");}
        else{tempLabelArray.push(val.distance.toString() + "m");}
        tempInstructionsMarkerArray.push(val.points[val.interval[0]]);
      })
      getAltitude(tempInstructionsMarkerArray);
      setLabelArray([...tempLabelArray]);
      dispatch(chartForNavigationInstructionArraySet(tempInstructionsMarkerArray));
    }
  },[jsonResponse,isMakePolyLine]);

  useEffect(()=>{
    if(!isMakePolyLine){
      dispatch(navigationPageFlushJsonResponse);
    }
  },[isMakePolyLine])

  useEffect(()=>{
    setChartData({...chartData,data: {
      labels: labelArray,
      datasets: [
        {
          label: "Altitude",
          backgroundColor: "rgba(255,0,255,0.50)",
          data: chartPointArray,
          borderColor: "white",
          borderWidth : 2
        }
      ]
    }})
  },[chartPointArray])

  const clickItem =(e, item) => {
    if(item.length !== 0){
      const index = item[0]._index;
      dispatch(navigationPageSetGoogleMapCenterPositionSet(chartState.instructionsMarkerArray[index]))
    }else{
      return;
    }
  }
  //고도 찾기
  const getAltitude = async (latlngArray) => {
    console.log(latlngArray)
    const temp_avoid_cros = `https://cors-anywhere.herokuapp.com/`;
    let latlng = "";
    latlngArray.forEach((val, i)=>{
      if(i !== 0) latlng += '|';
      latlng += val[1].toString() + ','+val[0].toString();
      console.log(latlng)
    })
    const url =`https://maps.googleapis.com/maps/api/elevation/json?locations=${latlng}&key=`;
    const key = process.env.REACT_APP_PROD_GOOGLE_MAP_API_KEY;
    const res = await  axios.get(temp_avoid_cros+url+key)
    const chartArray = [];
    if(res !== undefined){
      res.data.results.forEach((val,i)=>{
        chartArray.push(val.elevation);
      })
    }
    setChartPointArray([...chartArray]);
  }

  return(
    <div style={{position:"relative", width: 500}}>
      <Line
        options={{
          responsive:true,
          animation: {
            duration: 1000 // general animation time
          },
          elements: {
            line: {
                tension: 0 // disables bezier curves
            }
          },
          events: ['click'],
          onClick: clickItem,
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Altitude(m)'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'Distance(m)'
              }
            }]
          }
        }}
        data={chartData.data}
        />
    </div>

  )
}

export default ChartForNavigation;
