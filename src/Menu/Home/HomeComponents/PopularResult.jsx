import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from '../../../Layout/Header';
import Footer from '../../../Layout/Footer';
import './PopularResult.css';

function PopularResult() {
    const BASE_URL = 'http://192.168.0.63';
    const [places, setPlaces] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const { query } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${BASE_URL}/search?query=${query}`);
                if (Array.isArray(response.data)) {
                    setPlaces(response.data);
                } else {
                    console.error('Expected an array but received:', response.data);
                }
            } catch (error) {
                console.error(`Error fetching data for ${query}:`, error);
                setErrorMessage(`Error fetching data for ${query}`);
            }
        }
        fetchData();
    }, [query]);

    return (
        <div className="PopularResult-main">
            <Header />

            <h1>Results for: {query}</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <ul className="results-list">
                {places.map(place => (
                    <li key={place.id}>
                        <h2>{place.name}</h2>
                        <img src={place.imageUrl} alt={place.name} />
                        <p>{place.description}</p>
                    </li>
                ))}
            </ul>

            <Footer />
        </div>
    );
}

export default PopularResult;
