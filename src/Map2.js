import React, { useEffect } from 'react';
import './map.css';
const Map2 = () => {
  useEffect(() => {
    loadMap();
  }, []);
  const loadMap = () => {
    const google = window.google;
    // Create a new map instance
    const map = new google.maps.Map(document.getElementById('vyttila'), {
        center: { lat: 9.967273889979259, lng:76.32238139694287},
        zoom: 14,
      });
    // Add a marker to the map
    new google.maps.Marker({
      position: { lat: 9.967273889979259, lng:76.32238139694287},
      map: map,
    });
  };
  return <div id="vyttila" className='vyttilam'></div>;
};
export default Map2;
