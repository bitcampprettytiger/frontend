import Header from '../../../Layout/Header.jsx';
import Footer from '../../../Layout/Footer.jsx';
import './MyFavorite.css';
import useFavorites from '../../MyPageCustomHooks/useFavorites.jsx';

function MyFavorite() {
    const { favorites, loading, error } = useFavorites();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='App-main2'>
            <Header page="myfavorite" />
            <div className='myfavorite-container'>
                {favorites.map(store => (
                    <>
                        <img
                            src={store.image || `${process.env.PUBLIC_URL}/images/roopy.png`}
                            alt="가게 이미지"
                            className="store-image"
                        />
                        <div className="store-info">
                            <div className="store-name">{store.name}</div>
                            <div className="store-address">{store.address}</div>
                        </div>
                    </>
                ))}
            </div>
            <Footer type="myfavorite" />
        </div>
    )
}

export default MyFavorite;
