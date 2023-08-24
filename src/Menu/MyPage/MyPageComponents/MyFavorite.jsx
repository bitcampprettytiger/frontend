import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyFavorite.css';

function MyFavorite() {
    // 임시데이터
    let store = JSON.parse(localStorage.getItem("favorites") || "[]");
    try {
        store = JSON.parse(localStorage.getItem("favorites"));
        if (!Array.isArray(store)) {
            store = [];
        }
    } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
    }



    return (
        <div className='App-main2'>
            <Header page="myfavorite" />
            {store.map(shop => (
                <div key={shop.name} className='myfavorite-container'>
                    <img
                        src={shop.image || `${process.env.PUBLIC_URL}/images/roopy.png`}
                        alt="가게 이미지"
                        className="store-image"
                    />
                    <div className="store-info">
                        <div className="store-name">{shop.name}</div>
                        <div className="store-address">{shop.address}</div>
                    </div>
                </div>
            ))}
            <Footer type="myfavorite" />
        </div>
    )

}

export default MyFavorite;