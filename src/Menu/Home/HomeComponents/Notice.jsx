import React from 'react';
import { useNotice } from './NoticeContext';


// 임시 데이터
const notificationsData = [
    { content: "첫 번째 알림입니다." },
    { content: "두 번째 알림입니다." },
    // ... 기타 알림 내용 추가 가능
];

function Notice({ clearNotifications: clearNotificationsProp }) {
    const { noticeCount, setNoticeCount } = useNotice();

    const clearAllNotifications = () => {
        setNoticeCount(0); // 모든 알림을 삭제
    };

    return (
        <div className="notification-panel">
            {notificationsData.map((notification, index) => (
                <div key={index}>
                    {notification.content}
                </div>
            ))}
            <button onClick={clearAllNotifications}>모든 알림 삭제</button>
        </div>
    );
}

export default Notice;
