import { useState, useEffect } from 'react';
import { useGeolocation } from '../../GeolocationCustomHooks/useGeolocation';
import { getHeaders, getVendorByCategory, getVendorInfo } from '../HomeComponents/HomeApi';

export const useSearch = (initialSearchInput, location) => {
    // 상태 변수 설정
    const [searchInput, setSearchInput] = useState(initialSearchInput || ""); // 검색 입력 값
    const [searchResults, setSearchResults] = useState([]); // 검색 결과
    const [recentSearches, setRecentSearches] = useState([]); // 최근 검색어
    const [recentShops, setRecentShops] = useState([]); // 최근 방문한 가게들
    const { location: geoLocation, isLoading } = useGeolocation(); // 현재 위치 정보
    const [vendors, setVendors] = useState([]); // 판매자 정보

    const accessToken = localStorage.getItem('accessToken'); // 액세스 토큰 가져오기
    const userSpecificKey = `recentSearches-${accessToken}`; // 유저별로 최근 검색어를 저장할 키

    const handleSearchClick = async () => {
        if (!searchInput.trim()) return;
        if (isLoading) return;

        try {
            if (geoLocation && geoLocation.lat && geoLocation.lng) {
<<<<<<< HEAD
                const nowLocationDto = {
                    latitude: geoLocation.lat,
                    longitude: geoLocation.lng,
                };

                const response = await axios.get(`http://192.168.0.240:1004/vendor/info?search=${searchInput}`, {
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
=======
                const response1 = await getVendorByCategory(searchInput);
                if (response1.status === 200 && response1.data && response1.data.itemlist) {
                    setVendors(response1.data.itemlist);
                }

                const response2 = await getVendorInfo(searchInput);
                let isRelevantSearch = true;

                if (response2.status === 200 && response2.data?.itemlist) {
                    let data = response2.data.itemlist;

                    data = data.filter(vendor => {
                        const isNameMatch = vendor.vendorName && vendor.vendorName.includes(searchInput);
                        const isMenuMatch = vendor.SIGMenu && vendor.SIGMenu.includes(searchInput);
                        const isAddressMatch = vendor.address && vendor.address.includes(searchInput);
                        const isTypeMatch = vendor.vendorType && vendor.vendorType.includes(searchInput);

                        return isNameMatch || isMenuMatch || isAddressMatch || isTypeMatch;
                    });

                    isRelevantSearch = data.length > 0;
                    setSearchResults(data || []);
                }

                const existingSearches = JSON.parse(localStorage.getItem(userSpecificKey) || "[]");

                if (isRelevantSearch) {
                    const isDuplicate = existingSearches.find(item => item.text === searchInput);

                    if (!isDuplicate) {
                        const newItem = { text: searchInput, timestamp: new Date().getTime() };
                        const updatedSearches = [...existingSearches, newItem];
                        localStorage.setItem(userSpecificKey, JSON.stringify(updatedSearches));
                        updatedSearches.sort((a, b) => b.timestamp - a.timestamp);

                        if (updatedSearches.length > 10) {
                            updatedSearches.pop();
                        }

                        localStorage.setItem(userSpecificKey, JSON.stringify(updatedSearches));
                        setRecentSearches(updatedSearches);
                    }
>>>>>>> dfbbd0f7aed48255a114d10846631cf192d41633
                }
            }
        } catch (error) {
            console.error("API Request Error:", error);
        }
    };

    useEffect(() => {
<<<<<<< HEAD
        if (searchInput) {
            axios.get(`http://192.168.0.240:1004/vendor/category?address=${searchInput}&menuName=${searchInput}&vendorName=${searchInput}`, {
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
=======
        try {
            const storedSearches = JSON.parse(localStorage.getItem(userSpecificKey) || '[]');
            setRecentSearches(storedSearches);
        } catch (error) {
            console.error('최근 검색어 불러오기 에러:', error);
>>>>>>> dfbbd0f7aed48255a114d10846631cf192d41633
        }
    }, [accessToken, searchInput]); // 액세스 토큰 또는 검색 입력이 변경될 때 실행

    useEffect(() => {
        if (Array.isArray(vendors)) {
            const filteredResults = vendors.filter(
                (result) =>
                    (result.vendorName && result.vendorName.includes(searchInput)) ||
                    (result.SIGMenu && result.SIGMenu.includes(searchInput)) ||
                    (result.address && result.address.includes(searchInput)) ||
                    (result.vendorType && result.vendorType.includes(searchInput))
            );
            setSearchResults(filteredResults);
        }
    }, [vendors, searchInput]); // 판매자 정보 또는 검색 입력이 변경될 때 실행

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
