import React, { createContext, useContext, useState } from 'react';

const ReviewContext = createContext();

export const useReviewContext = () => {
    return useContext(ReviewContext);
}

export const ReviewContextProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);

    return (
        <ReviewContext.Provider value={{ reviews, setReviews }}>
            {children}
        </ReviewContext.Provider>
    );
}
