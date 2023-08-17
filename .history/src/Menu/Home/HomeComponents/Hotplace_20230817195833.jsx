import React from 'react';
import Header from '../../../Layout/Header.jsx';
import { useParams } from 'react-router-dom'; // useParams import를 누락했는지 확인하세요.

function Hotplace() {
    const { place } = useParams(); // URL로부터 장소 이름 가져오기

    return (
        <div className='App-main2'>
            <Header page='hotplace' />
            <h1>{place}</h1>
        </div>
    );
}

export default Hotplace;
