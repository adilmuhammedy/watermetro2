import React, { useEffect } from 'react';
import './map.css';
const Map4 = () => {
  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = () => {
    const google = window.google;
    // Create a new map instance
 
    const map = new google.maps.Map(document.getElementById('vypin'), {
        center: { lat:9.974370409333742, lng:76.24439272282441},
        zoom: 14,
      });
    // Add a marker to the map
    new google.maps.Marker({
      position: { lat: 9.974370409333742, lng:76.24439272282441},
      map: map,
    });
  };
  return <div id="vypin" className='vypinm'></div>;
};
export default Map4;
