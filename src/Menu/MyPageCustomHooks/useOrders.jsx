import { useState } from 'react';

function useOrders(initialOrders) {
    const [orders, setOrders] = useState(initialOrders);

    // 추후 주문 데이터에 관련된 기능들(예: 주문 추가, 삭제)을 이곳에 추가할 수 있습니다.

    return [orders, setOrders];
}

export default useOrders;
