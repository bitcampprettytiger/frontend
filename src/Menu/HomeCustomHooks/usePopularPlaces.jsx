// usePopularPlaces.js

import { useState, useEffect } from 'react';
import { fetchPopularPlaces, fetchShopsInArea } from '../Home/HomeComponents/HomeApi';

const usePopularPlaces = (initialAddress, initialLocation) => {
    const [popularPlaces, setPopularPlaces] = useState([]);
    const [shopsAroundArea, setShopsAroundArea] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchPopularPlaces(initialAddress, initialLocation.latitude, initialLocation.longitude);
            if (data) {
                setPopularPlaces(data);
            }
        };
        fetchData();
    }, [initialAddress, initialLocation]);

    const getShopsInArea = async (areaName) => {
        const data = await fetchShopsInArea(areaName);
        if (data) {
            setShopsAroundArea(data);
        }
    };

    return { popularPlaces, getShopsInArea, shopsAroundArea };
};

export default usePopularPlaces;
