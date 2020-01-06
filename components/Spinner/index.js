import React from 'react';
import { HashLoader } from 'react-spinners';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';

const LoadingSpinner = ({isLoad}) => {
  const override = css`
  position: absolute;
    display: block;
    margin: 0 auto;
    left: 50%;
    top: 30%;
    border-color: red;
    `;
  return(
    <div className="hashLoader" style={{height:"600px"}}>
      <HashLoader
          css={override}
          sizeUnit={"px"}
          size={250}
          color={'#123abc'}
          loading={isLoad}
        />
    </div>
  );
}

export default LoadingSpinner;

LoadingSpinner.propTypes = {
  isLoad: PropTypes.bool
}
