import '../../App.css';
import KaKaoMap from '../../Map/KaKaoMap';
import Choice from '../../Map/MapComponents/Choice';
import MapList from '../../Map/MapComponents/MapList';
import Footer from '../../Layout/Footer';

function StFood() {
  return (
    <>
      <div className="App-main2">
        <div className="wrap" style={{position:'relative'}}>
          <KaKaoMap>
            <Choice></Choice>
            <MapList></MapList>
          </KaKaoMap>
          <Footer type="stfood"></Footer>
        </div>
      </div>
    </>
  );
}

export default StFood;
