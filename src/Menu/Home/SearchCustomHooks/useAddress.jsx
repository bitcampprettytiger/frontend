import { useState } from 'react';

const useAddress = () => {
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState({
        latitude: "",
        longitude: ""
    });

    const extractDistrict = (fullAddress) => {
        const splitAddress = fullAddress.split(' ');
        if (splitAddress.length > 1 && splitAddress[1].endsWith('구')) {
            return splitAddress[1];
        }
        return fullAddress; // 원래 주소 반환 (예외 처리)
    };

    const setAddressToHome = (newAddress, newLocation) => {
        const district = extractDistrict(newAddress);
        setAddress(district);
        setLocation(newLocation);
    };

    return {
        address,
        location,
        setAddressToHome
    };
};

export default useAddress;