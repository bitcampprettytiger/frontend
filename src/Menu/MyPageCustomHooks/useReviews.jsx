import { useState } from 'react';

function useReviews() {
    // 여기에 API 호출 로직이나, 다른 리뷰 관련 로직들을 추가할 수 있습니다.
    const [reviews, setReviews] = useState([
        //... 임의의 리뷰 데이터...
        {
            storeName: "은희네",
            starCount: 3,
            images: [
                "/images/review1.jpeg",
                "/images/review2.jpeg",
                "/images/review3.jpeg",
                "/images/review4.jpeg",
                "/images/review5.jpeg",
            ],
            text: "이것들은 그동안 내가 먹은 음식 사진들이당 얻은것은 결국 살뿐. 하지만 맛있었으면 됐지~ "
        },
        {
            storeName: "민규네",
            starCount: 5,
            images: [],
            text: "우웅ㅇㅇ우웅ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ"
        },
        {
            storeName: "유진이네",
            starCount: 4,
            images: ["/images/review6.jpeg", "/images/review7.jpeg"],
            text: "신민규 짜증나 규네나 사줘 싯팔!"
        }
    ]);

    return { reviews };
}

export default useReviews;
