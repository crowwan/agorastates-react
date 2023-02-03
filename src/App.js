import Header from "./layouts/Header";
import Aside from "./layouts/Aside";
function App() {
  return (
    <div className="App">
      <div id="wrapper">
        <div className="container">
          <Header />
          <Aside disabled={true} />
        </div>
      </div>
    </div>
  );
}

export default App;
