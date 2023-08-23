import { useState } from 'react';

const useAddress = () => {
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState({
        latitude: "",
        longitude: ""
    });

    const setAddressToHome = (newAddress, newLocation) => {
        setAddress(newAddress);
        setLocation(newLocation);
    };

    return {
        address,
        location,
        setAddressToHome
    };
};

export default useAddress;