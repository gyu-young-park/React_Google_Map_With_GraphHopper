import React,{useState} from 'react';
import Toast from 'react-bootstrap/Toast'
import './index.css';
import PropTypes from 'prop-types';
const HomeToast = ({title, content, day}) => {
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);

  return(
  <div className="toast-padding">
    <Toast show={showA} onClose={toggleShowA}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
        <strong className="mr-auto">{title}</strong>
        <small>{day}</small>
      </Toast.Header>
      <Toast.Body>{content}</Toast.Body>
    </Toast>
  </div>
  )
}

HomeToast.propTypes = {
  title : PropTypes.String,
  content : PropTypes.String,
  day : PropTypes.String
}

export default HomeToast;
