// useMapAPI.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useMapAPI = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `Bearer ${accessToken}`,
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, { headers });
        setData(response.data.itemlist);
        console.log('벤더에이터ㅓㅓ',response.data.itemlist)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading };
};
