import { useState, useEffect } from 'react';
import axios from 'axios';

export default function usePopularPlaces(address, location) {
    const [popularPlaces, setPopularPlaces] = useState([]);

    useEffect(() => {
        if (address && location.latitude && location.longitude) {
            console.log("여기1!1")
            console.log(address)
            console.log(location.latitude)
            console.log(location.longitude)
            console.log("여기!!!!")
            axios.post('http://192.168.0.58/vendor/search', {
                address: address,
                latitude: location.latitude,
                hardness: location.longitude  // 오타 수정됨
            },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log(response)
                    // isSuccess 필드 확인 추가됨
                    if (response.data.isSuccess) {
                        const itemList = Array.isArray(response.data.result.itemlist) ? response.data.result.itemlist : [];
                        setPopularPlaces(itemList);
                    }
                })
                .catch(error => {
                    console.error("Error fetching popular places", error);
                });
        }
    }, [address, location]);  // 종속성 수정됨

    return popularPlaces;
}