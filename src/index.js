import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Libraries
import { BrowserRouter } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { LazyMotion, domMax } from "framer-motion";

// css
import "./Assets/css/icons.css"
import "./Assets/css/global.css"
import "./Assets/css/pages.css"
import "./index.scss"
// import "./newStyles.scss"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LazyMotion features={domMax}>
  <ParallaxProvider>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </ParallaxProvider>
  </LazyMotion>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
