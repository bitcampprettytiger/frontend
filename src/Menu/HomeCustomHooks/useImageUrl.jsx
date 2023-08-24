import { useState, useEffect } from 'react';
import axios from 'axios';
//이미지 url불러오기
function useImageUrl() {
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        async function fetchImageUrl() {
            try {
                const response = await axios.get('http://27.96.135.75/vendor/review/weightedAverageScore');
                if (response.data && response.data.url) {
                    setImageURL(response.data.url);
                }
            } catch (error) {
                console.error("Error fetching image URL:", error);
            }
        }

        fetchImageUrl();
    }, []);

    return imageURL;
}

export default useImageUrl;
