import React, { useEffect } from 'react';
import './map.css';
const Map = () => {
  useEffect(() => {
    loadMap();
  }, []);

  const loadMap = () => {
    const google = window.google;
    // Create a new map instance
    const map = new google.maps.Map(document.getElementById('k'), {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 14,
    });

    // Add a marker to the map
    new google.maps.Marker({
      position: { lat: 37.7749, lng: -122.4194 },
      map: map,
    });
  };

  return <div id="k" className='k'></div>;
};

export default Map;
