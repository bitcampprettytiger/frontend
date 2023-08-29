import { useState } from 'react';
import { useGeolocation } from '../../GeolocationCustomHooks/useGeolocation';
import axios from 'axios';


export const getHeaders = () => {
    const accessToken = localStorage.getItem('accessToken');
    return {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
    };
};

export const useSearch = (initialSearchInput, location) => {
    const [searchInput, setSearchInput] = useState(initialSearchInput || "");
    const [searchResults, setSearchResults] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [recentShops, setRecentShops] = useState([]);
    const { location: geoLocation, isLoading } = useGeolocation();

    const handleSearchClick = async () => {
        if (!searchInput.trim()) {
            console.warn("검색어를 입력하세요.");
            return;
        }
        console.log("Location object:", geoLocation);

        if (isLoading) {
            console.warn('Location 로딩중~');
            return;
        }
        try {
            // 중복 검색어가 있는지 확인하고, 없으면 추가
            const existingSearch = recentSearches.find((item) => item.text === searchInput);
            if (!existingSearch) {
                const newItem = { text: searchInput, timestamp: new Date().getTime() };
                const updatedSearches = [...recentSearches, newItem];
                localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
                setRecentSearches(updatedSearches);
            }
            if (!searchInput.trim()) {
                console.warn('검색어가 비어 있습니다.');
                return;
            }

            // 백엔드 API를 호출
            if (geoLocation && geoLocation.lat && geoLocation.lng) {
                const nowLocationDto = {
                    latitude: geoLocation.lat,
                    longitude: geoLocation.lng,
                };

                const response = await axios.get(`http://27.96.135.75/vendor/info`, {

                    headers: getHeaders()
                });



                console.log("API Response: ", response);  // Debugging line

                console.log(response)
                const data = response.data.result.itemlist;
                setSearchResults(data || []);


                if (response.status == 200 && response.data.result && response.data.result.itemlist) {
                    const data = response.data.result.itemlist;
                    console.log("response.status === 200" + response.data)
                    // console.log("Search Results: ", data.results);  // Debugging line
                    console.log(data)
                    setSearchResults(data || []);
                } else {
                    console.error('API Request Failed:', response);
                    // alert('검색 실패: API 문제가 발생했습니다.');

                }

            } else {
                console.warn("위치정보가 안나와 ㅠㅡㅠ");
            }

        } catch (error) {
            console.error('API Request Error:', error);
            // alert('검색 실패: 네트워크 문제가 발생했습니다.');
        }
    };

    return {
        searchInput,
        setSearchInput,
        searchResults,
        setSearchResults,
        recentSearches,
        setRecentSearches,
        recentShops,
        setRecentShops,
        handleSearchClick,
    };
};
