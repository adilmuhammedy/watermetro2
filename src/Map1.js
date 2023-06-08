import React, { useEffect } from 'react';
import './map.css';
const Map1 = () => {
  useEffect(() => {
    loadMap();
  }, []);
  const loadMap = () => {
    const google = window.google;
    // Create a new map instance
    const map = new google.maps.Map(document.getElementById('kakkanad'), {
        center: { lat: 9.992528199629383, lng:76.35128641845284},
        zoom: 14,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [
              { saturation: -100 },
              { lightness: 170 },
            ],
          },
          {
            featureType: 'road',
            elementType: 'labels',
            stylers: [
              { visibility: 'off' },
            ],
          },
          // Add more styles as needed
        ],
      });
    // Add a marker to the map
    new google.maps.Marker({
      position: { lat: 9.992528199629383, lng:76.35128641845284},
      map: map,
    });
  };
  return <div id="kakkanad" className='kakkanadm'></div>;
};
export default Map1;
