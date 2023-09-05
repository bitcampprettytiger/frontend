import { useState, useEffect } from 'react';
import axios from 'axios';

const useVendor = (vendorId) => {
  const [vendor, setVendor] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    Authorization: `Bearer ${accessToken}`,
  };

  const getHeaders = () => {
    const accessToken = localStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Bearer ${accessToken}`,
    };
  };

  useEffect(() => {
    const getVendor = async () => {
      try {
        setLoading(true);

<<<<<<< HEAD
        const res = await axios.get(`http://192.168.0.240:1004/vendor/infoDetail/${vendorId}`, { headers });
=======
        const res = await axios.get(`https://mukjachi.site:6443/vendor/infoDetail/${vendorId}`, { headers });
>>>>>>> dfbbd0f7aed48255a114d10846631cf192d41633

        setVendor(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getVendor();
  }, [vendorId]);

  return { vendor, error, loading };
};

export default useVendor;
