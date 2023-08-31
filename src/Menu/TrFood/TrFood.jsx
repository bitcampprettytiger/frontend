import '../../App.css';
import KaKaoMap from '../../Map/KaKaoMap';
import Choice from '../../Map/MapComponents/Choice';
import MapList from '../../Map/MapComponents/MapList';
import Footer from '../../Layout/Footer';

function Trfood() {
  return (
    <>
      <div className="App-main2">
        <div className="wrap">
          <KaKaoMap>
            <Choice></Choice>
            <MapList></MapList>
          </KaKaoMap>
          <Footer type="trfood"></Footer>
        </div>
      </div>
    </>
  );
}

export default Trfood;
