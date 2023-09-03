import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export const getHeaders = (navigate) => {

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        navigate("/");
        return;
    }
    return {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Bearer ${accessToken}`,
    };
};

export const fetchPopularPlaces = (address, latitude, longitude) => {
    console.log(address, latitude, longitude)
    return axios.post('http://192.168.0.240/vendor/search', {
        address: address,
        latitude: latitude,
        hardness: longitude
    }, {
        headers: getHeaders(),
    });
};
// 상위 8개 가게 중에서 즐겨찾기가 가장 많은 가게들을 가져옴

export const fetchMostFavoritedVendors = () => {
    return axios.get('http://192.168.0.240/api/favoritePick/top8Favorites', {
        headers: getHeaders()
    });

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
        const response = await axios.get('http://192.168.0.240/vendor/review/averageReviewScore', {

            headers: getHeaders()
        });
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
    return axios.get(`http://192.168.0.240/vendor/review-list/${vendorId}`);
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

    return axios.put('http://192.168.0.240/review', formData, {
        headers: getHeaders(),
    });
};
//리뷰삭제
export const deleteReview = (reviewDto) => {
    return axios.delete('http://192.168.0.240/review', { data: reviewDto });
};
//즐겨찾기가 되어 있는 가게리스트
export const fetchFavoriteShopsByUserId = (memberId, token) => {
    const config = {
        headers: getHeaders()
    };
    return axios.get(`http://192.168.0.240/api/favorite/${memberId}`, config);
};
// // 즐겨찾기에서 가게를 삭제
// export const deleteFavoriteShop = (memberId, vendorId) => {
//     return axios.delete(`http:/192.168.0.240/api/favoritePick/${memberId}/remove/${vendorId}`, {
//         headers: getHeaders()
//     });
// };



//장바구니
export const getMyCart = (memberId, token) => {
    const config = {
        headers: getHeaders(),
    };
    return axios.get(`http://192.168.0.240/cart/info/${memberId}`, config);
};


//장바구니 특정 아이템삭제
export const deleteCartItem = (cartItemDTO, token) => {
    const config = {
        headers: getHeaders(),
    };
    return axios.delete(`http://192.168.0.240/cart/deletecartitem`, { data: cartItemDTO, headers: config.headers });
};
//장바구니비우기
export const deleteCart = (cartItemDTO, token) => {
    const config = {
        headers: getHeaders(),
    };
    return axios.delete(`http://192.168.0.240/cart/info`, { data: cartItemDTO, headers: config.headers });
};
//조회수가높은10개
export const fetchTop10RecommendedMenus = async () => {
    try {
        const response = await axios.get('http://192.168.0.240/menu/recommendedMenus10', {
            headers: getHeaders()
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation: ', error);
    }
};

//회원 정보 조회
export const fetchMyInfo = async () => {
    try {
        const response = await axios.get('http://192.168.0.240/myInfo', {
            headers: getHeaders()
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch user info');
        }
    } catch (error) {
        console.error('There was a problem fetching user info: ', error);
    }
};

// 회원 찜내역 조회
export const fetchMyFavoriteVendors = async () => {
    try {
        const response = await axios.get('http://192.168.0.240/myPage/myFavoriteVendors', {
            headers: getHeaders()
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to fetch favorite vendors');
        }
    } catch (error) {
        console.error('There was a problem fetching favorite vendors: ', error);
    }
};


export const fetchOrderDetail = async (MEMBER_ID) => {
    try {
        const response = await fetch(`http://192.168.0.240/myPage/myOrders`, {
            headers: getHeaders()
        });

        // 서버 응답을 JSON 형태로 파싱
        const data = await response.json();

        // 1. Log the received data
        console.log("Data received:", data);

        // 'orders' 필드가 배열로 있다고 가정
        if (Array.isArray(data.item)) {
            console.log()
            return data.item;
        } else {
            // 2. Log the error message
            console.error('item is not an array');
            return [];  // 배열이 아니면 빈 배열 반환
        }

    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;  // 오류를 상위로 전파
    }
};
//주문내역함수 
export const fetchPaymentList = async (token) => {
    try {
        const response = await fetch('http://192.168.0.240/myPage/myPaymentList', {
            headers: getHeaders(),
        });

        const data = await response.json();

        if (data.statusCode === 200 && Array.isArray(data.item)) {
            return data.item;
        } else {
            console.error('No payment data found or Bad Request:', data.errorMessage);
            return null;
        }
    } catch (error) {
        console.error('Error fetching payment list:', error);
        return null;
    }
};

export const createReview = async (reviewDto, file, token) => {

    const url = 'http://192.168.0.240  /reviews/review';
    const formData = new FormData();
    console.log("이거 리뷰 디티오임" + reviewDto);

    // 리뷰 데이터 추가
    Object.keys(reviewDto).forEach(key => {
        formData.append(key, reviewDto[key]);
    });

    // 파일(이미지 등) 추가
    if (file) {
        file.forEach((file, index) => {
            formData.append(`file${index + 1}`, file);
        });
    }

    // 토큰 유효성 검사
    if (!token) {
        throw new Error("액세스 토큰이 누락되었거나 유효하지 않습니다!");
    }

    // 새로운 헤더를 생성
    const headers = {
        Authorization: `Bearer ${token}`
    };

    // axios 사용
    try {
        const response = await axios.post(url, formData, { headers });
        console.log("이거 리뷰 디티오임" + reviewDto);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(response.data.errorMessage || "리뷰 생성 실패");
        }
    } catch (error) {
        console.error('리뷰 생성 중 오류 발생:', error);
        console.log("이거 리뷰 디티오 아이디임" + reviewDto.id);
        console.log("이거 리뷰 디티오 오더아이디임" + reviewDto.orderId);

        if (error.response) {
            console.error("서버 응답:", error.response.data);
        }

        throw error;
    }
};
