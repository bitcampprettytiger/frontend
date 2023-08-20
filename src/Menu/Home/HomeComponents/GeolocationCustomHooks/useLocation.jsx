import { useState, useEffect } from 'react';

function useLocation() {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                setLocation(coords);
            },
            (error) => {
                console.error("Error fetching location", error);
            }
        );
    }, []);

    return location;
}

export default useLocation;
