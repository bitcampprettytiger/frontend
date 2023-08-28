import { useState, useEffect } from 'react';
import axios from 'axios';

const useVendor = (vendorId) => {
  const [vendor, setVendor] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getVendor = async () => {
      try {
        console.log("실행")
        setLoading(true);
        const res = axios.get('http://27.96.135.75/vendor/infoDetail/1');
        console.log(res);
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
