import { useState, useEffect } from 'react';

function useLocationApi() {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        console.log(location);
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

export default useLocationApi;