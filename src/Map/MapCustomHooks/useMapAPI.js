// useMapAPI.js
/*global kakao*/

import { useState, useEffect } from 'react';
import axios from 'axios';

export const useMapAPI = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data.itemlist);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading };
};
