import React  from 'react';
import PropTypes from 'prop-types';

const WeatherWidget = ({city,country,temp_celsius,temp_min ,temp_max, description, weatherIcon}) => {

  return(
    <div className="container">
      <div className="cards pt-4">
        {(city !== undefined && country !== undefined) ?  <h1>{city},{country}</h1> : null}
        <h5 className="py-4"></h5>
          <i className={`wi ${weatherIcon} display-1`}/>
        {temp_celsius !== undefined ? <h1 className="py-2">{temp_celsius}&deg;</h1> : null}
        {minmaxTemp(temp_min,temp_max)}
        <h4 className="py-3">{description !== undefined ? description : null}</h4>
      </div>
    </div>
  );
}

const minmaxTemp = (min,max) => {
  if(min !== undefined && max !== undefined){
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    )
  }
}

WeatherWidget.propTypes = {
  city : PropTypes.string,
  country : PropTypes.string,
  temp_celsius : PropTypes.Number,
  temp_min : PropTypes.Number,
  temp_max : PropTypes.Number,
  description : PropTypes.string,
  weatherIcon : PropTypes.string
}

export default WeatherWidget;
