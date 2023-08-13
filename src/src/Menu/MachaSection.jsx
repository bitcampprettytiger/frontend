import React from 'react'; // React를 임포트합니다.



function MachaSection({ title, description, imageList }) {
    const handleButtonClick = () => {
        // 버튼을 클릭했을 때의 동작을 이곳에 추가합니다.
        // 현재는 정의되지 않았습니다.
    };

    return (
        <div>
            <h3>{title}</h3>
            <p className="custom-text">{description}</p>
            <div className="macha-container">
                <div className="macha-inner-container">
                    {imageList.map((imgSrc, index) => (
                        <button key={index} className="macha-place-button" onClick={handleButtonClick}>
                            <img src={imgSrc} alt={`Img ${index}`} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MachaSection; // 이 컴포넌트를 export 해줍니다.
