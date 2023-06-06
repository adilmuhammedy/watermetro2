import React, { useEffect } from 'react';
import './map.css';
const Map3 = () => {
  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = () => {
    const google = window.google;
    // Create a new map instance
 
    const map = new google.maps.Map(document.getElementById('hcourt'), {
        center: { lat: 9.98378139794565, lng:76.27300278854868},
        zoom: 14,
      });

    // Add a marker to the map
    new google.maps.Marker({
      position: { lat: 9.98378139794565,lng: 76.27300278854868},
      map: map,
    });
  };

  return <div id="hcourt" className='hcourtm'></div>;
};

export default Map3;
