import { useState } from 'react';

export const useSearch = (initialSearchInput, location) => {
    const [searchInput, setSearchInput] = useState(initialSearchInput || "");
    const [searchResults, setSearchResults] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [recentShops, setRecentShops] = useState([]);

    const handleSearchClick = async () => {
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
            if (location && location.lat && location.lng) {
                const nowLocationDto = {
                    latitude: location.lat,
                    longitude: location.lng,
                };

                const response = await fetch(`http://localhost/vendor/search`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nowLocationDto),
                });

                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data.results || []);
                } else {
                    console.error('API Request Failed:', response);
                }
            } else {
                console.warn("Location information is not available.");
            }

        } catch (error) {
            console.error('API Request Error:', error);
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
