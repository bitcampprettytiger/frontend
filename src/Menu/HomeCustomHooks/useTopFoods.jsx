import { useState, useEffect } from 'react';
import axios from 'axios';
//길거리음식 & 포장마차 데이터 가져오기
function useTopFoods() {
    const [streetFoods, setStreetFoods] = useState([]);
    const [foodStalls, setFoodStalls] = useState([]);

    useEffect(() => {
        async function fetchStreetFoods() {
            try {
                const response = await axios.get('http://27.96.135.75/vendor/search/streetfoods/top10');
                setStreetFoods(response.data);
            } catch (error) {
                console.error("Error fetching street foods:", error);
            }
        }

        async function fetchFoodStalls() {
            try {
                const response = await axios.get('http://27.96.135.75/vendor/search/foodstalls/top10');
                setFoodStalls(response.data);
            } catch (error) {
                console.error("Error fetching food stalls:", error);
            }
        }

        fetchStreetFoods();
        fetchFoodStalls();
    }, []);

    return { streetFoods, foodStalls };
}

export default useTopFoods;
