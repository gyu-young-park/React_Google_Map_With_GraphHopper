import React from 'react';
import Head from 'next/head';
import AppLayer from '../components/AppLayer';
import PropTypes from 'prop-types';
import LoadingSpinner from '../components/Spinner'
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { makeStore } from "../reducers";
import { PersistGate } from 'redux-persist/integration/react';
import 'bootstrap/dist/css/bootstrap.min.css';
const Ratio = ({ Component, store }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<LoadingSpinner isLoaded={true} />}>
        <title>Ratio</title>
        <Head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.23.3/antd.css" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css"
            type="text/css"
          />
        </Head>
        <AppLayer>
          <Component />
        </AppLayer>
      </PersistGate>
    </Provider>
  );
};
//type를 넣는 것
Ratio.propTypes = {
  Component: PropTypes.elementType,
  store: PropTypes.object
};

export default withRedux(makeStore, { debug: true })(Ratio)
