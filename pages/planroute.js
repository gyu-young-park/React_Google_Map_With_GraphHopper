import React, { useEffect } from 'react'
import Router from 'next/router'
import Map from '../components/GoogleMaps';
import ChartForNavigation from '../components/ChartForNavigation';
import InstructionTable from '../components/InstructionTable';
import { useSelector } from 'react-redux'
import * as ROUTES from '../constants/routes'
import './css-folder/planroute.css';

const RoutePlanningPage = () => {
  const userStorage = useSelector(state => (state.User))

  useEffect(() => {
    if (!userStorage.auth) {
      Router.push(ROUTES.LANDING)
    }
  })

  /**
   * <Row>
        <Col xs={4}><ChartForNavigation/></Col>
      </Row>
   *
   */
  return (
    <div style={{paddingTop:"10px"}}>
      <Map/>
      <div clssName="container planroute-container-pad" style={{paddingLeft:"10px", paddingTop:"50px"}}>
        <div className="row planroute-row-height"></div>
        <div className="row planroute-row-pad">
          <div className="col"><InstructionTable/></div>
          <div className="col"><ChartForNavigation/></div>
        </div>
      </div>
    </div>
  )
}

export default RoutePlanningPage
