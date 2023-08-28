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
<<<<<<< HEAD
        const res = axios.get('http://27.96.135.75/vendor/infoDetail/1');
        console.log(res);
=======
        const res = await axios.get(`http://27.96.135.75/vendor/infoDetail/${vendorId}`,{
          headers :{
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzaW1ib25nZ3lvQGdtYWlsLmNvbSIsImlzcyI6InRvZG8gYm9vdCBhcHAiLCJpYXQiOjE2OTI5NjYzMTcsImV4cCI6MTY5Mjk2ODExNywicm9sZSI6IlJPTEVfQkFTSUMifQ.uyxDOH_QJiHJk4lVRn0wdhwCWh3NLsFNYdDgueYpnz4`
          }
        });
>>>>>>> 697571d7465eedf497951d6999ef99853e4b56f0
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
