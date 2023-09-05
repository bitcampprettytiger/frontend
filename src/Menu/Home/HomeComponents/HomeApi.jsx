import axios from 'axios';
import { ar } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';


export const API_BASE_URL = "https://mukjachi.site:6443";

// API 요청을 위한 헤더 가져오기
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

// -------------------------------------
// 가게 정보 관련 함수
// -------------------------------------

// 주소, 위도, 경도를 기반으로 인기 장소 가져오기
export const fetchPopularPlaces = (address, latitude, longitude) => {
    return axios.post(`${API_BASE_URL}/vendor/search`, {
        address: address,
        latitude: latitude,
        hardness: longitude
    }, {
        headers: getHeaders(),
    });
};

// 지정된 지역명에 따라 주변 가게 정보를 가져오는 함수 (일반적인 지역)
export const fetchShopsInArea = async (areaName) => {

    try {
        console.log(`[${areaName}] 지역의 매장 정보를 가져오는 중...`);
        const response = await axios.post(`${API_BASE_URL}/vendor/search10vendor`, { name: areaName }, {
            headers: getHeaders(),
        });
        console.log(`[${areaName}] 지역의 매장 정보:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`${areaName} 지역의 매장 정보를 가져오는 중 오류 발생:`, error);
        return null;
    }
};



// -------------------------------------
// 리뷰 관련 함수
// -------------------------------------

// 사용자 ID를 통해 리뷰 가져오기
// 사용자의 리뷰를 가져오는 함수
export const fetchReviewsByMemberId = async () => {
    const headers = getHeaders();
    console.log("헤더 정보:", headers); // 헤더 정보 확인

    try {
        const response = await axios.get(`${API_BASE_URL}/myPage/myReviews`, { headers: headers });
        console.log("서버 응답:", response); // 서버에서 반환된 전체 응답 확인

        if (response.status !== 200) {
            throw new Error('서버가 예상치 못한 상태 코드를 반환했습니다.');

        }

        return response;
    } catch (error) {
        console.error("리뷰 정보 가져오기 오류:", error); // 오류 발생 시 오류 내용 확인
        throw error;
    }
};

// 리뷰 업데이트하기
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
    return axios.put(`${API_BASE_URL}/review`, formData, {
        headers: getHeaders(),
    });
};



// 리뷰를 생성함
export const createReview = async (reviewDto, file, token) => {
    const url = `${API_BASE_URL}/reviews/review`;
    const formData = new FormData();


    // vendorId를 명세서에 맞게 수정
    reviewDto["vendor.id"] = parseInt(reviewDto["vendorId"]);
    reviewDto["orders.id"] = parseInt(reviewDto["orderId"]);
    console.log(reviewDto);
    // 리뷰 데이터를 FormData에 추가
    Object.keys(reviewDto).forEach(key => {
        formData.append(key, reviewDto[key]);
    });

    // 파일(이미지 등)을 FormData에 추가
    if (file) {
        file.forEach((f) => {
            formData.append("file", f);
        });
    }

    // 기존 헤더 가져오기
    const headers = getHeaders();

    // 토큰을 헤더에 추가
    headers['Authorization'] = `Bearer ${token}`;

    // 'Content-Type'을 제거하여 브라우저가 자동으로 설정하게 함
    delete headers['Content-Type'];

    try {
        // 리뷰 생성 요청
        const response = await axios.post(url, formData, { headers });

        if (response.status !== 200 || response.data.errorMessage) {
            throw new Error(response.data.errorMessage || "리뷰 생성 실패");
        }

        // 주어진 응답에서 리뷰 상세 정보를 반환
        return response.data;
    } catch (error) {
        console.error('리뷰 생성 중 오류 발생:', error);
        throw error;
    }
};
// 리뷰 삭제
export const deleteReview = async (reviewId, token, navigate) => {
    const url = `${API_BASE_URL}/reviews/review?reviewId=${reviewId}`;
    console.log("요청 URL:", url);

    // 기존 헤더 가져오기
    const headers = getHeaders();

    // 토큰을 헤더에 추가
    headers['Authorization'] = `Bearer ${token}`;

    if (!headers) {
        throw new Error('Authorization failed. Redirecting to login.');
    }

    try {
        const response = await axios.delete(url, { headers });

        if (response.status !== 200 || response.data.errorMessage) {
            throw new Error(response.data.errorMessage || 'Failed to delete review.');
        }

        navigate("/myreview"); // 여기에서 리다이렉트 로직 추가

        return response.data;

    } catch (error) {
        console.error('리뷰 삭제 중 오류 발생:', error);
        console.error('오류 상세:', error.response);

        throw error;
    }
};




// 리뷰가 많으면서 별점이 높은순으로 가게를 가져옴
export const fetchTop5ReviewVendors = async () => {
    try {
        const url = `${API_BASE_URL}/vendor/review/averageReviewScore`;
        console.log(`Sending request to ${url}`);

        const response = await axios.get(url, {
            headers: getHeaders()
        });

        const top5Vendors = response.data.itemlist.slice(0, 5);
        return top5Vendors;
    } catch (error) {
        console.error(`Error fetching top 5 vendors: ${error}`);
        throw error;
    }
};

// -------------------------------------
// 즐겨찾기 관련 함수
// -------------------------------------

// 사용자 ID로 즐겨찾기 가게 목록 가져오기
export const fetchFavoriteShopsByUserId = (memberId, token) => {
    return axios.get(`${API_BASE_URL}/api/favorite/${memberId}`, {
        headers: getHeaders()
    });
};


// 즐겨찾기가 가장 많이 된 상위 5개 가게 정보를 가져옴
export const fetchTop5Vendors = async () => {
    try {
        const response = await fetchMostFavoritedVendors();
        if (!response || !response.data) {
            console.error('Response or response data is undefined');
            return null;
        }

        if (response.status === 200) {
            return response.data.slice(0, 5);
        } else {
            console.error('Failed to fetch top 5 vendors: ', response);
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching the top 5 vendors: ', error);
        return null;
    }
};

// 가장 많이 즐겨찾기된 상위 8개 가게 정보 가져오기
export const fetchMostFavoritedVendors = () => {
    return axios.get(`${API_BASE_URL}/api/favoritePick/top8Favorites`, {
        headers: getHeaders()
    });
};

// 즐겨찾기한 가게를 가져오는 함수
export const fetchMyFavoriteVendors = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/myPage/myFavoriteVendors`, {
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
// -------------------------------------
// 사용자 정보 관련 함수
// -------------------------------------

// 사용자 정보 가져오기
export const fetchUserInfo = (userId) => {
    return axios.get(`${API_BASE_URL}/api/users/${userId}`, {
        headers: getHeaders()
    });
};

// 사용자 정보 업데이트하기
export const updateUserInfo = (userInfo) => {
    return axios.put(`${API_BASE_URL}/api/users/${userInfo.userId}`, userInfo, {
        headers: getHeaders()
    });
};

// 회원 정보를 조회함
export const fetchMyInfo = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/myInfo`, {
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

// -------------------------------------
// 주문 관련 함수
// -------------------------------------

// 사용자의 주문 목록 가져오기
export const fetchUserOrders = (userId) => {
    return axios.get(`${API_BASE_URL}/api/orders/${userId}`, {
        headers: getHeaders()
    });
};


// 새로운 주문 추가하기
export const createNewOrder = (orderInfo) => {
    return axios.post(`${API_BASE_URL}/api/orders`, orderInfo, {
        headers: getHeaders()
    });
};
// 주문 취소하기
export const cancelOrder = (orderId) => {
    return axios.delete(`${API_BASE_URL}/api/orders/${orderId}`, {
        headers: getHeaders()
    });
};



// 주문 상세 정보를 가져오는 함수
export const fetchOrderDetail = async (MEMBER_ID) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/myPage/myOrders`, {
            headers: getHeaders()
        });
        console.log("Data received:", response);
        if (Array.isArray(response.data.item)) {
            return response.data.item;
        } else {
            console.error('item is not an array');
            return [];
        }
    } catch (error) {
        console.error('Error fetching order details:', error);
        throw error;
    }
};
// -------------------------------------
// 결제 관련 함수
// -------------------------------------

// 결제 정보 가져오기
export const fetchPaymentInfo = (userId) => {
    return axios.get(`${API_BASE_URL}/api/payments/${userId}`, {
        headers: getHeaders()
    });
};

// 결제 정보 업데이트하기
export const updatePaymentInfo = (paymentInfo) => {
    return axios.put(`${API_BASE_URL}/api/payments/${paymentInfo.userId}`, paymentInfo, {
        headers: getHeaders()
    });
};

// 결제 실행하기
export const executePayment = (paymentData) => {
    return axios.post(`${API_BASE_URL}/api/payments/execute`, paymentData, {
        headers: getHeaders()
    });
};


// 결제 목록을 가져오는 함수
export const fetchPaymentList = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/myPage/myPaymentList`, {
            headers: getHeaders()
        });
        const data = response.data;
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



// 장바구니 특정 아이템을 삭제함
export const deleteCartItem = (cartItemDTO, token) => {
    return axios.delete(`${API_BASE_URL}/cart/deletecartitem`, {
        data: cartItemDTO,
        headers: getHeaders()
    });
};


// 장바구니를 비움
export const deleteCart = (cartItemDTO, token) => {
    return axios.delete(`${API_BASE_URL}/cart/info`, {
        data: cartItemDTO,
        headers: getHeaders()
    });
};




// Top 10 추천 메뉴를 가져오는 함수
export const fetchTop10RecommendedMenus = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/menu/recommendedMenus10`, {
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


// // 즐겨찾기 목록 가져오기
export const fetchFavoriteShops = () => {
    return axios.get(`${API_BASE_URL}/myPage/myFavoriteVendors`, {
        headers: getHeaders()
    });
};

// 즐겨찾기 추가하기
export const addFavoriteShop = (vendorId) => {
    return axios.post(`${API_BASE_URL}/api/favoritePick/add/${vendorId}`, null, {
        headers: getHeaders()
    });
};

// 즐겨찾기 삭제하기
export const removeFavoriteShop = (vendorId, headers) => {
    return axios.delete(`${API_BASE_URL}/api/favoritePick/remove/${vendorId}`, {
        headers: getHeaders()
    });
};

export const getVendorByCategory = (searchInput) => {
    return axios.get(`${API_BASE_URL}/vendor/category?address=${searchInput}&menuName=${searchInput}&vendorName=${searchInput}`, {
        headers: getHeaders()
    });
};

export const getVendorInfo = (searchInput) => {
    return axios.get(`${API_BASE_URL}/vendor/info?search=${searchInput}`, {
        headers: getHeaders()
    });
};

//사용자의 상세주문내역
export const fetchMyOrders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/myPage/myOrders`, {
            headers: getHeaders()  // 이 함수는 적절한 인증 헤더를 반환해야 합니다.
        });

        console.log("My Orders received:", response);

        if (Array.isArray(response.data.item)) {
            return response.data.item;
        } else {
            console.error('item is not an array');
            return [];
        }
    } catch (error) {
        console.error('Error fetching my orders:', error);
        throw error;
    }
};




