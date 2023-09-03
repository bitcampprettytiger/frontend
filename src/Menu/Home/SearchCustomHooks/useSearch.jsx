import { useState, useEffect } from 'react';
import { useGeolocation } from '../../GeolocationCustomHooks/useGeolocation';
import { getHeaders, getVendorByCategory, getVendorInfo } from '../HomeComponents/HomeApi';

// 검색 관련 상태와 로직을 관리하는 커스텀 훅
export const useSearch = (initialSearchInput, location) => {
    // 검색 입력 값 관리
    const [searchInput, setSearchInput] = useState(initialSearchInput || "");
    // 검색 결과 관리
    const [searchResults, setSearchResults] = useState([]);
    // 최근 검색어 관리
    const [recentSearches, setRecentSearches] = useState([]);
    // 최근 방문한 가게들 관리
    const [recentShops, setRecentShops] = useState([]);
    // 현재 위치 정보
    const { location: geoLocation, isLoading } = useGeolocation();
    // 판매자 정보 관리
    const [vendors, setVendors] = useState([]);

    // 검색 버튼 클릭 처리
    const handleSearchClick = async () => {
        // 검색어가 없으면 경고
        if (!searchInput.trim()) {
            console.warn("검색어를 입력하세요.");
            return;
        }

        // 위치 정보 로딩 중이면 대기
        if (isLoading) {
            console.warn('Location 로딩중~');
            return;
        }

        try {
            // 최근 검색어 업데이트
            const existingSearch = recentSearches.find((item) => item.text === searchInput);
            if (!existingSearch) {
                const newItem = { text: searchInput, timestamp: new Date().getTime() };
                const updatedSearches = [...recentSearches, newItem];
                localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
                setRecentSearches(updatedSearches);
            }

            // 위치 정보가 있는 경우에만 API 호출
            if (geoLocation && geoLocation.lat && geoLocation.lng) {
                // 첫 번째 API 호출 (카테고리별 판매자 정보)
                const response1 = await getVendorByCategory(searchInput);
                if (response1.status === 200 && response1.data && response1.data.itemlist) {
                    setVendors(response1.data.itemlist);
                }

                // 두 번째 API 호출 (판매자 정보)
                const response2 = await getVendorInfo(searchInput);
                if (response2.status === 200 && response2.data.result && response2.data.result.itemlist) {
                    let data = response2.data.result.itemlist;
                    data = data.filter(vendor =>
                        (vendor.vendorName && vendor.vendorName.includes(searchInput)) ||
                        (vendor.SIGMenu && vendor.SIGMenu.includes(searchInput)) ||
                        (vendor.address && vendor.address.includes(searchInput)) ||
                        (vendor.vendorType && vendor.vendorType.includes(searchInput))
                    );
                    setSearchResults(data || []);
                }
            } else {
                // 위치 정보가 없을 때
                console.warn("위치정보가 안나와 ㅠㅡㅠ");
            }
        } catch (error) {
            // API 요청 실패
            console.error('API Request Error:', error);
        }

        // 상태를 강제로 업데이트하여 useEffect를 다시 실행
        setSearchInput(prevInput => prevInput + " ");
        setSearchInput(prevInput => prevInput.trim());
    };

    // 판매자 정보가 업데이트 될 때 검색 결과도 함께 업데이트
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
