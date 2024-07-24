import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "./Signup2.scss"
import { updateUser } from '../../server/usersServer';
import { useDispatch, useSelector } from 'react-redux';
import { failureLoader, startLoader, successLoader } from '../../redux/reduxStore/loaderSLice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setUser } from '../../redux/reduxStore/authSlice';

// Fix for marker icons not appearing
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

const Signup2 = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [address, setAddress] = useState('');
    const [wareError , setWareError ] = useState("")
    const birth_ref = useRef()
    const {isLoading } = useSelector(state => state.loaderSlice)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
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
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }, []);

    const MapEvents = () => {
        useMapEvents({
            async click(e) {
                const { lat, lng } = e.latlng;
                setMarkerPosition({ latitude: lat, longitude: lng });
                setLocation({latitude: lat , longitude : lng})

                const address = await fetchAddress(lat, lng);
                setAddress(address);
            },
        });
        return null;
    };

    

    const sendAddition = async () => {
        dispatch(startLoader())
        try {
            const userId = localStorage.getItem("myId");
            const formData = new FormData();
            if(!birth_ref.current.value){
                dispatch(failureLoader())
                return setWareError("Please show your birth date")
            }

            formData.append('birthDate' , birth_ref.current.value);
            formData.append('address', JSON.stringify({
                name: address,
                location
            }))

            const data = await updateUser(formData , userId);
            dispatch(successLoader())
            setUser(data.user)
            navigate('/')
        } catch (error) {
            dispatch(failureLoader())
            setWareError(error?.response?.data?.message)
        }
    }

  return (
    <div>
      <div className="sign-up signup2">
        <div className="sign-parent">

            <div className="sign-up-box">

                <div>
                    <h3 className='date-title-sign'>Date of birth </h3>
                    <input  ref={birth_ref} type="date" className='date-input'  />
                </div>
                <h2 className="sign-up-title">Address</h2>

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
            <span className="wareError">{wareError}</span>
            <button onClick={sendAddition} className="sign-btn">{ isLoading ? "Loading..." : "Send"}</button>
            
            </div>
        </div>
      </div>
    </div>
  )
}

export default Signup2
