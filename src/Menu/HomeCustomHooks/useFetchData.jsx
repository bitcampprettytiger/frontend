// HomeCustomHooks/useFetchData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchData(url, type, deps) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (String.prototype.toLowerCase(type) === 'get') {
            axios.get(url)
                .then(response => {
                    setData(response.data);
                    setError(null); // 오류 상태를 초기화
                })
                .catch(err => {
                    setError(err);
                    setData(null); // 데이터 상태를 초기화
                });
        } else if (String.prototype.toLowerCase(type) === 'post') {
            axios.post(url)
                .then(response => {
                    setData(response.data);
                    setError(null); // 오류 상태를 초기화
                })
                .catch(err => {
                    setError(err);
                    setData(null); // 데이터 상태를 초기화
                });
        }
    }, deps);

    return { data, error };
}


export default useFetchData;
