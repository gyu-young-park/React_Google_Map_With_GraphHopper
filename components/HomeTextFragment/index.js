import React from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
const HomeTextFragment = ({title, content, buttonText ,btnClass}) => {
  return(
    <div className="card" style={{textAlign :"left"}}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{content}</p>
        <a href="#" className={`btn ${btnClass}`}>{buttonText}</a>
      </div>
    </div>
  )
}

HomeTextFragment.propTypes = {
  title : PropTypes.String,
  content : PropTypes.String,
  buttonText : PropTypes.String,
  btnClass: PropTypes.String
}

export default HomeTextFragment;
