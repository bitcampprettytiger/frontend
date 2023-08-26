import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyFavorite.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyFavorite() {
    // 임시데이터
    let store = JSON.parse(localStorage.getItem("favorites") || "[]");
    try {
        store = JSON.parse(localStorage.getItem("favorites"));
        if (!Array.isArray(store)) {
            store = [];
        }
    } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
    }

    const [favoriteShops, setFavoriteShops] = useState([]);
    const token = localStorage.getItem('jwtToken'); // 'jwtToken'은 토큰을 저장할 때 사용한 키입니다.
    function parseJwt(token) {
        try {
            // JWT 토큰의 Payload 부분을 디코딩합니다.
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(window.atob(base64));
        } catch (error) {
            console.error("Error parsing JWT:", error);
            return null;
        }
    }

    const payload = parseJwt(token);
    const USER_ID = payload?.userId;  // `userId`는 Payload에 정의된 필드에 따라 다를 수 있습니다.


    useEffect(() => {
        axios.get(`http://172.30.1.96/api/favoritePick/${USER_ID}/favorites`) // API endpoint를 가정합니다.
            .then(response => {
                setFavoriteShops(response.data);
            })
            .catch(error => {
                console.error("즐겨찾기 목록을 불러오는 중 오류 발생:", error);
            });
    }, []);

    return (
        <div className='App-main2'>
            <Header page="myfavorite" />
            {store.map(shop => (
                <div key={shop.name} className='myfavorite-container'>
                    <img
                        src={shop.image || `${process.env.PUBLIC_URL}/images/roopy.png`}
                        alt="가게 이미지"
                        className="store-image"
                    />
                    <div className="store-info">
                        <div className="store-name">{shop.name}</div>
                        <div className="store-address">{shop.address}</div>
                    </div>
                </div>
            ))}
            <Footer type="myfavorite" />
        </div>
    )

}

export default MyFavorite;