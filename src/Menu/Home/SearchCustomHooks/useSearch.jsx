import { useState, useEffect } from 'react';
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
    const [vendors, setVendors] = useState([]); // 추가한 부분



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

            // 백엔드 API를 호출
            if (geoLocation && geoLocation.lat && geoLocation.lng) {
                const nowLocationDto = {
                    latitude: geoLocation.lat,
                    longitude: geoLocation.lng,
                };

                const response = await axios.get(`http://27.96.135.75/vendor/info?search=${searchInput}`, {
                    headers: getHeaders()
                });

                console.log("API Response: ", response);  // Debugging line

                if (response.status === 200 && response.data.result && response.data.result.itemlist) {
                    const data = response.data.result.itemlist;

                    // 필터링 수행
                    data = data.filter(vendor =>
                        (vendor.vendorName && vendor.vendorName.includes(searchInput)) ||
                        (vendor.SIGMenu && vendor.SIGMenu.includes(searchInput)) ||
                        (vendor.address && vendor.address.includes(searchInput)) ||
                        (vendor.vendorType && vendor.vendorType.includes(searchInput))
                    );

                    setSearchResults(data || []);
                } else {
                    console.error('API Request Failed:', response);
                }
            } else {
                console.warn("위치정보가 안나와 ㅠㅡㅠ");
            }
        } catch (error) {
            console.error('API Request Error:', error);
        }

        // 상태를 강제로 업데이트하여 useEffect를 다시 실행하게 함
        setSearchInput(prevInput => prevInput + " "); // 공백 추가
        setSearchInput(prevInput => prevInput.trim()); // 공백 제거
    };



    // 1. 검색 텍스트가 있을 경우에만 API 호출
    useEffect(() => {
        if (searchInput) {
            axios.get(`http://27.96.135.75/vendor/category?address=${searchInput}&menuName=${searchInput}&vendorName=${searchInput}`, {
                headers: getHeaders()
            })
                .then(response => {
                    console.log('Response data:', response.data); // 디버깅 코드 추가
                    console.log('Type of response data:', typeof response.data); // 디버깅 코드 추가
                    setVendors(response.data.itemlist || []);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }, [searchInput]);


    // 2. vendors가 변경될 때마다 필터링 수행
    useEffect(() => {
        if (Array.isArray(vendors)) {
            const filteredResults = vendors.filter(result =>
                (result.vendorName && result.vendorName.includes(searchInput)) ||
                (result.SIGMenu && result.SIGMenu.includes(searchInput)) ||
                (result.address && result.address.includes(searchInput)) ||
                (result.vendorType && result.vendorType.includes(searchInput))
            );

            setSearchResults(filteredResults);
        }
    }, [vendors, searchInput]);



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

        vendors
    };
};
