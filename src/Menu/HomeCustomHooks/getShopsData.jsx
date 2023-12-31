// utils/getShopsData.js
import axios from 'axios';

const getShopsData = async () => {
    const API_URL = "https://mukjachi.site:6443/vendor/info/vendorId";
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("데이터를 불러오는 데 실패했습니다.", error);
        return [];
    }
};

export default getShopsData;
