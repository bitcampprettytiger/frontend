import { useState, useEffect } from 'react';
import { useGeolocation } from '../../GeolocationCustomHooks/useGeolocation';
import { getHeaders, getVendorByCategory, getVendorInfo } from '../HomeComponents/HomeApi';

export const useSearch = (initialSearchInput, location) => {
    const [searchInput, setSearchInput] = useState(initialSearchInput || "");
    const [searchResults, setSearchResults] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [recentShops, setRecentShops] = useState([]);
    const { location: geoLocation, isLoading } = useGeolocation();
    const [vendors, setVendors] = useState([]);
    const [error, setError] = useState(null);

    const accessToken = localStorage.getItem('accessToken');
    const userSpecificKey = `recentSearches-${accessToken}`;

    const filterVendors = (data) => {
        return data.filter(vendor => {
            const isNameMatch = vendor.vendorName?.includes(searchInput);
            const isMenuMatch = vendor.SIGMenu?.includes(searchInput);
            const isAddressMatch = vendor.address?.includes(searchInput);
            const isTypeMatch = vendor.vendorType?.includes(searchInput);

            return isNameMatch || isMenuMatch || isAddressMatch || isTypeMatch;
        });
    }

    const handleSearchClick = async () => {
        if (!searchInput.trim() || isLoading) return;

        try {
            const [response1, response2] = await Promise.all([
                getVendorByCategory(searchInput),
                getVendorInfo(searchInput)
            ]);

            if (response1.status === 200 && response1.data?.itemlist) {
                setVendors(response1.data.itemlist);
            }

            if (response2.status === 200 && response2.data?.itemlist) {
                const filteredData = filterVendors(response2.data.itemlist);
                setSearchResults(filteredData);

                const existingSearches = JSON.parse(localStorage.getItem(userSpecificKey) || "[]");
                const isDuplicate = existingSearches.find(item => item.text === searchInput);

                if (!isDuplicate && filteredData.length) {
                    const newItem = { text: searchInput, timestamp: new Date().getTime() };
                    const updatedSearches = [...existingSearches, newItem].sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);
                    localStorage.setItem(userSpecificKey, JSON.stringify(updatedSearches));
                    setRecentSearches(updatedSearches);
                }
            }

        } catch (error) {
            console.error("API Request Error:", error);
            setError("An error occurred while fetching the data.");
        }
    };

    useEffect(() => {
        try {
            const storedSearches = JSON.parse(localStorage.getItem(userSpecificKey) || '[]');
            setRecentSearches(storedSearches);
        } catch (error) {
            console.error('Error loading recent searches:', error);
        }
    }, [accessToken, searchInput]);

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
        vendors,
        error
    };
};
