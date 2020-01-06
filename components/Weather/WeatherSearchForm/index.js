import React from 'react';
import './index.css';
import PropTypes from 'prop-types';

const WeatherSearchForm = ({loadWeather , error}) =>{
  return (
    <div className="container" style={{paddingTop:"2px",marginLeft:"15px"}}>
      <div>{error ? errorComponent(): null }</div>
      <form onSubmit={loadWeather}>
        <div className="row">
          <div className="col-xs-3 col-md-4">
            <input type="text" className="from-control" style={{width:"120px"}} name="city" autoComplete="off" placeholder="City"/>
          </div>
          <div className="col-xs-3 col-md-4">
            <input type="text" className="from-control" name="country" autoComplete="off" placeholder="Country"/>
          </div>
          <div className="col-xs-3 col-md-4">
            <button className="btn btn-danger" style={{marginLeft:"13px", fontSize:"15px"}}>get</button>
          </div>
        </div>
      </form>
    </div>
  )
}

const errorComponent = () => {
  return (
    <div className="alert alert-danger mx-5" role="alert">Please Enter City and Country</div>
  )
}

WeatherSearchForm.propTypes = {
  loadWeather : PropTypes.func,
  error : PropTypes.bool
}

export default WeatherSearchForm
