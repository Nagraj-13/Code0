import React, { useState } from "react";
import "../Components/css/dashboard.css";
import AnimalMap from "./AnimalMap";
// import OtherComponent from "./OtherComponent"; // Adjust the path as necessary
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Map from "./Map";

const Dashboard = () => {
  const [radius, setRadius] = useState(5500);
  const [showAnimalMap, setShowAnimalMap] = useState(true);

  const showNotification = (message) => {
    toast.warn(message);
  };

  const toggleComponent = () => {
    setShowAnimalMap((prevState) => !prevState);
  };

  return (
    <>
      <ToastContainer position='bottom-left' autoClose={3000} newestOnTop style={{ marginLeft: '3vw' }} />
      <div className="main-container">
        <div className="map-sidebar shadow-lg">
          <p className="dashboard-title">Animal Tracker</p>
          <div className="radius-slider">
            <p className="radius-slider-title">Radius Slider</p>
            <div className="slider">
              <input
                type="range"
                min={100}
                max={100000}
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              />
              {/* <span>{radius / 10}</span> */}
            </div>
          </div>
          <div>
            <button className="btn" onClick={toggleComponent}>
              {showAnimalMap ? "Show Animal Groups" : "Show Animal Map"}
            </button>
          </div>
          <h3 style={{color:'white',margin:'2em',fontSize:'1.5rem'}}>Notifications</h3>
        </div>
        <div className="map-main shadow-lg">
          {showAnimalMap ? <AnimalMap radius={radius} showNotification={showNotification} /> : <Map/>}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
