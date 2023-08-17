import '../../App.css';
import Choice from '../../Map/Choice';
import KaKaoMap from '../../Map/KaKaoMap';
import MapList from '../../Map/MapList';

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
