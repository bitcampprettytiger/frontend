import '../../App.css';
import KaKaoMap from '../../Map/KaKaoMap';
import Choice from '../../Map/MapComponents/Choice';
import MapList from '../../Map/MapComponents/MapList';
function App() {
  return (
    <>
      <div className="App">
        <KaKaoMap>
          <Choice></Choice>
          <MapList></MapList>
        </KaKaoMap>
      </div>
    </>
  );
}

export default App;
