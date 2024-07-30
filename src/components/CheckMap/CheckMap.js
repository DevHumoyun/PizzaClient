import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const fetchAddress = async (latitude, longitude) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    return data.display_name;
};

const CheckMap = ({setUserAddress}) => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [address, setAddress] = useState('');
   

    useEffect(() => {
        setUserAddress({address , location})
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    
                    setLocation({ latitude, longitude });
                    setMarkerPosition({ latitude, longitude });

                    const address = await fetchAddress(latitude, longitude);
                    setAddress(address);
                },
                (error) => {
                    setError(error.message);
                }
            );
            setUserAddress({address , location})
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);

    const MapEvents = () => {
        useMapEvents({
            async click(e) {
                const { lat, lng } = e.latlng;
                setMarkerPosition({ latitude: lat, longitude: lng });
                const address = await fetchAddress(lat, lng);
                setAddress(address);
                setUserAddress({name: address , location: {
                    longitude: lng,
                    latitude: lat
                }})
            },
        });
        return null;
    };

  return (
    <div style={{margin: '20px 0'}}>
         {error ? (
                <p>Error: {error}</p>
            ) : (
                location.latitude && location.longitude && (
                    <>
                        <MapContainer
                            center={[location.latitude, location.longitude]}
                            zoom={13}
                            style={{ height: "400px", width: "380px" }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {markerPosition && (
                                <Marker position={[markerPosition.latitude, markerPosition.longitude]}>
                                    <Popup>
                                        Your selected location.<br />
                                        {address}
                                    </Popup>
                                </Marker>
                            )}
                            <MapEvents />
                        </MapContainer>
                        <p> {address}</p>
                    </>
                )
            )}
    </div>
  )
}

export default CheckMap
