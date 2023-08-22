import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyFavorite.css';

function MyFavorite() {
    // 임시데이터
    const store = [
        {
            image: null, // 가게 이미지가 없으면 null로 둡니다.
            name: "금문도",
            address: "비트캠프앞어쩌구"
        },
        {
            image: null, // 가게 이미지가 없으면 null로 둡니다.
            name: "브롱스",
            address: "비트캠프앞어쩌구"
        }
    ]


    return (
        <div className='App-main2'>
            <Header page="myfavorite" />
            <div className='myfavorite-container'>
                <img
                    src={store.image || `${process.env.PUBLIC_URL}/images/roopy.png`}
                    alt="가게 이미지"
                    className="store-image"
                />
                <div className="store-info">
                    <div className="store-name">{store.name}</div>
                    <div className="store-address">{store.address}</div>
                </div>
            </div>
            <Footer type="myfavorite" />
        </div>
    )
}

export default MyFavorite;