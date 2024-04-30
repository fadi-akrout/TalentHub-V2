import React, { useRef, useEffect, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';

const Map = ({ JobCity }) => {
    const mapElement = useRef(null);
    const [coordinates, setCoordinates] = useState(null);
    const [marker, setMarker] = useState(null);

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const response = await fetch(`https://geocode.maps.co/search?q=${JobCity}&api_key=66303733b0e44612193413evj781ca3`);
                const data = await response.json();
                if (data && data.length > 0) {
                    const { lat, lon } = data[0];
                    setCoordinates({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
                }
            } catch (error) {
                console.error('Error fetching coordinates:', error);
            }
        };

        if (JobCity) {
            fetchCoordinates();
        }
    }, [JobCity]);

    useEffect(() => {
        if (mapElement.current && coordinates) {
            const { latitude, longitude } = coordinates;
            const map = tt.map({
                key: '2CPyYA7yzdIAlunNbTDh5X2LGnTKZ1Jt', 
                container: mapElement.current,
                center: [longitude, latitude], 
                zoom: 14,
            });
            const newMarker = new tt.Marker().setLngLat([longitude, latitude]).addTo(map);
            setMarker(newMarker);
        }
    }, [coordinates]);
    
    return (
        <>
            <link rel="stylesheet" href="https://api.tomtom.com/maps-sdk-for-web/cdn/5.x/5.69.1/maps/maps.css" />
            <div ref={mapElement} style={{ height: '400px', width: '800px', borderRadius: '40px' }} />
        </>
    );
};

export default Map;


