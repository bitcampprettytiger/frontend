import axios from 'axios';

export const fetchPopularPlaces = (address, latitude, longitude) => {
    console.log(address)
    return axios.post('http://localhost/vendor/search', {
        address,
        latitude,
        longitude
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};
// 상위 8개 가게 중에서 즐겨찾기가 가장 많은 가게들을 가져옴

export const fetchMostFavoritedVendors = () => {

    return axios.get('http://localhost/api/favoritePick/top8Favorites');

};
// 즐겨찾기가 가장 많이 된 상위 5개 가게 정보를 가져옴
export const fetchTop5Vendors = async () => {
    try {
        const response = await fetchMostFavoritedVendors(); // 상위 8개 가게 정보를 불러옵니다.

        if (!response || !response.data) {
            console.error('Response or response data is undefined');
            return null;
        }

        console.log("나타나라");
        console.log(response.data);

        if (response.status === 200) {
            return response.data.slice(0, 5);  // 상위 8개 중에서 상위 5개만 반환합니다.
        } else {
            console.error('Failed to fetch top 5 vendors: ', response);
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching the top 5 vendors: ', error);
        return null;
    }

};

//리뷰가 많으면서 별점이 높은순 
export const fetchTop5ReviewVendors = async () => {
    try {
        console.log("1111111귀찮거든")
        const url = '/review/averageReviewScore';
        console.log(`Sending request to ${url}`); // 실제로 어떤 URL로 요청이 가는지 출력
        const response = await axios.get('http://localhost/vendor/review/averageReviewScore');
        console.log(response)  // 백엔드 엔드포인트 주소
        const top5Vendors = response.data.itemlist.slice(0, 5);  // 상위 5개의 vendor만 선택
        return top5Vendors;
    } catch (error) {
        console.error(`Error fetching top 5 vendors: ${error}`);
        throw error;
    }
};

// 가게리뷰를 가져옴

export const fetchReviewsByVendorId = (vendorId) => {
    return axios.get(`http://localhost/vendor/review-list/${vendorId}`);
};

//새로운 리뷰를 생성
export const createReview = (reviewDto, files) => {
    const formData = new FormData();
    formData.append('reviewDto', JSON.stringify(reviewDto));
    files.forEach((file) => {
        formData.append('uploadFiles', file);
    });

    return axios.post('http://localhost/review', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
//리뷰업데이트
export const updateReview = (reviewDto, uploadFiles, changeFileList, originFileList) => {
    const formData = new FormData();
    formData.append('reviewDto', JSON.stringify(reviewDto));
    uploadFiles.forEach((file) => {
        formData.append('uploadFiles', file);
    });
    changeFileList.forEach((file) => {
        formData.append('changeFileList', file);
    });
    formData.append('originFileList', JSON.stringify(originFileList));

    return axios.put('http://localhost/review', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
//리뷰삭제
export const deleteReview = (reviewDto) => {
    return axios.delete('http://localhost/review', { data: reviewDto });
};
//즐겨찾기가 되어 있는 가게리스트
export const fetchFavoriteShopsByUserId = (memberId, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.get(`http://localhost/api/favorite/${memberId}`, config);
};
// 즐겨찾기에서 가게를 삭제
export const deleteFavoriteShop = (memberId, vendorId) => {
    return axios.delete(`http:/localhost/api/favoritePick/${memberId}/remove/${vendorId}`);
};
//장바구니
export const getMyCart = (memberId, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.get(`http://localhost/cart/member/${memberId}`, config);
};


//장바구니 특정 아이템삭제
export const deleteCartItem = (cartItemDTO, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.delete(`http://localhost/cart/deletecartitem`, { data: cartItemDTO, headers: config.headers });
};
//장바구니비우기
export const deleteCart = (cartItemDTO, token) => {
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    return axios.delete(`http://localhost/cart/info`, { data: cartItemDTO, headers: config.headers });
};
//조회수가높은5개
export const fetchTop5RecommendedMenus = async () => {
    try {
        const response = await axios.get('http://localhost/menu/recommendedMenus5');
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
};