// useFavorites.js
import { useState, useEffect } from 'react';

function useFavorites(userId) { // 만약 사용자 ID 기반으로 즐겨찾기를 가져온다면 userId를 파라미터로 받을 수 있습니다.
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 여기서 API 호출을 합니다.
        async function fetchFavorites() {
            try {
                // const response = await fetch(`/api/favorites?userId=${userId}`);
                // const data = await response.json();
                // setFavorites(data);

                // 임시데이터
                const data = [
                    {
                        image: null,
                        name: "금문도",
                        address: "비트캠프앞어쩌구"
                    },
                    {
                        image: null,
                        name: "브롱스",
                        address: "비트캠프앞어쩌구"
                    }
                ];
                setFavorites(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchFavorites();
    }, [userId]); // userId가 바뀔 때마다 새롭게 데이터를 가져옵니다.

    return { favorites, loading, error };
}

export default useFavorites;
