import React from 'react';
import PropTypes from 'prop-types';
const HomeImageTextFragment = ({title, content, buttonText, src ,btnClass}) => {
  return(
    <div className="card flex-row flex-wrap">
      <div className="card-header border-0">
          <img style={{height:"100px", width:"auto"}} src={require(`${src}`)} alt="smartphone"/>
      </div>
      <div className="card-block px-2" style={{marginTop:"5px"}}>
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{content}</p>
          <a href="#" className={`btn ${btnClass}`}>{buttonText}</a>
      </div>
    </div>
  )
}

HomeImageTextFragment.propTypes = {
  title : PropTypes.String,
  content : PropTypes.String,
  buttonText : PropTypes.String,
  src : PropTypes.String,
  btnClass: PropTypes.String
}

export default HomeImageTextFragment;
